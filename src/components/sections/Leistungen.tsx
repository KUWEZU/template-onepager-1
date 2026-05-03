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
    <section id="leistungen" className="py-24 bg-brand-secondary" aria-labelledby="leistungen-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Leistungen</span>
          </div>
          <h2 id="leistungen-heading" className="text-3xl sm:text-4xl font-black text-brand-text mb-4">
            Alles aus einer Hand
          </h2>
          <p className="max-w-xl mx-auto text-brand-text/55 text-lg">
            Wir bieten das komplette Spektrum — professionell, transparent und zu fairen Preisen.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Leistungsübersicht">
          {client.leistungen.map((leistung, i) => (
            <li key={leistung.slug}>
              <LeistungCard leistung={leistung} icon={ICONS[i] ?? Wrench} />
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <p className="text-brand-text/50 mb-4">Ihr Anliegen ist nicht dabei?</p>
          <a href="#kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-bg font-semibold rounded-xl hover:bg-brand-primary-hover transition-all">
            Sprechen Sie uns an
          </a>
        </div>
      </div>
    </section>
  );
}

function LeistungCard({ leistung, icon: Icon }: { leistung: LeistungConfig; icon: React.ElementType }) {
  return (
    <div className="h-full flex flex-col bg-brand-bg border border-brand-text/[0.08] rounded-2xl overflow-hidden hover:border-brand-primary/25 transition-all group">
      {leistung.bild ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image src={leistung.bild} alt={`${leistung.title} — Leistungsbild`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" unoptimized={leistung.bild.endsWith(".svg")} />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-brand-bg to-transparent" />
        </div>
      ) : (
        <div className="relative w-full aspect-video bg-brand-secondary flex items-center justify-center border-b border-brand-text/[0.06]">
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-brand-primary" aria-hidden="true" />
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/15 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-brand-text">{leistung.title}</h3>
        </div>
        <p className="text-sm text-brand-text/50 leading-relaxed mb-4 flex-1">{leistung.description}</p>
        <ul className="space-y-1" aria-label={`Highlights ${leistung.title}`}>
          {leistung.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-brand-text/40">
              <span className="w-1 h-1 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
