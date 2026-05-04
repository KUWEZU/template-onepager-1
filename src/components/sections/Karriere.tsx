import { Briefcase, GraduationCap, Users, Heart, ArrowRight } from "lucide-react";
import { client } from "@/data/client";

const BENEFITS = [
  { icon: Briefcase,     title: "Sicherer Arbeitsplatz", text: "Unbefristete Festanstellung in einem stabilen, wachsenden Betrieb." },
  { icon: GraduationCap, title: "Weiterbildung",         text: "Regelmäßige Schulungen, Zertifizierungen und Aufstiegsmöglichkeiten." },
  { icon: Users,         title: "Starkes Team",          text: "Kollegiales Umfeld mit flachen Hierarchien und echter Teamkultur." },
  { icon: Heart,         title: "Work-Life-Balance",     text: "Faire Arbeitszeiten, 30 Tage Urlaub und Familienfreundlichkeit." },
];

export function Karriere() {
  const jobs = client.karriere?.jobs ?? [];

  return (
    <section
      id="karriere"
      className="py-28"
      style={{ backgroundColor: "var(--color-page-bg)" }}
      aria-labelledby="karriere-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-6">
            <span className="text-safe-secondary text-sm font-semibold uppercase tracking-wider">Karriere</span>
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
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <div key={title}
                  className="border border-brand-border rounded-2xl p-6
                             hover:border-brand-primary/25 transition-all"
                  style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                  <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                  </div>
                  <p className="text-base font-bold text-brand-heading mb-2">{title}</p>
                  <p className="text-base text-brand-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stellen */}
          <div>
            <h3 className="text-2xl font-bold text-brand-heading mb-7">Offene Stellen</h3>
            <ul className="space-y-4" role="list" aria-label="Stellenangebote">
              {jobs.map((job) => (
                <li key={job.title}>
                  <a href="#kontakt"
                    className="flex items-center justify-between gap-4 border border-brand-border rounded-2xl p-5
                               hover:border-brand-primary/30 transition-all group min-h-[72px]"
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

            <div className="mt-6 p-6 bg-brand-primary/[0.06] border border-brand-primary/20 rounded-2xl">
              <p className="text-base text-brand-text/80 leading-relaxed">
                <span className="font-bold text-safe-primary">Keine passende Stelle dabei?</span><br />
                Initiativbewerbungen sind jederzeit willkommen.
              </p>
              <a href="#kontakt"
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
