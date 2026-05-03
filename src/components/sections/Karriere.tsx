import { Briefcase, GraduationCap, Users, Heart, ArrowRight } from "lucide-react";

const BENEFITS = [
  { icon: Briefcase, title: "Sicherer Arbeitsplatz",   text: "Unbefristete Festanstellung in einem stabilen, wachsenden Betrieb." },
  { icon: GraduationCap, title: "Weiterbildung",       text: "Regelmäßige Schulungen, Zertifizierungen und Aufstiegsmöglichkeiten." },
  { icon: Users, title: "Starkes Team",                text: "Kollegiales Umfeld mit flachen Hierarchien und echter Teamkultur." },
  { icon: Heart, title: "Work-Life-Balance",           text: "Faire Arbeitszeiten, 30 Tage Urlaub und Familienfreundlichkeit." },
];

const JOBS = [
  {
    title: "Kfz-Mechatroniker / -in",
    type: "Vollzeit",
    experience: "Berufserfahrung erwünscht",
  },
  {
    title: "Kfz-Lackierer / -in",
    type: "Vollzeit",
    experience: "Berufseinsteiger willkommen",
  },
  {
    title: "Karosseriebauer / -in",
    type: "Vollzeit / Teilzeit",
    experience: "Berufserfahrung erwünscht",
  },
  {
    title: "Auszubildende / -r Kfz-Mechatronik",
    type: "Ausbildung",
    experience: "Schulabschluss erforderlich",
  },
];

export function Karriere() {
  return (
    <section
      id="karriere"
      className="py-24 bg-[#0d0f1a]"
      aria-labelledby="karriere-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Karriere</span>
          </div>
          <h2
            id="karriere-heading"
            className="text-3xl sm:text-4xl font-black text-white mb-4"
          >
            Werde Teil unseres Teams
          </h2>
          <p className="max-w-xl mx-auto text-white/55 text-lg">
            Wir suchen motivierte Fachkräfte, die mit uns gemeinsam wachsen wollen.
            Bewirb dich jetzt und starte deine Karriere bei uns.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Warum zu uns?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="bg-[#13162b] border border-white/[0.08] rounded-xl p-5 hover:border-brand-primary/20 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{title}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job listings */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Offene Stellen</h3>
            <ul className="space-y-3" role="list" aria-label="Stellenangebote">
              {JOBS.map((job) => (
                <li key={job.title}>
                  <a
                    href="#kontakt"
                    className="flex items-center justify-between gap-4 bg-[#13162b] border border-white/[0.08] rounded-xl p-4 hover:border-brand-primary/25 transition-all group"
                    aria-label={`Stelle: ${job.title}`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-brand-primary transition-colors">
                        {job.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-white/40">{job.type}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
                        <span className="text-xs text-white/40">{job.experience}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-brand-primary shrink-0 transition-colors" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 p-4 bg-brand-primary/[0.06] border border-brand-primary/20 rounded-xl">
              <p className="text-sm text-white/70">
                <span className="font-semibold text-brand-primary">Keine passende Stelle dabei?</span>
                {" "}Initiativbewerbungen sind jederzeit willkommen.
              </p>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-brand-primary hover:underline"
              >
                Initiativ bewerben <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
