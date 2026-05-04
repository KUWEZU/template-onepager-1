import Image from "next/image";
import {
  Paintbrush2, Car, CircleDot, ClipboardCheck, CheckCircle,
  Wind, Sparkles, Thermometer, RotateCcw, CloudRain, Wrench,
} from "lucide-react";
import { client, type LeistungConfig } from "@/data/client";

const ICONS = [
  Paintbrush2, Car, CircleDot, ClipboardCheck, CheckCircle,
  Wind, Sparkles, Thermometer, RotateCcw, CloudRain, Wrench,
];

export function Leistungen() {
  return (
    <section
      id="leistungen"
      className="py-28"
      style={{ backgroundColor: "var(--color-section-alt)" }}
      aria-labelledby="leistungen-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-6">
            <span className="text-safe-secondary text-sm font-semibold uppercase tracking-wider">Leistungen</span>
          </div>
          <h2 id="leistungen-heading" className="text-4xl sm:text-5xl font-black text-brand-heading mb-5">
            Alles aus einer Hand
          </h2>
          <p className="max-w-2xl mx-auto text-brand-muted text-lg leading-relaxed">
            Wir bieten das komplette Spektrum — professionell, transparent und zu fairen Preisen.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Leistungsübersicht">
          {client.leistungen.map((leistung, i) => (
            <li key={leistung.slug}>
              <LeistungCard leistung={leistung} icon={ICONS[i] ?? Wrench} />
            </li>
          ))}
        </ul>

        <div className="text-center mt-14">
          <p className="text-brand-muted text-lg mb-5">Ihr Anliegen ist nicht dabei?</p>
          <a href="#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-on-primary font-semibold
                       rounded-xl hover:bg-brand-primary-hover transition-all text-lg min-h-[52px]
                       shadow-xl shadow-brand-primary/20">
            Sprechen Sie uns an
          </a>
        </div>
      </div>
    </section>
  );
}

function LeistungCard({ leistung, icon: Icon }: { leistung: LeistungConfig; icon: React.ElementType }) {
  return (
    <article
      className="h-full flex flex-col border border-brand-border rounded-2xl overflow-hidden
                 transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/30 group"
      style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
    >
      {leistung.bild ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image src={leistung.bild} alt={leistung.title} fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            unoptimized={leistung.bild.endsWith(".svg")} />
        </div>
      ) : (
        <div className="w-full aspect-video flex items-center justify-center border-b border-brand-border"
          style={{ backgroundColor: "var(--color-section-alt)" }}>
          <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-safe-icon" aria-hidden="true" />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/15 flex items-center justify-center shrink-0
                          group-hover:bg-brand-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-safe-icon" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-brand-heading">{leistung.title}</h3>
        </div>

        <p className="text-base text-brand-muted leading-relaxed mb-5 flex-1">{leistung.description}</p>

        <ul className="space-y-2" aria-label={`Highlights ${leistung.title}`}>
          {leistung.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-base text-brand-text/60">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
