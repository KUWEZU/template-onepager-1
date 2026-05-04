/**
 * client.ts — Zentrale Konfiguration für das Kundenprojekt.
 *
 * Alle Texte, Bilder und Einstellungen werden hier gepflegt.
 *
 * Bilder-Strategie:
 *   - Echte Bilder kommen direkt von R2 (https://r2.kuwezu.de/bibliothek/...)
 *   - SVG-Platzhalter (lokales /images/...) für Kategorien ohne Foto in R2
 *   - Sobald ein neues Bild hochgeladen ist: URL hier eintragen und fertig.
 */

const R2 = "https://r2.kuwezu.de";

export const client = {
  // ── Allgemein ──────────────────────────────────────────────────────────────
  name: "KUWEZU",
  slogan: "Professionelle Kfz-Werkstatt die Sie verdienen",
  adresse: "Musterstraße 1, 12345 Musterstadt",
  telefon: "+49 123 456 7890",
  email: "info@ihre-werkstatt.de",
  website: "https://ihre-werkstatt.de",
  logo: null,
  standort_bild: null,

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    /**
     * Vollbild-Hintergrundbild.
     * Noch kein Hero-Foto in R2 → SVG-Platzhalter.
     * Sobald vorhanden: `${R2}/bibliothek/hero/[dateiname].webp`
     */
    bild: "/images/hero.svg",
    overlayOpacity: 0.55,
    ueberschrift: "Professionelle Kfz-Reparatur",
    ueberschriftHighlight: "die Sie verdienen",
    untertext:
      "Von der Inspektion bis zur Unfallreparatur — wir kümmern uns um Ihr Fahrzeug mit modernster Technik und über 20 Jahren Erfahrung.",
    ctaPrimary: { text: "Termin vereinbaren", href: "#kontakt" },
    ctaSecondary: { text: "Leistungen ansehen", href: "#leistungen" },
  },

  // ── Über uns ───────────────────────────────────────────────────────────────
  ueberUns: {
    /**
     * Team-/Werkstattfoto rechts neben dem Text.
     * Noch kein Foto in R2 → SVG-Platzhalter.
     * Sobald vorhanden: `${R2}/bibliothek/team/[dateiname].webp`
     */
    bild: "/images/ueber-uns.svg",
    ueberschrift: "Ihre Werkstatt — Ihr Vertrauen",
    text1:
      "Seit über 20 Jahren sind wir Ihr zuverlässiger Partner rund ums Fahrzeug. Unser Team aus ausgebildeten Kfz-Meistern und Fachkräften arbeitet täglich daran, Ihnen den besten Service zu bieten.",
    text2:
      "Wir setzen auf modernste Diagnosetechnik, hochwertige Markenteile und transparente Kostenvoranschläge — damit Sie immer wissen, was Sie erwartet.",
    tags: ["Meisterbetrieb", "Alle Marken", "Kostenloser Kostenvoranschlag", "Hol- & Bringservice"],
    stats: [
      { value: "20+",    label: "Jahre Erfahrung"      },
      { value: "5.000+", label: "Zufriedene Kunden"    },
      { value: "12",     label: "Fachkräfte"            },
      { value: "15.000+",label: "Reparaturen/Jahr"     },
    ],
  },

  // ── Leistungen ─────────────────────────────────────────────────────────────
  // Bilder direkt von R2. Kein Bild vorhanden → SVG-Platzhalter (lokal).
  leistungen: [
    {
      slug: "lackierung",
      title: "Lackierung",
      bild: `${R2}/bibliothek/Lackierung/1777808096660-leistung_lackierung.png`,
      description:
        "Professionelle Fahrzeuglackierungen in Originallack-Qualität — vom Spot-Repair bis zur Komplett-Lackierung.",
      highlights: ["Originallack-Farbanpassung", "Klarlack-Versiegelung", "Spot-Repair möglich"],
    },
    {
      slug: "karosserie",
      title: "Karosserie",
      bild: `${R2}/bibliothek/Karosserie/1777808101772-leistung_karosserie.jpeg`,
      description:
        "Richtraumarbeiten, Blechreparaturen und Karosseriearbeiten nach Unfall oder Hagelschaden.",
      highlights: ["Richtrahmen-Technologie", "Schweißarbeiten", "Kotflügel & Türen"],
    },
    {
      slug: "reifenwechsel",
      title: "Reifenwechsel",
      bild: `${R2}/bibliothek/Reifenwechsel/1777808539901-auto_reifen_wechsel_15_11zon.webp`,
      description:
        "Sommer-, Winter- und Ganzjahresreifen — inklusive Einlagerung und RDKS-Programmierung.",
      highlights: ["Alle Reifengrößen", "RDKS-Service", "Reifeneinlagerung"],
    },
    {
      slug: "inspektion",
      title: "Inspektion",
      bild: `${R2}/bibliothek/Inspektion/1777808114491-leistung_inspektion.jpg`,
      description:
        "Herstellerkonforme Inspektionen für alle Fabrikate — ohne Garantieverlust.",
      highlights: ["Alle Marken", "Originalteile", "Digitales Serviceheft"],
    },
    {
      slug: "hu-au",
      title: "HU / AU",
      // R2-Key enthält Leerzeichen: "bibliothek/HU/AU/..." → direkt verwendbar als URL
      bild: `${R2}/bibliothek/HU/AU/1777808071378-leistung_tu_v.png`,
      description:
        "Hauptuntersuchung und Abgasuntersuchung direkt bei uns — schnell und ohne lange Wartezeit.",
      highlights: ["TÜV & DEKRA Partner", "Mängelbeseitigung", "Express-Termin"],
    },
    {
      slug: "autoglas",
      title: "Autoglas",
      bild: `${R2}/bibliothek/Autoglas/1777808080567-autoglas_reparatur.png`,
      description:
        "Steinschlagreparatur, Windschutzscheibenwechsel und Kalibrierung von Fahrerassistenzsystemen.",
      highlights: ["Steinschlagreparatur", "ADAS-Kalibrierung", "Versicherungsabrechnung"],
    },
    {
      slug: "smart-repair",
      title: "Smart Repair",
      // Noch kein Bild in R2 → SVG-Platzhalter
      bild: "/images/leistungen/smart-repair.svg",
      description:
        "Kleine Dellen, Kratzer und Lackschäden wirtschaftlich und schnell reparieren.",
      highlights: ["Delle ohne Lackierung", "Lackkratzer-Politur", "Felgenaufbereitung"],
    },
    {
      slug: "klimaservice",
      title: "Klimaservice",
      bild: `${R2}/bibliothek/Klimaservice/1777808061957-leistung_klimaanlage.png`,
      description:
        "Klimaanlagen-Wartung, Desinfektion und Kältemittel-Befüllung nach aktuellen Standards.",
      highlights: ["R134a & R1234yf", "Desinfektion", "Lecksuche"],
    },
    {
      slug: "leasingrueckgabe",
      title: "Leasingrückgabe",
      // Noch kein Bild in R2 → SVG-Platzhalter
      bild: "/images/leistungen/leasingrueckgabe.svg",
      description:
        "Professionelle Aufbereitung und Reparatur vor der Fahrzeugrückgabe — stressfrei und transparent.",
      highlights: ["Zustandsbericht", "Vollaufbereitung", "Rückgabe-Begleitung"],
    },
    {
      slug: "hagelschaden",
      title: "Hagelschaden",
      // Noch kein Bild in R2 → SVG-Platzhalter
      bild: "/images/leistungen/hagelschaden.svg",
      description:
        "Schnelle und spurslose Hagelschadenreparatur durch PDR-Technologie ohne Lackierung.",
      highlights: ["PDR-Technik", "Versicherungsservice", "Leifahrzeug möglich"],
    },
    {
      slug: "unfallreparatur",
      title: "Unfallreparatur",
      bild: `${R2}/bibliothek/Unfallreparatur/1777808421144-leistungen_unfallinstandsetzung.webp`,
      description:
        "Komplette Unfallabwicklung — von der Schadensbegutachtung bis zur Fahrzeugabholung.",
      highlights: ["Direktabrechnung", "Mietwagen-Service", "Wertgutachten"],
    },
  ],

  // ── Karriere ───────────────────────────────────────────────────────────────
  karriere: {
    jobs: [
      { title: "Kfz-Mechatroniker / -in",              type: "Vollzeit",            experience: "Berufserfahrung erwünscht"  },
      { title: "Kfz-Lackierer / -in",                  type: "Vollzeit",            experience: "Berufseinsteiger willkommen" },
      { title: "Karosseriebauer / -in",                 type: "Vollzeit / Teilzeit", experience: "Berufserfahrung erwünscht"  },
      { title: "Auszubildende / -r Kfz-Mechatronik",   type: "Ausbildung",          experience: "Schulabschluss erforderlich" },
    ],
  },

  // ── Kontakt ────────────────────────────────────────────────────────────────
  kontakt: {
    oeffnungszeiten: ["Mo–Fr 8:00–18:00", "Sa 9:00–14:00"],
    // Für echte Karte: Google Maps Embed-URL oder Koordinaten hier eintragen
    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=..."
  },
} as const;

export type LeistungConfig = (typeof client.leistungen)[number];

