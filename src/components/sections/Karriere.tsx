import { Briefcase, GraduationCap, Users, Heart, ArrowRight } from "lucide-react";
import { client } from "@/data/client";

// Neutrale Default-Kacheln — bewusst OHNE konkrete Zusagen (kein "30 Tage
// Urlaub"/"unbefristet"): gelten für jeden Betrieb, ohne etwas zu versprechen,
// das der Inhaber nicht bestätigt hat. Pro Kunde überschreibbar via
// client.karriere.benefits (zentrale Datenschicht).
const DEFAULT_BENEFITS = [
  { icon: Briefcase,     title: "Verlässlicher Betrieb", text: "Ein eingespielter Betrieb mit langfristiger Perspektive." },
  { icon: GraduationCap, title: "Entwicklung",           text: "Wir fördern fachliche Weiterentwicklung und Qualifizierung." },
  { icon: Users,         title: "Starkes Team",          text: "Kollegiales Miteinander und kurze Wege im Alltag." },
  { icon: Heart,         title: "Fairness",              text: "Faire Bedingungen und ein respektvolles Umfeld." },
];

// Icons sind Positions-basiert — Overrides aus der Datenschicht liefern nur
// title/text, die Icon-Zuordnung bleibt stabil (wie bei den Statistik-Kacheln).
const BENEFIT_ICONS = [Briefcase, GraduationCap, Users, Heart];

export function Karriere() {
  // Ganze Section pro Kunde abschaltbar (Default: an, auch für alte client.ts).
  if (client.karriere?.enabled === false) return null;

  const jobs = client.karriere?.jobs ?? [];
  // Button-Ziel: hinterlegte http(s)-URL → externer Link im NEUEN Tab
  // (noopener noreferrer); leer → In-Page-Anker #kontakt wie bisher.
  const buttonUrl = client.karriere?.buttonUrl ?? null;
  const ctaHref = buttonUrl ?? "#kontakt";
  const ctaExternal = buttonUrl !== null;
  const ctaProps = ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const benefitOverrides = client.karriere?.benefits ?? null;
  const benefits = benefitOverrides?.length
    ? benefitOverrides.map((b, i) => ({ icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length], title: b.title, text: b.text }))
    : DEFAULT_BENEFITS;

  return (
    <section
      id="karriere"
      className="py-28"
      style={{ backgroundColor: "var(--color-page-bg)" }}
      aria-labelledby="karriere-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-icon-surface border border-icon-ring mb-6">
            <span className="text-safe-primary text-sm font-semibold uppercase tracking-wider">Karriere</span>
          </div>
          <h2 id="karriere-heading" className="text-4xl sm:text-5xl font-black text-brand-heading mb-5">
            Werde Teil unseres Teams
          </h2>
          <p className="max-w-xl mx-auto text-brand-muted text-lg leading-relaxed">
            Wir suchen motivierte Fachkräfte, die mit uns gemeinsam wachsen wollen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14">

          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-brand-heading mb-7">Warum zu uns?</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map(({ icon: Icon, title, text }) => (
                <div key={title}
                  className="border border-brand-border rounded-2xl p-6
                             hover:border-icon-ring transition-all"
                  style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                  <div className="w-11 h-11 rounded-xl bg-icon-surface border border-icon-ring flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                  </div>
                  <p className="text-base font-bold text-brand-heading mb-2">{title}</p>
                  <p className="text-base text-brand-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stellen — bei leerer Liste komplett ausgeblendet (kein leerer Block) */}
          <div>
            {jobs.length > 0 && (
              <>
            <h3 className="text-2xl font-bold text-brand-heading mb-7">Offene Stellen</h3>
            <ul className="space-y-4" role="list" aria-label="Stellenangebote">
              {jobs.map((job) => (
                <li key={job.title}>
                  <a href={ctaHref} {...ctaProps}
                    className="flex items-center justify-between gap-4 border border-brand-border rounded-2xl p-5
                               hover:border-icon-ring transition-all group min-h-[72px]"
                    style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
                    aria-label={`Stelle: ${job.title}`}>
                    <div>
                      <p className="text-base font-bold text-brand-text group-hover:text-safe-primary transition-colors">
                        {job.title}
                      </p>
                      <p className="text-base text-brand-muted mt-1">{job.type} · {job.experience}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-safe-primary shrink-0 transition-colors" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
              </>
            )}

            <div className={jobs.length > 0 ? "mt-6 p-6 bg-icon-surface border border-icon-ring rounded-2xl" : "p-6 bg-icon-surface border border-icon-ring rounded-2xl"}>
              <p className="text-base text-brand-text/80 leading-relaxed">
                <span className="font-bold text-safe-primary">{jobs.length > 0 ? "Keine passende Stelle dabei?" : "Interesse an einer Mitarbeit?"}</span><br />
                Initiativbewerbungen sind jederzeit willkommen.
              </p>
              <a href={ctaHref} {...ctaProps}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-brand-primary text-on-primary
                           font-semibold rounded-xl hover:bg-brand-primary-hover transition-all text-base min-h-[44px]">
                Initiativ bewerben <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
