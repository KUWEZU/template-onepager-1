"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { client } from "@/data/client";

const NAV_LINKS = [
  { label: "Über uns",    href: "#ueber-uns"  },
  { label: "Leistungen",  href: "#leistungen" },
  { label: "Karriere",    href: "#karriere"   },
  { label: "Kontakt",     href: "#kontakt"    },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0f1a]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group"
          aria-label="Zur Startseite"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
        >
          {client.logo ? (
            <Image
              src={client.logo}
              alt={client.name}
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              unoptimized
            />
          ) : (
            <>
              <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center">
                <span className="text-[#0d0f1a] font-black text-sm tracking-tight">{initials}</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight group-hover:text-brand-primary transition-colors">
                {client.name}
              </span>
            </>
          )}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {client.telefon && (
            <a
              href={`tel:${client.telefon}`}
              className="flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
              aria-label="Jetzt anrufen"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {client.telefon}
            </a>
          )}
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); handleNavClick("#kontakt"); }}
            className="px-4 py-2 text-sm font-semibold bg-brand-primary text-[#0d0f1a] hover:bg-brand-primary-hover rounded-xl transition-all"
          >
            Termin buchen
          </a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#0d0f1a]/98 border-t border-white/[0.08] px-4 pb-4"
        >
          <ul className="space-y-1 pt-2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            {client.telefon && (
              <a
                href={`tel:${client.telefon}`}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-brand-primary"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {client.telefon}
              </a>
            )}
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); handleNavClick("#kontakt"); }}
              className="w-full text-center px-4 py-3 text-sm font-semibold bg-brand-primary text-[#0d0f1a] rounded-xl"
            >
              Termin buchen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
