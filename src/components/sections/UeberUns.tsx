import Image from "next/image";
import { Award, Users, Wrench, ThumbsUp } from "lucide-react";
import { client } from "@/data/client";

const STAT_ICONS = [Award, ThumbsUp, Users, Wrench];

export function UeberUns() {
  const { bild, ueberschrift, text1, text2, tags, stats } = client.ueberUns;

  return (
    <section
      id="ueber-uns"
      className="py-24 bg-[#0d0f1a]"
      aria-labelledby="ueber-uns-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── Text side ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
              <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Über uns</span>
            </div>

            <h2
              id="ueber-uns-heading"
              className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5"
            >
              {ueberschrift.split("—").map((part, i) =>
                i === 0 ? (
                  <span key={i}>{part}—<br /></span>
                ) : (
                  <span key={i} className="text-brand-primary">{part}</span>
                )
              )}
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-4">{text1}</p>
            <p className="text-white/50 leading-relaxed mb-8">{text2}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats — mobile only (hidden on lg, shown in image column on lg) */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {stats.map(({ value, label }, i) => {
                const Icon = STAT_ICONS[i] ?? Award;
                return (
                  <div key={label} className="bg-[#13162b] border border-white/[0.08] rounded-xl p-4">
                    <Icon className="w-4 h-4 text-brand-primary mb-2" aria-hidden="true" />
                    <p className="text-xl font-black text-white">{value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Image + Stats side (desktop) ── */}
          <div className="flex flex-col gap-5">
            {/* Image */}
            {bild ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.06]">
                <Image
                  src={bild}
                  alt="Unsere Werkstatt"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  unoptimized={bild.endsWith(".svg")}
                />
                {/* Subtle gold border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-brand-primary/10 pointer-events-none" />
              </div>
            ) : (
              /* Placeholder box wenn kein Bild konfiguriert */
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#13162b] border border-white/[0.08] flex items-center justify-center">
                <div className="text-center text-white/20">
                  <Award className="w-10 h-10 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm">Kein Bild konfiguriert</p>
                </div>
              </div>
            )}

            {/* Stats grid — desktop only */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {stats.map(({ value, label }, i) => {
                const Icon = STAT_ICONS[i] ?? Award;
                return (
                  <div
                    key={label}
                    className="bg-[#13162b] border border-white/[0.08] rounded-xl p-5 hover:border-brand-primary/20 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-3 group-hover:bg-brand-primary/20 transition-colors">
                      <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-black text-white">{value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{label}</p>
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
