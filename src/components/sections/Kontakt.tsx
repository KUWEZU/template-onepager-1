"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { client } from "@/data/client";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const SERVICES = [
  "Bitte wählen ...",
  "Lackierung",
  "Karosserie",
  "Reifenwechsel",
  "Inspektion",
  "HU / AU",
  "Autoglas",
  "Smart Repair",
  "Klimaservice",
  "Leasingrückgabe",
  "Hagelschaden",
  "Unfallreparatur",
  "Sonstiges",
];

export function Kontakt() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const INFOS = [
    {
      icon: Phone,
      title: "Telefon",
      lines: [client.telefon, "Mo–Fr 8:00–18:00 Uhr"],
      href: `tel:${client.telefon}`,
    },
    {
      icon: Mail,
      title: "E-Mail",
      lines: [client.email, "Antwort innerhalb 24h"],
      href: `mailto:${client.email}`,
    },
    {
      icon: MapPin,
      title: "Adresse",
      lines: [client.adresse],
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      lines: client.kontakt.oeffnungszeiten,
      href: null,
    },
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    setLoading(true);
    // Simulated submit — replace with your API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="kontakt"
      className="py-24 bg-[#13162b]"
      aria-labelledby="kontakt-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Kontakt</span>
          </div>
          <h2
            id="kontakt-heading"
            className="text-3xl sm:text-4xl font-black text-white mb-4"
          >
            So erreichen Sie uns
          </h2>
          <p className="max-w-xl mx-auto text-white/55 text-lg">
            Vereinbaren Sie einen Termin, stellen Sie uns eine Frage oder besuchen
            Sie uns direkt in der Werkstatt.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {INFOS.map(({ icon: Icon, title, lines, href }) => (
                <div
                  key={title}
                  className="bg-[#0d0f1a] border border-white/[0.08] rounded-xl p-5"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold text-brand-primary uppercase tracking-wider mb-1">{title}</p>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a
                        key={i}
                        href={href}
                        className="block text-sm text-white hover:text-brand-primary transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-sm text-white/50">{line}</p>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="h-52 bg-[#0d0f1a] border border-white/[0.08] rounded-xl flex items-center justify-center"
              aria-label="Kartenansicht Werkstatt-Standort (Platzhalter)"
              role="img"
            >
              <div className="text-center text-white/25">
                <MapPin className="w-8 h-8 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm">Google Maps Integration</p>
                <p className="text-xs mt-0.5">Koordinaten hier eintragen</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-[#0d0f1a] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nachricht gesendet!</h3>
                <p className="text-white/55 max-w-xs">
                  Vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Kontaktformular">
                <h3 className="text-lg font-bold text-white mb-6">Nachricht senden</h3>

                {error && (
                  <div role="alert" className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                      Name <span className="text-brand-primary" aria-label="Pflichtfeld">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Max Mustermann"
                      className="w-full px-4 py-3 bg-[#13162b] border border-white/[0.12] hover:border-white/[0.20] focus:border-brand-primary/50 rounded-xl text-white placeholder:text-white/30 text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                        E-Mail <span className="text-brand-primary" aria-label="Pflichtfeld">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="max@beispiel.de"
                        className="w-full px-4 py-3 bg-[#13162b] border border-white/[0.12] hover:border-white/[0.20] focus:border-brand-primary/50 rounded-xl text-white placeholder:text-white/30 text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-1.5">
                        Telefon
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+49 ..."
                        className="w-full px-4 py-3 bg-[#13162b] border border-white/[0.12] hover:border-white/[0.20] focus:border-brand-primary/50 rounded-xl text-white placeholder:text-white/30 text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-white mb-1.5">
                      Leistung
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#13162b] border border-white/[0.12] hover:border-white/[0.20] focus:border-brand-primary/50 rounded-xl text-white text-sm outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s === "Bitte wählen ..." ? "" : s} className="bg-[#13162b]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
                      Nachricht <span className="text-brand-primary" aria-label="Pflichtfeld">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Wie können wir Ihnen helfen?"
                      className="w-full px-4 py-3 bg-[#13162b] border border-white/[0.12] hover:border-white/[0.20] focus:border-brand-primary/50 rounded-xl text-white placeholder:text-white/30 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* DSGVO */}
                  <div className="flex items-start gap-3">
                    <input
                      id="dsgvo"
                      name="dsgvo"
                      type="checkbox"
                      required
                      className="mt-0.5 w-4 h-4 accent-brand-primary cursor-pointer shrink-0"
                    />
                    <label htmlFor="dsgvo" className="text-xs text-white/50 leading-relaxed cursor-pointer">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                      <a href="/datenschutz" className="text-brand-primary hover:underline">
                        Datenschutzerklärung
                      </a>{" "}
                      zu. <span className="text-brand-primary" aria-label="Pflichtfeld">*</span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-primary text-[#0d0f1a] font-semibold rounded-xl hover:bg-[#b8963e] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#0d0f1a]/30 border-t-[#0d0f1a] rounded-full animate-spin" aria-hidden="true" />
                        Sende...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Nachricht senden
                      </>
                    )}
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
