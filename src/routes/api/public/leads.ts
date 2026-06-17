import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Rivenbark Lawncare'
const SENDER_DOMAIN = 'notify.rivenbarklawncare.com'
const FROM_DOMAIN = 'rivenbarklawncare.com'
const NOTIFY_RECIPIENTS = [
  'rivenbarklawncare@gmail.com',
  'knudsenriley979@gmail.com',
]

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  preferred_contact: z.enum(['email', 'text', 'call']).default('email'),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consent_text: z.boolean().optional().default(false),
  consent_call: z.boolean().optional().default(false),
  source: z.string().trim().max(50).optional().default('website'),
})

function genToken() {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const Route = createFileRoute('/api/public/leads')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let parsed
        try {
          const body = await request.json()
          parsed = LeadSchema.parse(body)
        } catch (err) {
          return Response.json(
            { error: 'Invalid input', detail: err instanceof Error ? err.message : 'parse error' },
            { status: 400 },
          )
        }

        const supabase = createClient(supabaseUrl, serviceKey)

        // 1. Save the lead
        const { data: lead, error: insertError } = await supabase
          .from('leads')
          .insert({
            name: parsed.name,
            email: parsed.email || null,
            phone: parsed.phone || null,
            preferred_contact: parsed.preferred_contact,
            message: parsed.message || null,
            consent_text: parsed.consent_text,
            consent_call: parsed.consent_call,
            source: parsed.source,
          })
          .select()
          .single()

        if (insertError || !lead) {
          console.error('Failed to save lead', insertError)
          return Response.json({ error: 'Failed to save lead' }, { status: 500 })
        }

        // 2. Render notification email once
        const template = TEMPLATES['new-lead']
        const templateData = {
          name: parsed.name,
          email: parsed.email || null,
          phone: parsed.phone || null,
          preferredContact: parsed.preferred_contact,
          message: parsed.message || null,
          source: parsed.source,
          submittedAt: lead.created_at,
        }
        const element = React.createElement(template.component, templateData)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject =
          typeof template.subject === 'function'
            ? template.subject(templateData)
            : template.subject

        // 3. Enqueue one email per owner recipient (skipping any suppressed)
        for (const recipient of NOTIFY_RECIPIENTS) {
          const normalized = recipient.toLowerCase()
          const { data: suppressed } = await supabase
            .from('suppressed_emails')
            .select('id')
            .eq('email', normalized)
            .maybeSingle()
          if (suppressed) continue

          // Ensure an unsubscribe token exists for this recipient
          let unsubscribeToken: string
          const { data: existing } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token, used_at')
            .eq('email', normalized)
            .maybeSingle()
          if (existing && !existing.used_at) {
            unsubscribeToken = existing.token
          } else {
            unsubscribeToken = genToken()
            await supabase
              .from('email_unsubscribe_tokens')
              .upsert(
                { token: unsubscribeToken, email: normalized },
                { onConflict: 'email', ignoreDuplicates: true },
              )
            const { data: stored } = await supabase
              .from('email_unsubscribe_tokens')
              .select('token')
              .eq('email', normalized)
              .maybeSingle()
            if (stored?.token) unsubscribeToken = stored.token
          }

          const messageId = crypto.randomUUID()
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: 'new-lead',
            recipient_email: recipient,
            status: 'pending',
          })

          const { error: enqueueError } = await supabase.rpc('enqueue_email', {
            queue_name: 'transactional_emails',
            payload: {
              message_id: messageId,
              to: recipient,
              from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
              sender_domain: SENDER_DOMAIN,
              subject,
              html,
              text,
              purpose: 'transactional',
              label: 'new-lead',
              idempotency_key: `lead-${lead.id}-${normalized}`,
              unsubscribe_token: unsubscribeToken,
              queued_at: new Date().toISOString(),
            },
          })

          if (enqueueError) {
            console.error('Failed to enqueue lead email', enqueueError)
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: 'new-lead',
              recipient_email: recipient,
              status: 'failed',
              error_message: 'Failed to enqueue',
            })
          }
        }

        return Response.json({ success: true, id: lead.id })
      },
    },
  },
})
