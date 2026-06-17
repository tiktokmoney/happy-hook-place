import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string | null
  phone?: string | null
  preferredContact?: string
  message?: string | null
  source?: string
  submittedAt?: string
}

const Email = ({
  name = 'Someone',
  email,
  phone,
  preferredContact = 'email',
  message,
  source = 'website',
  submittedAt,
}: Props) => {
  const when = submittedAt
    ? new Date(submittedAt).toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : ''
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`New lead from ${name} — Rivenbark Lawncare`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>🌱 New Lead</Heading>
            <Text style={sub}>Rivenbark Lawncare — {source}</Text>
          </Section>

          <Section style={card}>
            <Row label="Name" value={name} />
            <Row label="Email" value={email || '—'} />
            <Row label="Phone" value={phone || '—'} />
            <Row label="Preferred contact" value={preferredContact} />
            {when && <Row label="Submitted" value={when} />}
          </Section>

          {message && (
            <Section style={messageBox}>
              <Text style={messageLabel}>Message</Text>
              <Text style={messageText}>{message}</Text>
            </Section>
          )}

          <Hr style={hr} />
          <Text style={footer}>
            Reply directly to the customer using the contact info above.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text style={rowStyle}>
      <span style={rowLabel}>{label}: </span>
      <span style={rowValue}>{value}</span>
    </Text>
  )
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New lead: ${data.name || 'Someone'} (${data.preferredContact || 'email'})`,
  displayName: 'New Lead Notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '(865) 555-0123',
    preferredContact: 'email',
    message: 'Hi! I have a half-acre lot and need weekly mowing. Thanks!',
    source: 'website',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '24px' }
const header = { paddingBottom: '16px' }
const h1 = { fontSize: '24px', color: '#1f3b1f', margin: '0 0 4px 0' }
const sub = { fontSize: '13px', color: '#6b6b6b', margin: 0 }
const card = {
  backgroundColor: '#f4f7f1',
  border: '1px solid #d9e3d2',
  borderRadius: '10px',
  padding: '16px 20px',
  marginTop: '12px',
}
const rowStyle = { margin: '6px 0', fontSize: '15px', color: '#1d1d1d' }
const rowLabel = { fontWeight: 700, color: '#1f3b1f' }
const rowValue = { color: '#1d1d1d' }
const messageBox = {
  marginTop: '16px',
  padding: '16px 20px',
  border: '1px solid #e5e5e5',
  borderRadius: '10px',
}
const messageLabel = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#1f3b1f',
  margin: '0 0 6px 0',
}
const messageText = {
  fontSize: '15px',
  color: '#1d1d1d',
  whiteSpace: 'pre-wrap' as const,
  margin: 0,
}
const hr = { borderColor: '#e5e5e5', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#888', margin: 0 }
