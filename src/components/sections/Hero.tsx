import Image from "next/image";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";
import { client } from "@/data/client";

const BADGES = [
  { icon: Shield, text: "TÜV-zertifiziert" },
  { icon: Star,   text: "4,9 ★ bei Google" },
  { icon: Clock,  text: "Express-Service"  },
];

export function Hero() {
  const { bild, overlayOpacity, ueberschrift, ueberschriftHighlight, untertext, ctaPrimary, ctaSecondary } =
    client.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0f1a]"
      aria-label="Startbereich"
    >
      {/* ── Hintergrundbild ── */}
      {bild && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={bild}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            unoptimized={bild.endsWith(".svg")}
          />
          {/* Dunkles Overlay für Lesbarkeit */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
          />
          {/* Gradient unten für weichen Übergang */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0d0f1a] to-transparent" />
        </div>
      )}

      {/* ── Fallback Gradient (wenn kein Bild) ── */}
      {!bild && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/[0.06] rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.04] rounded-full blur-[80px]" />
        </div>
      )}

      {/* ── Subtiles Grid-Overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
          <span className="text-brand-primary text-sm font-medium">
            Ihre {client.branche ?? "Werkstatt"} in {client.ort}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
          {ueberschrift}
          <br />
          <span className="text-brand-primary">{ueberschriftHighlight}</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/75 leading-relaxed mb-8 drop-shadow">
          {untertext}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href={ctaPrimary.href}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-primary text-[#0d0f1a] font-semibold rounded-xl hover:bg-[#b8963e] transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30"
          >
            {ctaPrimary.text}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={ctaSecondary.href}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.08] text-white font-semibold rounded-xl border border-white/[0.18] hover:bg-white/[0.14] hover:border-white/[0.28] transition-all backdrop-blur-sm"
          >
            {ctaSecondary.text}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/60 drop-shadow">
              <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
        aria-hidden="true"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  );
}
