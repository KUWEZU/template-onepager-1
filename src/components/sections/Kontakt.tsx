"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { client } from "@/data/client";

type FormState = { name: string; email: string; phone: string; service: string; message: string };

export function Kontakt() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const INFOS = [
    { icon: Phone, title: "Telefon",       lines: [client.telefon, "Mo–Fr 8:00–18:00 Uhr"], href: `tel:${client.telefon}` },
    { icon: Mail,  title: "E-Mail",         lines: [client.email, "Antwort innerhalb 24h"],  href: `mailto:${client.email}` },
    { icon: MapPin, title: "Adresse",       lines: [client.adresse], href: "https://maps.google.com" },
    { icon: Clock,  title: "Öffnungszeiten", lines: client.kontakt.oeffnungszeiten, href: null },
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) { setError("Bitte füllen Sie alle Pflichtfelder aus."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="py-24 bg-brand-secondary" aria-labelledby="kontakt-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Kontakt</span>
          </div>
          <h2 id="kontakt-heading" className="text-3xl sm:text-4xl font-black text-brand-text mb-4">So erreichen Sie uns</h2>
          <p className="max-w-xl mx-auto text-brand-muted text-lg">Vereinbaren Sie einen Termin, stellen Sie uns eine Frage oder besuchen Sie uns direkt.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {INFOS.map(({ icon: Icon, title, lines, href }) => (
                <div key={title} className="bg-brand-bg border border-brand-border rounded-xl p-5 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold text-brand-primary uppercase tracking-wider mb-1">{title}</p>
                  {lines.map((line, i) =>
                    href && i === 0
                      ? <a key={i} href={href} className="block text-sm text-brand-text hover:text-brand-primary transition-colors">{line}</a>
                      : <p key={i} className="text-sm text-brand-muted">{line}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="h-52 bg-brand-bg border border-brand-border rounded-xl flex items-center justify-center shadow-sm" aria-label="Kartenansicht" role="img">
              <div className="text-center text-brand-text/25">
                <MapPin className="w-8 h-8 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm">Google Maps Integration</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-bg border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-2">Nachricht gesendet!</h3>
                <p className="text-brand-muted max-w-xs">Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Kontaktformular">
                <h3 className="text-lg font-bold text-brand-text mb-6">Nachricht senden</h3>
                {error && <div role="alert" className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-sm text-red-400">{error}</div>}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-1.5">Name <span className="text-brand-primary">*</span></label>
                    <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} placeholder="Max Mustermann"
                      className="w-full px-4 py-3 bg-brand-surface border border-brand-border hover:border-brand-primary/40 focus:border-brand-primary/60 rounded-xl text-brand-text placeholder:text-brand-muted text-sm outline-none transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-1.5">E-Mail <span className="text-brand-primary">*</span></label>
                      <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder="max@beispiel.de"
                        className="w-full px-4 py-3 bg-brand-surface border border-brand-border hover:border-brand-primary/40 focus:border-brand-primary/60 rounded-xl text-brand-text placeholder:text-brand-muted text-sm outline-none transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brand-text mb-1.5">Telefon</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+49 ..."
                        className="w-full px-4 py-3 bg-brand-surface border border-brand-border hover:border-brand-primary/40 focus:border-brand-primary/60 rounded-xl text-brand-text placeholder:text-brand-muted text-sm outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-1.5">Nachricht <span className="text-brand-primary">*</span></label>
                    <textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} placeholder="Wie können wir Ihnen helfen?"
                      className="w-full px-4 py-3 bg-brand-surface border border-brand-border hover:border-brand-primary/40 focus:border-brand-primary/60 rounded-xl text-brand-text placeholder:text-brand-muted text-sm outline-none transition-colors resize-none" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input id="dsgvo" name="dsgvo" type="checkbox" required className="mt-0.5 w-4 h-4 accent-brand-primary cursor-pointer shrink-0" />
                    <label htmlFor="dsgvo" className="text-xs text-brand-muted leading-relaxed cursor-pointer">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                      <a href="/datenschutz" className="text-brand-primary hover:underline">Datenschutzerklärung</a> zu.{" "}
                      <span className="text-brand-primary">*</span>
                    </label>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary-hover transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sende...</>
                      : <><Send className="w-4 h-4" aria-hidden="true" />Nachricht senden</>
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
