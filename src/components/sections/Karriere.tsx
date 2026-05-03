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
    <section id="karriere" className="py-24 bg-brand-bg" aria-labelledby="karriere-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Karriere</span>
          </div>
          <h2 id="karriere-heading" className="text-3xl sm:text-4xl font-black text-brand-text mb-4">Werde Teil unseres Teams</h2>
          <p className="max-w-xl mx-auto text-brand-muted text-lg">
            Wir suchen motivierte Fachkräfte, die mit uns gemeinsam wachsen wollen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-brand-text mb-6">Warum zu uns?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-brand-surface border border-brand-border rounded-xl p-5 shadow-sm hover:border-brand-primary/20 transition-all">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-brand-text mb-1">{title}</p>
                  <p className="text-xs text-brand-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-brand-text mb-6">Offene Stellen</h3>
            <ul className="space-y-3" role="list" aria-label="Stellenangebote">
              {jobs.map((job) => (
                <li key={job.title}>
                  <a href="#kontakt"
                    className="flex items-center justify-between gap-4 bg-brand-surface border border-brand-border rounded-xl p-4 shadow-sm hover:border-brand-primary/25 transition-all group"
                    aria-label={`Stelle: ${job.title}`}>
                    <div>
                      <p className="text-sm font-semibold text-brand-text group-hover:text-brand-primary transition-colors">{job.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-brand-muted">{job.type}</span>
                        <span className="w-1 h-1 rounded-full bg-brand-border" aria-hidden="true" />
                        <span className="text-xs text-brand-muted">{job.experience}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-primary shrink-0 transition-colors" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 p-4 bg-brand-primary/[0.06] border border-brand-primary/20 rounded-xl">
              <p className="text-sm text-brand-text/70">
                <span className="font-semibold text-brand-primary">Keine passende Stelle dabei?</span>
                {" "}Initiativbewerbungen sind jederzeit willkommen.
              </p>
              <a href="#kontakt" className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-brand-primary hover:underline">
                Initiativ bewerben <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
