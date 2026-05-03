import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { client } from "@/data/client";

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#0d0f1a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <footer className="bg-[#0a0c18] border-t border-white/[0.06]" aria-label="Seitenende">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain"
                  unoptimized
                />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center">
                    <span className="text-[#0d0f1a] font-black text-sm tracking-tight">{initials}</span>
                  </div>
                  <span className="text-white font-bold text-lg tracking-tight">{client.name}</span>
                </>
              )}
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-5">
              Ihr {client.branche}-Betrieb in {client.ort}. Qualität, Transparenz und schneller Service.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label} öffnen`}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/[0.16] transition-all"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Leistungen</h3>
            <ul className="space-y-2" role="list">
              {client.leistungen.slice(0, 8).map((l) => (
                <li key={l.slug}>
                  <a
                    href="#leistungen"
                    className="text-sm text-white/45 hover:text-white transition-colors"
                  >
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Unternehmen</h3>
            <ul className="space-y-2" role="list">
              {[
                { label: "Über uns",         href: "#ueber-uns"  },
                { label: "Karriere",         href: "#karriere"   },
                { label: "Kontakt",          href: "#kontakt"    },
                { label: "Impressum",        href: "/impressum"  },
                { label: "Datenschutz",      href: "/datenschutz"},
                { label: "Barrierefreiheit", href: "/barrierefreiheit" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Kontakt</h3>
            <ul className="space-y-3" role="list">
              {client.telefon && (
                <li>
                  <a
                    href={`tel:${client.telefon}`}
                    className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                    {client.telefon}
                  </a>
                </li>
              )}
              {client.email && (
                <li>
                  <a
                    href={`mailto:${client.email}`}
                    className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                    {client.email}
                  </a>
                </li>
              )}
              {client.adresse && (
                <li>
                  <address className="not-italic flex items-start gap-2.5 text-sm text-white/45">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{client.adresse}</span>
                  </address>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {year} {client.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <a href="/impressum"        className="text-xs text-white/25 hover:text-white/60 transition-colors">Impressum</a>
            <a href="/datenschutz"      className="text-xs text-white/25 hover:text-white/60 transition-colors">Datenschutz</a>
            <a href="/barrierefreiheit" className="text-xs text-white/25 hover:text-white/60 transition-colors">Barrierefreiheit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
