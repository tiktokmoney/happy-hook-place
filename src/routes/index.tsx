import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import lawn1 from "@/assets/lawn1.png.asset.json";
import lawn2 from "@/assets/lawn2.png.asset.json";
import lawn3 from "@/assets/lawn3.png.asset.json";
import lawn4 from "@/assets/lawn4.png.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "work", label: "Our Work" },
  { id: "contact", label: "Contact" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_auto] items-center gap-4 px-5 py-3 sm:px-8 md:grid-cols-[auto_1fr_auto] md:gap-8 md:py-4">
        <a href="#home" className="flex items-center">
          <img src={logoAsset.url} alt="Rivenbark Lawncare" className="h-14 w-auto sm:h-16 md:h-20" />
        </a>
        <nav className="hidden items-center justify-center gap-1 md:flex lg:gap-2">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition hover:bg-secondary hover:text-leaf-deep"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-leaf-deep px-5 py-2.5 text-sm font-bold text-cream shadow-sm transition hover:bg-leaf md:inline-flex"
        >
          Get a Quote
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative justify-self-end md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-ink before:absolute before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-ink after:absolute after:h-0.5 after:w-5 after:translate-y-1.5 after:bg-ink" />
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-ink/80 hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

/* CUSTOM TWIST: a recurring SVG "field horizon" with rising sun is layered
   into the hero, section dividers, and as a subtle motif behind cards. */
function FieldHorizon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 200" className={className} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="fh-g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.13 140)" />
          <stop offset="100%" stopColor="oklch(0.55 0.16 145)" />
        </linearGradient>
        <linearGradient id="fh-g2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.16 145)" />
          <stop offset="100%" stopColor="oklch(0.42 0.12 150)" />
        </linearGradient>
      </defs>
      <path d="M0,120 C200,60 420,160 720,90 C920,40 1080,120 1200,80 L1200,200 L0,200 Z" fill="url(#fh-g1)" />
      <path d="M0,150 C260,100 500,180 780,130 C980,95 1100,160 1200,140 L1200,200 L0,200 Z" fill="url(#fh-g2)" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="sun-glow absolute inset-0 -z-0" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-16 sm:px-8 md:grid-cols-[1.1fr_1fr] md:pt-24">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-leaf-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-sun-deep" /> Kingston, TN · 5★ Rated
          </span>
          <h1 className="mt-5 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            A lawn worth
            <br />
            <span className="relative inline-block text-leaf-deep">
              coming home
              <svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full" preserveAspectRatio="none" aria-hidden>
                <path d="M2 10 Q 75 2 150 8 T 298 6" stroke="oklch(0.78 0.17 65)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            to.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink/70">
            Rivenbark Lawncare provides professional mowing, weeding, and lawn care. Our experts make sure your lawn is beautifully manicured — a well-kept, attractive outdoor space to enjoy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full bg-leaf-deep px-6 py-3 font-bold text-cream shadow-md transition hover:bg-leaf">
              Request a Free Quote
            </a>
            <a href="tel:+18652500515" className="rounded-full border-2 border-ink/10 bg-white px-6 py-3 font-bold text-ink transition hover:border-ink/30">
              (865) 250-0515
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
            <div><dt className="text-ink/55">Rating</dt><dd className="font-display text-2xl text-leaf-deep">5.0★</dd></div>
            <div><dt className="text-ink/55">Based in</dt><dd className="font-display text-2xl">Kingston</dd></div>
            <div><dt className="text-ink/55">Service</dt><dd className="font-display text-2xl">Local</dd></div>
          </dl>
        </div>

        {/* Hero visual: stacked photo + sun illustration */}
        <div className="relative">
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-sun/70 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
            <img src={lawn4.url} alt="A freshly mowed green lawn under trees" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-48 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block">
            <img src={lawn1.url} alt="Open mowed yard" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -right-4 bottom-10 hidden rounded-2xl bg-white px-4 py-3 shadow-lg sm:block">
            <div className="text-xs text-ink/55">Today</div>
            <div className="font-display text-lg text-leaf-deep">Booking spots open</div>
          </div>
        </div>
      </div>
      <FieldHorizon className="h-16 w-full sm:h-24" />
    </section>
  );
}

function Services() {
  const items = [
    { t: "Mowing", d: "Clean, even cuts on a schedule that fits your yard — weekly, bi-weekly, or one-time.", i: "🌾" },
    { t: "Weeding", d: "Beds, fence lines, and walkways kept tidy so your landscaping actually shows.", i: "🌿" },
    { t: "Edging & Trim", d: "Crisp edges along driveways and walks for that finished, professional look.", i: "✂️" },
    { t: "Cleanup", d: "Leaf, stick, and debris cleanup that leaves your lawn ready to enjoy.", i: "🍃" },
  ];
  return (
    <section id="services" className="relative bg-secondary/60 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="What we do" title="Services that keep your yard sharp" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <div key={s.t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sun/30 blur-xl transition group-hover:bg-sun/60" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-leaf-deep text-2xl text-cream">{s.i}</div>
                <h3 className="mt-5 text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border-4 border-white shadow-xl">
            <img src={lawn2.url} alt="A yard freshly cleared and mowed" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden w-44 rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:block">
            <img src={lawn3.url} alt="Lawn near trees" className="aspect-square w-full object-cover" />
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="About us" title="Local pride, hands-on craft." align="left" />
          <p className="mt-6 text-lg text-ink/70">
            Rivenbark Lawncare is a family-run operation serving Kingston, Tennessee and the nearby areas. We treat every yard like it's our own — showing up on time, doing the small details right, and leaving the property looking like it deserves a picture.
          </p>
          <ul className="mt-6 space-y-3 text-ink/75">
            {["Reliable, on-schedule service", "Friendly local crew", "Fair, upfront pricing", "5.0★ Google reviewed"].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun text-xs font-black text-ink">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const photos = [lawn1, lawn4, lawn3, lawn2];
  return (
    <section id="work" className="relative bg-ink py-24 text-cream">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="Our work" title="Real yards. Real results." invert />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((p, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-2xl ${i % 2 ? "lg:translate-y-6" : ""}`}>
              <img src={p.url} alt={`Recent lawncare job ${i + 1}`} className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-xs font-semibold uppercase tracking-widest">
                Kingston, TN
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, align = "center", invert = false }: { eyebrow: string; title: string; align?: "center" | "left"; invert?: boolean }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${invert ? "text-sun" : "text-leaf-deep"}`}>
        <span className="h-px w-8 bg-current" /> {eyebrow}
      </span>
      <h2 className={`mt-4 text-4xl sm:text-5xl ${invert ? "text-cream" : ""}`}>{title}</h2>
    </div>
  );
}

function Contact() {
  const [method, setMethod] = useState<"email" | "text" | "call">("email");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", consentText: false, consentCall: false });

  const needsTextConsent = method === "text";
  const needsCallConsent = method === "call";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (needsTextConsent && !form.consentText) return;
    if (needsCallConsent && !form.consentCall) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <FieldHorizon className="absolute inset-x-0 top-0 h-16 w-full rotate-180 opacity-60" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeader eyebrow="Get in touch" title="Let's get your lawn looking great." align="left" />
          <p className="mt-6 text-lg text-ink/70">
            Tell us a bit about your yard and how you'd like us to reach back out. We respond fast — usually same day.
          </p>
          <div className="mt-8 space-y-4 text-ink/80">
            <a href="tel:+18652500515" className="flex items-center gap-3 hover:text-leaf-deep">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-deep text-cream">📞</span>
              <span className="font-semibold">(865) 250-0515</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-deep text-cream">📍</span>
              <span>309 Kingwood St, Kingston, TN 37763</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-deep text-cream">🕙</span>
              <span>Opens 10 AM — Serving Kingston & nearby areas</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-deep text-3xl text-cream">✓</div>
              <h3 className="mt-4 text-2xl">Thanks — we got it!</h3>
              <p className="mt-2 text-ink/65">We'll reach out via your preferred method shortly.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" required>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Jane Doe" />
                </Field>
                <Field label="Email" required={method === "email"}>
                  <input type="email" required={method === "email"} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@email.com" />
                </Field>
                <Field label="Phone" required={method !== "email"}>
                  <input type="tel" required={method !== "email"} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="(865) 555-0123" />
                </Field>
                <Field label="Preferred contact">
                  <div className="flex gap-2">
                    {(["email", "text", "call"] as const).map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold capitalize transition ${
                          method === m ? "border-leaf-deep bg-leaf-deep text-cream" : "border-border bg-background hover:border-leaf"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Tell us about your yard">
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" placeholder="Lot size, what you need, anything special…" />
              </Field>

              {needsTextConsent && (
                <ConsentBox
                  checked={form.consentText}
                  onChange={(v) => setForm({ ...form, consentText: v })}
                  title="Permission to text"
                  body="By checking this box, I expressly consent to receive SMS text messages from Rivenbark Lawncare at the phone number provided, including messages sent by automated means. Consent is not a condition of any purchase. Message and data rates may apply. Message frequency varies. Reply STOP to opt out at any time, or HELP for help."
                />
              )}
              {needsCallConsent && (
                <ConsentBox
                  checked={form.consentCall}
                  onChange={(v) => setForm({ ...form, consentCall: v })}
                  title="Permission to call"
                  body="By checking this box, I expressly consent to receive telephone calls from Rivenbark Lawncare at the phone number provided, including calls placed using an automatic telephone dialing system or an artificial or prerecorded voice. Consent is not a condition of any purchase. I understand I may revoke this consent at any time by asking to be removed from the call list."
                />
              )}

              <button type="submit" className="mt-6 w-full rounded-full bg-leaf-deep px-6 py-4 font-bold text-cream shadow-md transition hover:bg-leaf">
                Send Message
              </button>
              <p className="mt-3 text-center text-xs text-ink/55">We never share your information. Used only to reply to your request.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="mt-4 block first:mt-0 sm:mt-0">
      <span className="mb-1.5 block text-sm font-semibold text-ink/75">
        {label} {required && <span className="text-sun-deep">*</span>}
      </span>
      {children}
      <style>{`.input{width:100%;border-radius:.6rem;border:1px solid var(--input);background:var(--background);padding:.65rem .8rem;font:inherit;color:inherit;outline:none;transition:border-color .15s, box-shadow .15s}.input:focus{border-color:var(--leaf);box-shadow:0 0 0 3px color-mix(in oklab,var(--leaf) 25%,transparent)}`}</style>
    </label>
  );
}

function ConsentBox({ checked, onChange, title, body }: { checked: boolean; onChange: (v: boolean) => void; title: string; body: string }) {
  return (
    <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border-2 border-sun/40 bg-sun/10 p-4">
      <input type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-leaf-deep" />
      <span className="text-sm leading-relaxed text-ink/80">
        <span className="block font-bold text-ink">{title}</span>
        {body}
      </span>
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <img src={logoAsset.url} alt="" className="h-10 w-auto shrink-0" />
          <span className="truncate text-sm text-ink/65">© {new Date().getFullYear()} Rivenbark Lawncare · Kingston, TN</span>
        </div>
        <a href="#home" className="text-sm font-semibold text-leaf-deep hover:underline">Back to top ↑</a>
      </div>
    </footer>
  );
}
