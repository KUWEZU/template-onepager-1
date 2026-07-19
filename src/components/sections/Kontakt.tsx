"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, CalendarCheck } from "lucide-react";
import { client } from "@/data/client";
import { publicEmail } from "@/lib/contact";

type FormState = { name: string; email: string; phone: string; message: string };

// ── Kontaktformular-Konfiguration (zentral, gleich für alle Seiten) ───────────
// Endpoint leer = Formular deaktiviert → ehrlicher Fallback (Tel/E-Mail), NIE
// mehr falsches „gesendet!". TURNSTILE_SITEKEY: Cloudflare Turnstile (cookiefrei).
// PRODUKTIV: echter Turnstile-Sitekey. Widget-Hostname kuwezu.de deckt alle
// *.kuwezu.de (inkl. staging-Subdomains) ab. Secret (TURNSTILE_SECRET_KEY) im Handler.
const CONTACT_ENDPOINT = "https://dashboard.kuwezu.de/api/contact";
const TURNSTILE_SITEKEY = "0x4AAAAAAD5KZ_BVSPnUNhbw";

declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void } }
}

/** "di" → "Di" — Anzeige der wiederkehrenden TÜV-/HU-Slots. */
const TUEV_DAY_LABELS: Record<string, string> = {
  mo: "Mo", di: "Di", mi: "Mi", do: "Do", fr: "Fr", sa: "Sa", so: "So",
};

export function Kontakt() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tsToken, setTsToken] = useState("");
  const tsRef = useRef<HTMLDivElement>(null);
  const tsRendered = useRef(false);

  // Cloudflare Turnstile laden + rendern (cookiefrei → kein Consent-Banner nötig).
  useEffect(() => {
    if (!CONTACT_ENDPOINT || !TURNSTILE_SITEKEY) return;
    const render = () => {
      if (tsRendered.current || !tsRef.current || !window.turnstile) return;
      tsRendered.current = true;
      window.turnstile.render(tsRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        callback: (t: string) => setTsToken(t),
        "expired-callback": () => setTsToken(""),
        "error-callback": () => setTsToken(""),
      });
    };
    if (window.turnstile) { render(); return; }
    const id = "cf-turnstile-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id; s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"; s.async = true; s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      const iv = setInterval(() => { if (window.turnstile) { clearInterval(iv); render(); } }, 200);
      return () => clearInterval(iv);
    }
  }, []);

  // Adresse verlinkt aufs echte Google-Firmenprofil (client.maps_url, aus
  // Place-ID/GMB-Import). Fallback: kein Link. Öffnet im neuen Tab (external).
  const adressHref = (client as unknown as { maps_url?: string | null }).maps_url ?? null;
  // Nie die Plattform-Adresse (info@kuwezu.de) als Werkstatt-Kontakt zeigen.
  const kontaktEmail = publicEmail(client.email);
  const INFOS: { icon: typeof Phone; title: string; lines: readonly string[]; href: string | null; external?: boolean }[] = [
    { icon: Phone, title: "Telefon",        lines: [client.telefon], href: `tel:${client.telefon}` },
    ...(kontaktEmail ? [{ icon: Mail, title: "E-Mail", lines: [kontaktEmail, "Antwort innerhalb 24h"], href: `mailto:${kontaktEmail}` }] : []),
    { icon: MapPin, title: "Adresse",        lines: [client.adresse], href: adressHref, external: true },
    { icon: Clock,  title: "Öffnungszeiten", lines: client.kontakt.oeffnungszeiten, href: null },
  ];

  // TÜV-/HU-Termine: Infoblock nur, wenn das Feature aktiv ist UND Slots
  // hinterlegt sind — sonst (wie bisher) nur der Hero-Badge bzw. gar nichts.
  const tuevAktiv = (client as unknown as { tuev_termine?: boolean }).tuev_termine ?? false;
  const tuevSlots = ((client as unknown as { tuev_slots?: { day: string; from: string; to: string }[] | null }).tuev_slots ?? [])
    .filter((s) => s && TUEV_DAY_LABELS[s.day] && s.from && s.to);
  const tuevHinweis = (client as unknown as { tuev_hinweis?: string | null }).tuev_hinweis ?? null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    // Feature-Flag aus: KEIN falsches „gesendet" — ehrlicher Direktkontakt-Hinweis.
    if (!CONTACT_ENDPOINT) {
      setError(`Bitte kontaktieren Sie uns direkt: ${client.telefon}${kontaktEmail ? ` oder ${kontaktEmail}` : ""}.`);
      return;
    }
    if (TURNSTILE_SITEKEY && !tsToken) {
      setError("Bitte schließen Sie die Sicherheitsprüfung ab.");
      return;
    }
    const honeypot = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('input[name="company"]')?.value ?? "";
    setLoading(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot, turnstileToken: tsToken }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || `Senden fehlgeschlagen. Bitte kontaktieren Sie uns direkt: ${client.telefon}.`);
        window.turnstile?.reset(); setTsToken("");
      }
    } catch {
      setError(`Senden fehlgeschlagen. Bitte kontaktieren Sie uns direkt: ${client.telefon}${kontaktEmail ? ` oder ${kontaktEmail}` : ""}.`);
      window.turnstile?.reset(); setTsToken("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="kontakt"
      className="py-28"
      style={{ backgroundColor: "var(--color-section-alt)" }}
      aria-labelledby="kontakt-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-icon-surface border border-icon-ring mb-6">
            <span className="text-safe-primary text-sm font-semibold uppercase tracking-wider">Kontakt</span>
          </div>
          <h2 id="kontakt-heading" className="text-4xl sm:text-5xl font-black text-brand-heading mb-5">
            So erreichen Sie uns
          </h2>
          <p className="max-w-xl mx-auto text-brand-muted text-lg leading-relaxed">
            Vereinbaren Sie einen Termin, stellen Sie uns eine Frage oder besuchen Sie uns direkt.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Kontaktinfos + Standortbild */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {INFOS.map(({ icon: Icon, title, lines, href, external }) => (
                <div key={title}
                  className="border border-brand-border rounded-2xl p-5"
                  style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                  <div className="w-10 h-10 rounded-xl bg-icon-surface border border-icon-ring flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-safe-primary uppercase tracking-wider mb-2">{title}</p>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a key={i} href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block text-base text-brand-text hover:text-safe-primary transition-colors font-medium">
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-base text-brand-muted leading-relaxed">{line}</p>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* TÜV-/HU-Termine — nur bei aktivem Toggle UND hinterlegten Slots */}
            {tuevAktiv && tuevSlots.length > 0 && (
              <div
                id="tuev-termine"
                className="border border-brand-border rounded-2xl p-5 mb-6 scroll-mt-24"
                style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
                aria-label="TÜV- und HU-Termine"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-icon-surface border border-icon-ring flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-safe-primary uppercase tracking-wider">
                    TÜV-/HU-Termine
                  </p>
                </div>
                <ul className="space-y-1" role="list">
                  {tuevSlots.map((s, i) => (
                    <li key={i} className="text-base text-brand-text font-medium">
                      {TUEV_DAY_LABELS[s.day]} {s.from}–{s.to} Uhr
                    </li>
                  ))}
                </ul>
                {tuevHinweis && (
                  <p className="text-sm text-brand-muted leading-relaxed mt-3">{tuevHinweis}</p>
                )}
              </div>
            )}

            {/* Standortbild oder Adress-Placeholder */}
            {client.standort_bild ? (
              <div className="relative h-56 border border-brand-border rounded-2xl overflow-hidden"
                style={{ boxShadow: "var(--card-shadow)" }}
                aria-label="Unser Standort">
                <Image
                  src={client.standort_bild}
                  alt="Unser Standort"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-56 border border-brand-border rounded-2xl flex flex-col items-center justify-center gap-3"
                style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
                aria-label="Standort">
                <MapPin className="w-8 h-8 text-brand-muted/30" aria-hidden="true" />
                {client.adresse && (
                  <p className="text-base text-brand-muted/50 font-medium text-center px-6 leading-relaxed">
                    {client.adresse}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Formular */}
          <div className="border border-brand-border rounded-2xl p-8"
            style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-brand-heading mb-3">Nachricht gesendet!</h3>
                <p className="text-brand-muted text-lg leading-relaxed max-w-xs">
                  Vielen Dank. Wir melden uns schnellstmöglich bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Kontaktformular">
                <h3 className="text-xl font-bold text-brand-heading mb-6">Nachricht senden</h3>

                {error && (
                  <div role="alert" className="mb-5 px-4 py-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-base text-red-400">
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  {[
                    { id: "name",    label: "Name",    type: "text",  required: true,  autoComplete: "name",  placeholder: "Max Mustermann" },
                    { id: "email",   label: "E-Mail",  type: "email", required: true,  autoComplete: "email", placeholder: "max@beispiel.de" },
                    { id: "phone",   label: "Telefon", type: "tel",   required: false, autoComplete: "tel",   placeholder: "+49 ..." },
                  ].map(({ id, label, type, required, autoComplete, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-base font-semibold text-brand-text mb-2">
                        {label} {required && <span className="text-safe-primary" aria-label="Pflichtfeld">*</span>}
                      </label>
                      <input id={id} name={id} type={type} autoComplete={autoComplete} required={required}
                        value={(form as Record<string, string>)[id]} onChange={handleChange} placeholder={placeholder}
                        className="w-full px-4 py-3.5 border border-brand-border rounded-xl
                                   text-brand-text placeholder:text-brand-muted/60 text-base outline-none
                                   hover:border-icon-ring focus:border-icon-ring
                                   focus-visible:ring-2 focus-visible:ring-icon-ring focus-visible:ring-offset-0
                                   transition-colors min-h-[52px]"
                        style={{ backgroundColor: "var(--color-section-alt)" }} />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-base font-semibold text-brand-text mb-2">
                      Nachricht <span className="text-safe-primary" aria-label="Pflichtfeld">*</span>
                    </label>
                    <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange}
                      placeholder="Wie können wir Ihnen helfen?"
                      className="w-full px-4 py-3.5 border border-brand-border rounded-xl
                                 text-brand-text placeholder:text-brand-muted/60 text-base outline-none
                                 hover:border-icon-ring focus:border-icon-ring
                                 focus-visible:ring-2 focus-visible:ring-icon-ring focus-visible:ring-offset-0
                                 transition-colors resize-none"
                      style={{ backgroundColor: "var(--color-section-alt)" }} />
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input id="dsgvo" name="dsgvo" type="checkbox" required
                      className="mt-1 w-5 h-5 accent-brand-primary cursor-pointer shrink-0" />
                    <label htmlFor="dsgvo" className="text-base text-brand-muted leading-relaxed cursor-pointer">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                      <a href="/datenschutz" className="text-safe-primary hover:underline font-medium">Datenschutzerklärung</a> zu.{" "}
                      <span className="text-safe-primary">*</span>
                    </label>
                  </div>

                  {/* Honeypot — für Menschen unsichtbar; ausgefüllt = Bot (Server verwirft). */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                    <label htmlFor="company">Firma (nicht ausfüllen)</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Cloudflare Turnstile — cookiefrei, kein Consent-Banner. */}
                  {TURNSTILE_SITEKEY && <div ref={tsRef} className="cf-turnstile" />}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-on-primary
                               font-semibold rounded-xl hover:bg-brand-primary-hover transition-all
                               disabled:opacity-50 disabled:cursor-not-allowed text-lg min-h-[56px]
                               shadow-xl shadow-brand-primary/20">
                    {loading
                      ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Wird gesendet…</>
                      : <><Send className="w-5 h-5" aria-hidden="true" />Nachricht senden</>
                    }
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
