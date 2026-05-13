import fs from "fs";
import path from "path";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { client } from "@/data/client";

type NewsItem = {
  slug: string;
  titel: string;
  intro: string;
  text: string;
  datum: string;
};

function getNewsItems(): NewsItem[] {
  const newsDir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(newsDir)) return [];
  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(newsDir, f), "utf-8")) as NewsItem)
    .sort((a, b) => b.datum.localeCompare(a.datum)); // newest first
}

export default function AktuellesPage() {
  const items = getNewsItems();
  const empty = !client.newsEnabled || items.length === 0;

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-page-bg)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-heading mb-2">
            Aktuelles
          </h1>
          <p className="text-brand-muted mb-12">
            Neuigkeiten und Tipps rund um {client.branche} in {client.ort}.
          </p>

          {empty ? (
            <p className="text-brand-muted">Aktuell sind keine Einträge vorhanden.</p>
          ) : (
            <div className="space-y-10">
              {items.map((item) => (
                <article
                  key={item.slug}
                  className="border-b border-brand-border pb-10"
                >
                  <time
                    dateTime={item.datum}
                    className="text-sm text-brand-muted"
                  >
                    {new Date(item.datum).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-xl font-semibold text-brand-heading mt-1.5 mb-2">
                    {item.titel}
                  </h2>
                  <p className="text-brand-muted leading-relaxed mb-4">
                    {item.intro}
                  </p>
                  <Link
                    href={`/aktuelles/${item.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
                  >
                    Weiterlesen →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
