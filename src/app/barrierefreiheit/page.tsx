import type { Metadata } from "next";
import { client } from "@/data/client";
import { LegalShell, LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = { title: `Barrierefreiheit | ${client.name}`, robots: { index: false } };

// HINWEIS: Standard-Barrierefreiheitserklärung als Startpunkt — MUSS vor dem
// Live-Gang geprüft und an den tatsächlichen Konformitätsstand angepasst werden
// (BFSG / EU-Richtlinie 2019/882).
export default function BarrierefreiheitPage() {
  return (
    <LegalShell title="Erklärung zur Barrierefreiheit">
      <LegalSection heading="Unser Anspruch">
        <p>
          Wir sind bemüht, unsere Website im Einklang mit den geltenden Vorgaben zur digitalen
          Barrierefreiheit zugänglich zu machen. Als Orientierung dienen die Web Content
          Accessibility Guidelines (WCAG) 2.1 auf Konformitätsstufe AA.
        </p>
      </LegalSection>

      <LegalSection heading="Stand der Vereinbarkeit">
        <p>
          Diese Website wurde mit Blick auf Barrierefreiheit erstellt (u. a. semantische
          Struktur, Tastaturbedienbarkeit, Alternativtexte, ausreichende Kontraste). Einzelne
          Inhalte können ggf. noch nicht vollständig barrierefrei sein; wir arbeiten
          kontinuierlich an Verbesserungen.
        </p>
      </LegalSection>

      <LegalSection heading="Barrieren melden / Feedback">
        <p className="whitespace-pre-line">
          Sind Ihnen Barrieren aufgefallen oder benötigen Sie Informationen in einer zugänglichen
          Form? Bitte kontaktieren Sie uns:
          {client.email ? `\nE-Mail: ${client.email}` : ""}
          {client.telefon ? `\nTelefon: ${client.telefon}` : ""}
        </p>
      </LegalSection>
    </LegalShell>
  );
}
