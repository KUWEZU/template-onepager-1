"use client";

import Image from "next/image";
import { ArrowRight, Star, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "@/data/client";
import reviewsRaw from "@/data/reviews.json";

type ReviewsJson = { averageRating: number | null; totalCount: number };
const reviewsData = reviewsRaw as ReviewsJson;

// ── Tageszeitliche Öffnungszeit ───────────────────────────────────────────────

type OeffZeiten = { mo_fr: string; sa: string; so: string };

function useTodaysHours(oz: OeffZeiten): string | null {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const day = new Date().getDay(); // 0=So, 1–5=Mo–Fr, 6=Sa
    if (day === 0) {
      setText(oz.so ? `So: ${oz.so}` : "Heute geschlossen");
    } else if (day === 6) {
      setText(oz.sa ? `Sa: ${oz.sa}` : "Heute geschlossen");
    } else {
      setText(oz.mo_fr ? `Mo–Fr: ${oz.mo_fr}` : "Auf Anfrage");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return text;
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  const { bild, ueberschrift, ueberschriftHighlight, untertext, ctaPrimary, ctaSecondary, overlayOpacity } =
    client.hero;

  // Öffnungszeiten aus client (mit Fallback falls Feld fehlt)
  const oz: OeffZeiten = (client as unknown as { oeffnungszeiten?: OeffZeiten }).oeffnungszeiten ?? {
    mo_fr: "",
    sa: "",
    so: "",
  };
  const todaysHours = useTodaysHours(oz);

  // Google-Bewertung
  const rating    = reviewsData?.averageRating;
  const ratingCnt = reviewsData?.totalCount;
  const googleText =
    rating !== null && rating !== undefined
      ? `${String(rating).replace(".", ",")} ★ bei Google${ratingCnt ? ` (${ratingCnt})` : ""}`
      : null;

  // TÜV Termine
  const tuevTermine = (client as unknown as { tuev_termine?: boolean }).tuev_termine ?? false;

  const HERO_OVERLAY_MIN = 0.55;
  const base = Math.max(overlayOpacity ?? HERO_OVERLAY_MIN, HERO_OVERLAY_MIN);
  const top  = Math.min(base + 0.2, 1);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Startbereich"
    >
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
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,${top}) 0%, rgba(0,0,0,${base}) 35%, rgba(0,0,0,${base}) 100%)`,
            }}
          />
        </div>
      )}

      {!bild && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: "var(--color-brand-primary)" }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/25 mb-8 backdrop-blur-sm">
          <span className="text-white text-base font-medium">
            {client.branche ?? "Werkstatt"} in {client.ort}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 hero-title-shadow">
          {ueberschrift.replace(ueberschriftHighlight, "").trim()}
          <br />
          <span className="text-brand-primary hero-highlight-shadow">
            {ueberschriftHighlight}
          </span>
        </h1>

        {/* Untertext */}
        <p className="max-w-2xl mx-auto text-xl text-white/85 leading-relaxed mb-10 hero-text-shadow">
          {untertext}
        </p>

        {/* CTAs */}
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

        {/* Trust Badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-8"
          role="list"
          aria-label="Vertrauensnachweise"
        >
          {/* TÜV Termine — nur wenn aktiviert */}
          {tuevTermine && (
            <div className="flex items-center gap-2.5 text-white/80" role="listitem">
              <Calendar className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">TÜV Termine verfügbar</span>
            </div>
          )}

          {/* Google Bewertung — nur wenn Rating vorhanden */}
          {googleText && (
            <div className="flex items-center gap-2.5 text-white/80" role="listitem">
              <Star className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">{googleText}</span>
            </div>
          )}

          {/* Öffnungszeiten — erscheint nach Client-Hydration */}
          {todaysHours && (
            <div className="flex items-center gap-2.5 text-white/80" role="listitem">
              <Clock className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">{todaysHours}</span>
            </div>
          )}
        </div>
      </div>

      {/* Scroll-Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        aria-hidden="true"
      >
        <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
