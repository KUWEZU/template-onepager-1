import Image from "next/image";
import {
  Paintbrush2, Car, CircleDot, ClipboardCheck, CheckCircle,
  Wind, Sparkles, Thermometer, RotateCcw, CloudRain, Wrench,
} from "lucide-react";
import { client, type LeistungConfig } from "@/data/client";

// Icons in der gleichen Reihenfolge wie die Leistungen in client.ts
const ICONS = [
  Paintbrush2, Car, CircleDot, ClipboardCheck, CheckCircle,
  Wind, Sparkles, Thermometer, RotateCcw, CloudRain, Wrench,
];

export function Leistungen() {
  return (
    <section
      id="leistungen"
      className="py-24 bg-[#13162b]"
      aria-labelledby="leistungen-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Leistungen</span>
          </div>
          <h2 id="leistungen-heading" className="text-3xl sm:text-4xl font-black text-white mb-4">
            Alles aus einer Hand
          </h2>
          <p className="max-w-xl mx-auto text-white/55 text-lg">
            Wir bieten das komplette Spektrum der Fahrzeugreparatur und -pflege —
            professionell, transparent und zu fairen Preisen.
          </p>
        </div>

        {/* Cards */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Leistungsübersicht">
          {client.leistungen.map((leistung, i) => (
            <li key={leistung.slug}>
              <LeistungCard leistung={leistung} icon={ICONS[i] ?? Wrench} />
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 mb-4">Ihr Anliegen ist nicht dabei?</p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-[#0d0f1a] font-semibold rounded-xl hover:bg-[#b8963e] transition-all"
          >
            Sprechen Sie uns an
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Einzelne Leistungskarte ──────────────────────────────────────────────────
function LeistungCard({
  leistung,
  icon: Icon,
}: {
  leistung: LeistungConfig;
  icon: React.ElementType;
}) {
  return (
    <div className="h-full flex flex-col bg-[#0d0f1a] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-brand-primary/25 transition-all group">
      {/* ── Bild oben (16:9) ── */}
      {leistung.bild ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={leistung.bild}
            alt={`${leistung.title} — Leistungsbild`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            unoptimized={leistung.bild.endsWith(".svg")}
          />
          {/* Gradient unten für sanften Übergang zum Card-Body */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d0f1a] to-transparent" />
        </div>
      ) : (
        /* Fallback: Placeholder mit Icon wenn kein Bild */
        <div className="relative w-full aspect-video bg-[#13162b] flex items-center justify-center border-b border-white/[0.06]">
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-brand-primary" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Icon + Titel */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/15 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-white">{leistung.title}</h3>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{leistung.description}</p>

        {/* Highlights */}
        <ul className="space-y-1" aria-label={`Highlights ${leistung.title}`}>
          {leistung.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-1 h-1 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
