"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { client } from "@/data/client";

const NAV_ANCHORS = [
  { label: "Home",       anchor: ""           },
  { label: "Über uns",   anchor: "ueber-uns"  },
  { label: "Leistungen", anchor: "leistungen" },
  { label: "Karriere",   anchor: "karriere"   },
  { label: "Kontakt",    anchor: "kontakt"    },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page smooth-scroll; on any other page navigate to /#anchor.
  function navHref(anchor: string) {
    return pathname === "/" ? `#${anchor}` : `/#${anchor}`;
  }

  function handleNavClick(e: React.MouseEvent, anchor: string) {
    if (pathname !== "/") return;
    e.preventDefault();
    setOpen(false);
    if (anchor === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300${scrolled ? " border-b nav-scrolled" : ""}`}
      style={scrolled ? {
        backgroundColor: "var(--color-footer-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottomColor: "var(--nav-scrolled-border)",
        boxShadow: "var(--nav-shadow)",
      } : {
        background: "var(--nav-hero-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between" aria-label="Hauptnavigation">

        {/* Logo / Wordmark */}
        <a href={navHref("hero")} className="flex items-center gap-3 group" aria-label="Zur Startseite"
          onClick={(e) => handleNavClick(e, "hero")}>
          {client.logo ? (
            <Image src={client.logo} alt={client.name} width={180} height={64} className="h-12 sm:h-16 w-auto object-contain" unoptimized />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                <span className="text-on-primary font-black text-sm tracking-tight">{initials}</span>
              </div>
              <span
                className="font-bold text-lg tracking-tight transition-colors group-hover:opacity-80"
                style={{ color: scrolled ? "var(--text-on-footer)" : "var(--nav-hero-text)" }}>
                {client.name}
              </span>
            </>
          )}
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ANCHORS.map(({ label, anchor }) => (
            <li key={anchor}>
              <a href={navHref(anchor)} onClick={(e) => handleNavClick(e, anchor)}
                className="nav-link px-4 py-2.5 text-base font-medium rounded-lg transition-all min-h-[44px] inline-flex items-center">
                {label}
              </a>
            </li>
          ))}
          {client.newsEnabled && (
            <li>
              <Link href="/aktuelles"
                className="nav-link px-4 py-2.5 text-base font-medium rounded-lg transition-all min-h-[44px] inline-flex items-center">
                Aktuelles
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {client.telefon && (
            <a href={`tel:${client.telefon}`}
              className="flex items-center gap-2 text-base font-medium transition-colors min-h-[44px]"
              style={{ color: scrolled ? "var(--color-safe-primary)" : "var(--nav-hero-text)" }}
              aria-label="Jetzt anrufen">
              <Phone className="w-4 h-4" aria-hidden="true" />
              {client.telefon}
            </a>
          )}
          <a href={navHref("kontakt")} onClick={(e) => handleNavClick(e, "kontakt")}
            className="px-5 py-2.5 text-base font-semibold bg-brand-primary text-on-primary hover:bg-brand-primary-hover
                       rounded-xl transition-all min-h-[44px] inline-flex items-center shadow-lg shadow-brand-primary/20">
            Termin buchen
          </a>
        </div>

        {/* Mobile burger */}
        <button type="button" onClick={() => setOpen(v => !v)}
          className="md:hidden p-3 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ color: scrolled ? "var(--text-on-footer)" : "var(--nav-hero-text)" }}
          aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" role="navigation" aria-label="Mobilmenü"
          className="md:hidden border-t px-4 pb-5 bg-[var(--color-footer-bg)] border-[var(--nav-scrolled-border)]">
          <ul className="space-y-1 pt-3" role="list">
            {NAV_ANCHORS.map(({ label, anchor }) => (
              <li key={anchor}>
                <a href={navHref(anchor)} onClick={(e) => handleNavClick(e, anchor)}
                  className="flex items-center px-4 py-3 text-base font-medium text-on-footer/70 hover:text-on-footer
                             hover:bg-[var(--nav-scrolled-hover-bg)] rounded-lg transition-all min-h-[44px]">
                  {label}
                </a>
              </li>
            ))}
            {client.newsEnabled && (
              <li>
                <Link href="/aktuelles" onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 text-base font-medium text-on-footer/70 hover:text-on-footer
                             hover:bg-[var(--nav-scrolled-hover-bg)] rounded-lg transition-all min-h-[44px]">
                  Aktuelles
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-4 pt-4 border-t border-[var(--nav-scrolled-border)] flex flex-col gap-3">
            {client.telefon && (
              <a href={`tel:${client.telefon}`}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-safe-primary min-h-[44px]">
                <Phone className="w-4 h-4" aria-hidden="true" />{client.telefon}
              </a>
            )}
            <a href={navHref("kontakt")} onClick={(e) => handleNavClick(e, "kontakt")}
              className="w-full text-center px-4 py-3.5 text-base font-semibold bg-brand-primary text-on-primary rounded-xl min-h-[44px] flex items-center justify-center">
              Termin buchen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
