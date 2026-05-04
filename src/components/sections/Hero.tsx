import Image from "next/image";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";
import { client } from "@/data/client";

const BADGES = [
  { icon: Shield, text: "TÜV-zertifiziert" },
  { icon: Star,   text: "4,9 ★ bei Google"  },
  { icon: Clock,  text: "Express-Service"   },
];

export function Hero() {
  const { bild, ueberschrift, ueberschriftHighlight, untertext, ctaPrimary, ctaSecondary, overlayOpacity } = client.hero;

  // Overlay strength: use client value (set per farbmodus), min 0.65 for WCAG AA compliance.
  // Top of gradient is extra dark so the fixed navbar always has a legible background.
  const base = Math.max(overlayOpacity ?? 0.65, 0.65);
  const top  = Math.min(base + 0.15, 1);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Startbereich"
    >
      {/* ── Hintergrundbild mit verstärktem Overlay ── */}
      {bild && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={bild} alt="" fill priority sizes="100vw" className="object-cover object-center" unoptimized={bild.endsWith(".svg")} />
          {/* Gradient: oben sehr dunkel (Navbar-Bereich) → gleichmäßig dunkel darunter.
              Mindest-Overlay 0.65 → WCAG AA ≥ 4.5:1 für weißen Text auf beliebigem Foto. */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,${top}) 0%, rgba(0,0,0,${base}) 35%, rgba(0,0,0,${base}) 100%)`
          }} />
        </div>
      )}

      {/* ── Fallback wenn kein Bild: Dark gradient + Primärfarben-Glow ── */}
      {!bild && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: "var(--color-brand-primary)" }} />
        </div>
      )}

      {/* ── Inhalt — immer weiß ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-24 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" aria-hidden="true" />
          <span className="text-brand-secondary text-base font-medium">
            Ihre {client.branche ?? "Werkstatt"} in {client.ort}
          </span>
        </div>

        {/* Headline — min 3rem (48px = text-5xl) */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
        >
          {ueberschrift.replace(ueberschriftHighlight, "").trim()}
          <br />
          {/* Accent-Farbe auf dunklem Overlay: #ffd100 vs black ≈ 13:1 ✅ */}
          <span
            className="text-brand-primary"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)" }}
          >
            {ueberschriftHighlight}
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="max-w-2xl mx-auto text-xl text-white/85 leading-relaxed mb-10"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          {untertext}
        </p>

        {/* CTA-Buttons — min 44px Höhe (WCAG 2.5.5) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={ctaPrimary.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl
                       hover:bg-brand-primary-hover transition-all shadow-2xl shadow-brand-primary/30
                       text-lg min-h-[52px]"
          >
            {ctaPrimary.text}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href={ctaSecondary.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl
                       border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all
                       backdrop-blur-sm text-lg min-h-[52px]"
          >
            {ctaSecondary.text}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8" role="list" aria-label="Vertrauensnachweise">
          {BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-white/70" role="listitem">
              <Icon className="w-5 h-5 text-brand-secondary shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30" aria-hidden="true">
        <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
