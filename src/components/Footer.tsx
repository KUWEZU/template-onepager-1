import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { client } from "@/data/client";

export function Footer() {
  const year = new Date().getFullYear();
  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <footer
      className="border-t border-white/[0.06]"
      style={{ backgroundColor: "var(--color-footer-bg)" }}
      aria-label="Seitenende"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              {client.logo ? (
                <Image src={client.logo} alt={client.name} width={140} height={40}
                  className="h-10 w-auto object-contain" unoptimized />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                    <span className="text-on-primary font-black text-sm">{initials}</span>
                  </div>
                  <span className="text-on-footer font-bold text-lg">{client.name}</span>
                </>
              )}
            </div>
            <p className="text-base text-on-footer/50 leading-relaxed mb-6">
              Ihr {client.branche}-Betrieb in {client.ort}. Qualität, Transparenz
              und schneller Service.
            </p>
            <div className="flex items-center gap-3">
              {[{ label: "Facebook", href: "#" }, { label: "Instagram", href: "#" }].map(({ label, href }) => (
                <a key={label} href={href} aria-label={`${label} öffnen`}
                  className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center
                             text-on-footer/40 hover:text-on-footer hover:border-white/[0.16] transition-all text-xs font-medium min-h-[44px]">
                  {label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-base font-semibold text-on-footer mb-5 uppercase tracking-wide text-sm">Leistungen</h3>
            <ul className="space-y-2.5" role="list">
              {client.leistungen.slice(0, 8).map((l) => (
                <li key={l.slug}>
                  <a href="#leistungen"
                    className="text-base text-on-footer/50 hover:text-on-footer transition-colors leading-relaxed">
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="text-base font-semibold text-on-footer mb-5 uppercase tracking-wide text-sm">Unternehmen</h3>
            <ul className="space-y-2.5" role="list">
              {[
                { label: "Über uns",         href: "#ueber-uns"        },
                { label: "Karriere",         href: "#karriere"         },
                { label: "Kontakt",          href: "#kontakt"          },
                { label: "Impressum",        href: "/impressum"        },
                { label: "Datenschutz",      href: "/datenschutz"      },
                { label: "Barrierefreiheit", href: "/barrierefreiheit" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-base text-on-footer/50 hover:text-on-footer transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontaktdaten */}
          <div>
            <h3 className="text-base font-semibold text-on-footer mb-5 uppercase tracking-wide text-sm">Kontakt</h3>
            <ul className="space-y-4" role="list">
              {client.telefon && (
                <li>
                  <a href={`tel:${client.telefon}`}
                    className="flex items-center gap-3 text-base text-on-footer/50 hover:text-on-footer transition-colors group min-h-[44px]">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/25 transition-colors">
                      <Phone className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    </div>
                    {client.telefon}
                  </a>
                </li>
              )}
              {client.email && (
                <li>
                  <a href={`mailto:${client.email}`}
                    className="flex items-center gap-3 text-base text-on-footer/50 hover:text-on-footer transition-colors group min-h-[44px]">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/25 transition-colors">
                      <Mail className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    </div>
                    {client.email}
                  </a>
                </li>
              )}
              {client.adresse && (
                <li>
                  <address className="not-italic flex items-start gap-3 text-base text-on-footer/50">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    </div>
                    <span className="leading-relaxed">{client.adresse}</span>
                  </address>
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-on-footer/30">© {year} {client.name}. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-5">
            <a href="/impressum"        className="text-sm text-on-footer/30 hover:text-on-footer/70 transition-colors">Impressum</a>
            <a href="/datenschutz"      className="text-sm text-on-footer/30 hover:text-on-footer/70 transition-colors">Datenschutz</a>
            <a href="/barrierefreiheit" className="text-sm text-on-footer/30 hover:text-on-footer/70 transition-colors">Barrierefreiheit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
