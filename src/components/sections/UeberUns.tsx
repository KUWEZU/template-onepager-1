import Image from "next/image";
import { Award, Users, Wrench, ThumbsUp } from "lucide-react";
import { client } from "@/data/client";

const STAT_ICONS = [Award, ThumbsUp, Users, Wrench];

export function UeberUns() {
  const { bild, ueberschrift, text1, text2, tags, stats } = client.ueberUns;

  return (
    <section
      id="ueber-uns"
      className="py-28"
      style={{ backgroundColor: "var(--color-page-bg)" }}
      aria-labelledby="ueber-uns-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Linke Spalte: Text ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-6">
              <span className="text-safe-secondary text-sm font-semibold uppercase tracking-wider">Über uns</span>
            </div>

            <h2 id="ueber-uns-heading" className="text-4xl sm:text-5xl font-black text-brand-heading leading-tight mb-6">
              {ueberschrift.split("—").map((part, i) =>
                i === 0
                  ? <span key={i}>{part}—<br /></span>
                  : <span key={i} className="text-safe-primary">{part}</span>
              )}
            </h2>

            <p className="text-brand-text/70 text-lg leading-relaxed mb-5">{text1}</p>
            <p className="text-brand-muted text-lg leading-relaxed mb-10">{text2}</p>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag}
                  className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-safe-primary
                             bg-brand-primary/10 border border-brand-primary/20 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Rechte Spalte: Bild + Stats ── */}
          <div className="flex flex-col gap-6">
            {/* Bild */}
            {bild ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border"
                style={{ boxShadow: "var(--card-shadow), 0 20px 60px rgba(0,0,0,0.15)" }}>
                <Image src={bild} alt="Unser Betrieb" fill
                  sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center"
                  unoptimized={bild.endsWith(".svg")} />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-brand-primary/15 pointer-events-none" />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl border border-brand-border flex items-center justify-center"
                style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                <div className="text-center text-brand-text/20">
                  <Award className="w-12 h-12 mx-auto mb-3" aria-hidden="true" />
                  <p className="text-base">Kein Bild konfiguriert</p>
                </div>
              </div>
            )}

            {/* Stats 2×2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }, i) => {
                const Icon = STAT_ICONS[i] ?? Award;
                return (
                  <div key={label}
                    className="border border-brand-border rounded-2xl p-5
                               hover:border-brand-primary/30 transition-all group"
                    style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                    <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-3
                                    group-hover:bg-brand-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-black text-brand-heading">{value}</p>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
