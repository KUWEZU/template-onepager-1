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

  const HERO_OVERLAY_MIN = 0.55; // fixed — never weaker, never overridable
  const base = Math.max(overlayOpacity ?? HERO_OVERLAY_MIN, HERO_OVERLAY_MIN);
  const top  = Math.min(base + 0.20, 1);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Startbereich"
    >
      {bild && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={bild} alt="" fill priority sizes="100vw" className="object-cover object-center" unoptimized={bild.endsWith(".svg")} />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,${top}) 0%, rgba(0,0,0,${base}) 35%, rgba(0,0,0,${base}) 100%)`
          }} />
        </div>
      )}

      {!bild && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: "var(--color-brand-primary)" }} />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-24 text-center">

        <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/25 mb-8 backdrop-blur-sm">
          <span className="text-white text-base font-medium">
            {client.branche ?? "Werkstatt"} in {client.ort}
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
        >
          {ueberschrift.replace(ueberschriftHighlight, "").trim()}
          <br />
          <span
            className="text-brand-primary"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)" }}
          >
            {ueberschriftHighlight}
          </span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-xl text-white/85 leading-relaxed mb-10"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          {untertext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={ctaPrimary.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-on-primary font-semibold rounded-xl
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

        <div className="flex flex-wrap items-center justify-center gap-8" role="list" aria-label="Vertrauensnachweise">
          {BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-white/80" role="listitem">
              <Icon className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30" aria-hidden="true">
        <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
