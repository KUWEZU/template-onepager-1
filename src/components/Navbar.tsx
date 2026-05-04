"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { client } from "@/data/client";

const NAV_LINKS = [
  { label: "Über uns",   href: "#ueber-uns"  },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Karriere",   href: "#karriere"   },
  { label: "Kontakt",    href: "#kontakt"    },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300${scrolled ? " border-b" : ""}`}
      style={scrolled ? {
        backgroundColor: "var(--color-brand-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottomColor: "var(--color-brand-border)",
        boxShadow: "var(--nav-shadow)",
      } : {
        // Not scrolled: semi-transparent dark overlay so all text stays legible on any hero image
        background: "rgba(0,0,0,0.50)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between" aria-label="Hauptnavigation">

        {/* Logo / Wordmark */}
        <a href="#hero" className="flex items-center gap-3 group" aria-label="Zur Startseite"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}>
          {client.logo ? (
            <Image src={client.logo} alt={client.name} width={140} height={40} className="h-10 w-auto object-contain" unoptimized />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                <span className="text-white font-black text-sm tracking-tight">{initials}</span>
              </div>
              <span className={`font-bold text-lg tracking-tight transition-colors
                ${scrolled ? "text-brand-text group-hover:text-brand-primary" : "text-white group-hover:text-white/80"}`}>
                {client.name}
              </span>
            </>
          )}
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className={`px-4 py-2.5 text-base font-medium rounded-lg transition-all min-h-[44px] inline-flex items-center
                  ${scrolled
                    ? "text-brand-text/70 hover:text-brand-text hover:bg-brand-text/[0.06]"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {client.telefon && (
            <a href={`tel:${client.telefon}`}
              className={`flex items-center gap-2 text-base font-medium transition-colors min-h-[44px]
                ${scrolled ? "text-brand-primary hover:text-brand-primary-hover" : "text-white/90 hover:text-white"}`}
              aria-label="Jetzt anrufen">
              <Phone className="w-4 h-4" aria-hidden="true" />
              {client.telefon}
            </a>
          )}
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); handleNavClick("#kontakt"); }}
            className="px-5 py-2.5 text-base font-semibold bg-brand-primary text-white hover:bg-brand-primary-hover
                       rounded-xl transition-all min-h-[44px] inline-flex items-center shadow-lg shadow-brand-primary/20">
            Termin buchen
          </a>
        </div>

        {/* Mobile burger */}
        <button type="button" onClick={() => setOpen(v => !v)}
          className={`md:hidden p-3 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center
            ${scrolled ? "text-brand-text/70 hover:text-brand-text" : "text-white/80 hover:text-white"}`}
          aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" role="navigation" aria-label="Mobilmenü"
          className="md:hidden border-t px-4 pb-5"
          style={{ backgroundColor: "var(--color-brand-bg)", borderTopColor: "var(--color-brand-border)" }}>
          <ul className="space-y-1 pt-3" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="flex items-center px-4 py-3 text-base font-medium text-brand-text/70 hover:text-brand-text
                             hover:bg-brand-text/[0.06] rounded-lg transition-all min-h-[44px]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t flex flex-col gap-3" style={{ borderTopColor: "var(--color-brand-border)" }}>
            {client.telefon && (
              <a href={`tel:${client.telefon}`}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-brand-primary min-h-[44px]">
                <Phone className="w-4 h-4" aria-hidden="true" />{client.telefon}
              </a>
            )}
            <a href="#kontakt" onClick={(e) => { e.preventDefault(); handleNavClick("#kontakt"); }}
              className="w-full text-center px-4 py-3.5 text-base font-semibold bg-brand-primary text-white rounded-xl min-h-[44px] flex items-center justify-center">
              Termin buchen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
