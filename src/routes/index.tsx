import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import logoAsset from "@/assets/logo.png.asset.json";
import lawn1 from "@/assets/lawn1.png.asset.json";
import lawn2 from "@/assets/lawn2.png.asset.json";
import lawn3 from "@/assets/lawn3.png.asset.json";
import lawn4 from "@/assets/lawn4.png.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

const QuoteDialogCtx = createContext<{ open: () => void }>({ open: () => {} });
const useQuoteDialog = () => useContext(QuoteDialogCtx);


const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "work", label: "Our Work" },
  { id: "contact", label: "Contact" },
];

function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <QuoteDialogCtx.Provider value={{ open: () => setQuoteOpen(true) }}>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <TrustBand />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Work />
        <ServiceArea />
        <FAQ />
        <CTABand />
        <Contact />
        <Footer />
      </div>
      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-leaf-deep">Request a Free Quote</DialogTitle>
            <DialogDescription>
              Tell us a bit about your yard — we usually reply the same day.
            </DialogDescription>
          </DialogHeader>
          <QuoteForm onDone={() => setTimeout(() => setQuoteOpen(false), 1800)} />
        </DialogContent>
      </Dialog>
    </QuoteDialogCtx.Provider>
  );
}


function Nav() {
  const [open, setOpen] = useState(false);
  const { open: openQuote } = useQuoteDialog();
  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };
  return (

    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_auto] items-center gap-4 px-5 py-3 sm:px-8 md:grid-cols-[auto_1fr_auto] md:gap-8 md:py-4">
        <a href="#home" onClick={(e) => onLinkClick(e, "home")} className="flex items-center">
          <img src={logoAsset.url} alt="Rivenbark Lawncare" className="h-14 w-auto sm:h-16 md:h-20" />
        </a>
        <nav className="hidden items-center justify-center gap-1 md:flex lg:gap-2">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => onLinkClick(e, n.id)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition hover:bg-secondary hover:text-leaf-deep"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={openQuote}
          className="hidden rounded-full bg-leaf-deep px-5 py-2.5 text-sm font-bold text-cream shadow-sm transition hover:bg-leaf md:inline-flex"
        >
          Get a Quote
        </button>
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
                onClick={(e) => onLinkClick(e, n.id)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-ink/80 hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => { setOpen(false); openQuote(); }}
              className="mt-2 rounded-lg bg-leaf-deep px-3 py-3 text-left text-sm font-bold text-cream"
            >
              Get a Quote
            </button>
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

/* A little orange-and-green push mower chewing through tall grass.
   The mower rolls right-to-left, blades spin, uncut grass on the left
   is tall and wild; on the right it's a tidy stubble. */
function MowerScene() {
  return (
    <div className="relative mx-auto -mb-2 max-w-6xl px-5 sm:px-8" aria-hidden>
      <svg viewBox="0 0 1200 140" className="block h-24 w-full sm:h-32" preserveAspectRatio="xMidYEnd meet">
        <defs>
          <linearGradient id="ms-blade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.13 140)" />
            <stop offset="100%" stopColor="oklch(0.55 0.16 145)" />
          </linearGradient>
          <linearGradient id="ms-stub" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.14 142)" />
            <stop offset="100%" stopColor="oklch(0.5 0.14 148)" />
          </linearGradient>
        </defs>

        {/* uncut tall grass — left side */}
        <g>
          {Array.from({ length: 90 }).map((_, i) => {
            const x = i * 7 + 2;
            const h = 22 + ((i * 13) % 18);
            const sway = (i % 5) - 2;
            return (
              <path
                key={`tall-${i}`}
                d={`M${x},130 C${x + sway},${130 - h * 0.6} ${x - sway},${130 - h * 0.85} ${x},${130 - h}`}
                stroke="url(#ms-blade)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </g>

        {/* freshly cut clippings flying out of the mower */}
        <g className="rl-clippings">
          {Array.from({ length: 10 }).map((_, i) => (
            <circle key={i} cx={640 + i * 6} cy={110 - (i % 4) * 6} r="1.6" fill="oklch(0.6 0.18 145)" opacity={0.8 - i * 0.05} />
          ))}
        </g>

        {/* stubble — right side */}
        <g>
          {Array.from({ length: 80 }).map((_, i) => {
            const x = 640 + i * 7;
            const h = 5 + ((i * 11) % 4);
            return (
              <line key={`stub-${i}`} x1={x} y1={130} x2={x} y2={130 - h} stroke="url(#ms-stub)" strokeWidth="1.6" strokeLinecap="round" />
            );
          })}
        </g>

        {/* ground line */}
        <line x1="0" y1="131" x2="1200" y2="131" stroke="oklch(0.45 0.06 80)" strokeWidth="1" opacity="0.4" />

        {/* the mower — sits at x ~ 560-650 */}
        <g className="rl-mower">
          {/* handle */}
          <path d="M560,46 L640,98" stroke="oklch(0.25 0.02 250)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M540,42 L580,42" stroke="oklch(0.25 0.02 250)" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* grip */}
          <rect x="535" y="36" width="48" height="12" rx="6" fill="oklch(0.25 0.02 250)" />

          {/* body — orange shell echoing the logo sun */}
          <path
            d="M598,128 L598,108 Q598,86 622,86 L692,86 Q716,86 716,108 L716,128 Z"
            fill="oklch(0.7 0.19 50)"
          />
          {/* darker bottom band */}
          <rect x="598" y="118" width="118" height="10" fill="oklch(0.55 0.18 45)" />
          {/* deck stripe */}
          <rect x="610" y="96" width="94" height="4" rx="2" fill="oklch(0.85 0.14 78)" />
          {/* leaf badge */}
          <circle cx="657" cy="106" r="9" fill="oklch(0.45 0.13 150)" />
          <path d="M653,106 Q657,98 661,106 Q657,114 653,106 Z" fill="oklch(0.82 0.13 140)" />

          {/* engine top */}
          <rect x="630" y="74" width="40" height="14" rx="3" fill="oklch(0.3 0.02 250)" />
          <rect x="664" y="68" width="6" height="10" fill="oklch(0.25 0.02 250)" />

          {/* wheels */}
          <g className="rl-wheel">
            <circle cx="612" cy="126" r="11" fill="oklch(0.2 0.02 250)" />
            <circle cx="612" cy="126" r="4" fill="oklch(0.85 0.14 78)" />
            <line x1="612" y1="118" x2="612" y2="134" stroke="oklch(0.85 0.14 78)" strokeWidth="1.5" />
            <line x1="604" y1="126" x2="620" y2="126" stroke="oklch(0.85 0.14 78)" strokeWidth="1.5" />
          </g>
          <g className="rl-wheel">
            <circle cx="702" cy="126" r="11" fill="oklch(0.2 0.02 250)" />
            <circle cx="702" cy="126" r="4" fill="oklch(0.85 0.14 78)" />
            <line x1="702" y1="118" x2="702" y2="134" stroke="oklch(0.85 0.14 78)" strokeWidth="1.5" />
            <line x1="694" y1="126" x2="710" y2="126" stroke="oklch(0.85 0.14 78)" strokeWidth="1.5" />
          </g>
        </g>

        <style>{`
          .rl-mower { transform-origin: center; animation: rl-bob 0.6s ease-in-out infinite; }
          .rl-wheel { transform-box: fill-box; transform-origin: center; animation: rl-spin 0.8s linear infinite; }
          .rl-clippings { animation: rl-fly 0.9s ease-out infinite; transform-origin: 640px 110px; }
          @keyframes rl-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
          @keyframes rl-spin { to { transform: rotate(360deg); } }
          @keyframes rl-fly { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(40px,-10px); opacity: 0; } }
          @media (prefers-reduced-motion: reduce) { .rl-mower, .rl-wheel, .rl-clippings { animation: none; } }
        `}</style>
      </svg>
    </div>
  );
}

function Hero() {
  const { open: openQuote } = useQuoteDialog();
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
            <button type="button" onClick={openQuote} className="rounded-full bg-leaf-deep px-6 py-3 font-bold text-cream shadow-md transition hover:bg-leaf">
              Request a Free Quote
            </button>

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
      <MowerScene />
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
    <section id="services" className="relative bg-secondary/60 py-20">
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
    <section id="about" className="relative py-20">
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
    <section id="work" className="relative bg-ink py-20 text-cream">
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
  return (
    <section id="contact" className="relative overflow-hidden py-20">
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

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

function QuoteForm({ onDone }: { onDone?: () => void } = {}) {
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
    onDone?.();
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-deep text-3xl text-cream">✓</div>
        <h3 className="mt-4 text-2xl">Thanks — we got it!</h3>
        <p className="mt-2 text-ink/65">We'll reach out via your preferred method shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
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
    </form>
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

function TrustBand() {
  const stats = [
    { v: "5.0★", l: "Google rating" },
    { v: "100%", l: "Locally owned" },
    { v: "Same-day", l: "Quotes" },
    { v: "Free", l: "Estimates" },
  ];
  return (
    <section className="border-y border-border bg-leaf-deep py-8 text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 sm:grid-cols-4 sm:px-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-3xl sm:text-4xl text-sun">{s.v}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-cream/80">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const { open: openQuote } = useQuoteDialog();
  const steps = [
    { n: "01", t: "Reach out", d: "Send a quick message or give us a call — tell us about your yard." },
    { n: "02", t: "Free quote", d: "We'll get back same-day with fair, upfront pricing. No surprises." },
    { n: "03", t: "We mow", d: "Show up on schedule, do the small details right, leave it looking great." },
  ];
  return (

    <section className="relative bg-secondary/60 pt-4 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="How it works" title="Three steps. No headaches." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7">
              <div className="font-display text-5xl text-sun/80">{s.n}</div>
              <h3 className="mt-3 text-xl">{s.t}</h3>
              <p className="mt-2 text-sm text-ink/65">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-leaf-deep text-cream md:flex">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={openQuote} className="rounded-full bg-leaf-deep px-6 py-3 font-bold text-cream shadow-md transition hover:bg-leaf">
            Start with a free quote
          </button>

        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { q: "They left our yard looking better than it has in years. Friendly, on-time, and reasonably priced.", a: "Sarah K.", role: "Kingston, TN" },
    { q: "Reliable every single week. Edges are crisp and they always clean up after. Couldn't ask for more.", a: "Mike R.", role: "Roane County" },
    { q: "Easy to work with and clearly takes pride in the work. Highly recommend Rivenbark Lawncare.", a: "Dana P.", role: "Kingston, TN" },
  ];
  return (
    <section className="relative bg-secondary/60 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="What folks say" title="5.0★ from neighbors who'd know." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.a} className="relative rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="text-sun-deep">{"★★★★★"}</div>
              <blockquote className="mt-4 text-ink/80">"{r.q}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-leaf-deep font-display text-cream">
                  {r.a[0]}
                </div>
                <div>
                  <div className="font-semibold text-ink">{r.a}</div>
                  <div className="text-xs text-ink/55">{r.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  const cities = ["Kingston", "Harriman", "Rockwood", "Lenoir City", "Oak Ridge", "Loudon", "Farragut", "Oliver Springs"];
  return (
    <section className="relative py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <SectionHeader eyebrow="Service area" title="Proudly local to Kingston & nearby." align="left" />
          <p className="mt-6 text-lg text-ink/70">
            Based at 309 Kingwood St in Kingston, TN — we serve Kingston and the surrounding Roane County communities. Not sure if you're in range? Just ask.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:+18652500515" className="rounded-full bg-leaf-deep px-5 py-2.5 font-bold text-cream transition hover:bg-leaf">
              Call (865) 250-0515
            </a>
            <a href="#contact" className="rounded-full border-2 border-ink/10 bg-white px-5 py-2.5 font-bold text-ink transition hover:border-ink/30">
              Check my address
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cities.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-card px-4 py-3 text-center font-semibold text-ink/80 transition hover:border-leaf hover:text-leaf-deep">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "What areas do you serve?", a: "Kingston, TN and nearby Roane County communities — Harriman, Rockwood, Lenoir City, and more. Ask if you're unsure." },
    { q: "How do I get a quote?", a: "Call (865) 250-0515 or fill out the contact form. Most quotes come back the same day, completely free." },
    { q: "Do you offer weekly service?", a: "Yes — weekly, bi-weekly, or one-time visits. We'll set a schedule that fits your yard and your budget." },
    { q: "What's included in a typical visit?", a: "Mowing, line trimming around obstacles, edging walks and driveways, and blowing off hard surfaces when we leave." },
    { q: "How do I pay?", a: "We accept cash, check, and most digital payment options. Talk through what works best when you book." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative pt-4 pb-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeader eyebrow="Questions" title="Good to know." />
        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg text-ink"
                >
                  <span>{it.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf-deep text-cream transition ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && <div className="px-5 pb-5 text-ink/70">{it.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream">
      <div className="sun-glow absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-4xl text-cream sm:text-5xl">
            Ready for a yard you're <span className="text-sun">proud of?</span>
          </h2>
          <p className="mt-4 max-w-xl text-cream/75">
            Free, same-day quotes. Friendly local crew. No long-term contracts — just a great looking lawn.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
          <a href="#contact" className="rounded-full bg-sun px-6 py-3 text-center font-bold text-ink shadow-md transition hover:bg-sun-deep">
            Request a Free Quote
          </a>
          <a href="tel:+18652500515" className="rounded-full border-2 border-cream/30 px-6 py-3 text-center font-bold text-cream transition hover:bg-cream/10">
            Call (865) 250-0515
          </a>
        </div>
      </div>
    </section>
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
