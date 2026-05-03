import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { CookieBanner } from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KUWEZU | Professionelle Kfz-Werkstatt",
  description:
    "Ihre Kfz-Werkstatt für Lackierung, Karosserie, Inspektion, HU/AU, Reifenservice und mehr. Qualität und Transparenz seit über 20 Jahren.",
  keywords: ["Kfz-Werkstatt", "Lackierung", "Karosserie", "Inspektion", "HU AU", "Reifenwechsel"],
  openGraph: {
    title: "KUWEZU | Professionelle Kfz-Werkstatt",
    description: "Ihre zuverlässige Kfz-Werkstatt — von der Inspektion bis zur Unfallreparatur.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[#0d0f1a] text-white antialiased">
        {/* Skip to content — WCAG 2.1 SC 2.4.1 */}
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>

        {children}

        {/* Accessibility widget — fixed bottom-left */}
        <AccessibilityWidget />

        {/* Cookie consent banner */}
        <CookieBanner />
      </body>
    </html>
  );
}
