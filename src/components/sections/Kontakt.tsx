"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { client } from "@/data/client";

type FormState = { name: string; email: string; phone: string; message: string };

export function Kontakt() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const INFOS = [
    { icon: Phone, title: "Telefon",        lines: [client.telefon, "Mo–Fr 8:00–18:00 Uhr"], href: `tel:${client.telefon}` },
    { icon: Mail,  title: "E-Mail",          lines: [client.email, "Antwort innerhalb 24h"],   href: `mailto:${client.email}` },
    { icon: MapPin, title: "Adresse",        lines: [client.adresse], href: "https://maps.google.com" },
    { icon: Clock,  title: "Öffnungszeiten", lines: client.kontakt.oeffnungszeiten, href: null },
  ];

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
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-6">
            <span className="text-safe-secondary text-sm font-semibold uppercase tracking-wider">Kontakt</span>
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
              {INFOS.map(({ icon: Icon, title, lines, href }) => (
                <div key={title}
                  className="border border-brand-border rounded-2xl p-5"
                  style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-safe-primary uppercase tracking-wider mb-2">{title}</p>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a key={i} href={href} className="block text-base text-brand-text hover:text-safe-primary transition-colors font-medium">
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-base text-brand-muted leading-relaxed">{line}</p>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Standortbild oder Adress-Placeholder */}
            {client.standort_bild ? (
              <div className="relative h-56 border border-brand-border rounded-2xl overflow-hidden"
                style={{ boxShadow: "var(--card-shadow)" }}
                aria-label="Unser Standort">
                <Image
                  src={client.standort_bild}
                  alt="Unser Standort"
                  fill
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
                                   text-brand-text placeholder:text-brand-muted text-base outline-none
                                   hover:border-brand-primary/30 focus:border-brand-primary/60 transition-colors min-h-[52px]"
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
                                 text-brand-text placeholder:text-brand-muted text-base outline-none
                                 hover:border-brand-primary/30 focus:border-brand-primary/60 transition-colors resize-none"
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
