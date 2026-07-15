import type { Metadata } from "next";
import { client } from "@/data/client";
import { LegalShell, LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = { title: `Datenschutzerklärung | ${client.name}`, robots: { index: false } };

// HINWEIS: Standard-Datenschutzerklärung als Startpunkt — MUSS vor dem Live-Gang
// juristisch geprüft und an die tatsächliche Datenverarbeitung angepasst werden.
export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung">
      <LegalSection heading="1. Verantwortlicher">
        <p className="whitespace-pre-line">
          {client.name}
          {client.adresse ? `\n${client.adresse}` : ""}
          {client.telefon ? `\nTelefon: ${client.telefon}` : ""}
          {client.email ? `\nE-Mail: ${client.email}` : ""}
        </p>
      </LegalSection>

      <LegalSection heading="2. Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
          Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen
          erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der gesetzlichen Bestimmungen der
          Datenschutz-Grundverordnung (DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="3. Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden durch den Hosting-Provider automatisch Informationen in
          Server-Logfiles erfasst (z. B. Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit des
          Zugriffs, gekürzte IP-Adresse). Diese Daten sind technisch erforderlich, um die Website
          auszuliefern und ihre Stabilität und Sicherheit zu gewährleisten (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="4. Kontaktaufnahme">
        <p>
          Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, werden Ihre Angaben zur
          Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert (Art. 6 Abs. 1
          lit. b bzw. f DSGVO). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
      </LegalSection>

      <LegalSection heading="5. Cookies">
        <p>
          Diese Website verwendet nur technisch notwendige Cookies bzw. holt für nicht notwendige
          Cookies Ihre Einwilligung über den Cookie-Hinweis ein. Sie können Ihre Einwilligung
          jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
      </LegalSection>

      <LegalSection heading="6. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
          (Art. 21 DSGVO). Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichts­behörde
          zu. Wenden Sie sich zur Ausübung Ihrer Rechte an die oben genannten Kontaktdaten.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
