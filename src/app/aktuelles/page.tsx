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
      <main id="main-content" tabIndex={-1}>

        <section
          className="py-28 pt-48"
          style={{ backgroundColor: "var(--color-page-bg)" }}
          aria-labelledby="aktuelles-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Section badge + heading */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-6">
                <span className="text-safe-secondary text-sm font-semibold uppercase tracking-wider">Aktuelles</span>
              </div>
              <h1
                id="aktuelles-heading"
                className="text-4xl sm:text-5xl font-black text-brand-heading mb-5"
              >
                Neuigkeiten & Tipps
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">
                Aktuelles rund um {client.branche} in {client.ort} — Tipps, Termine und Neuigkeiten aus unserem Betrieb.
              </p>
            </div>

            {/* Articles */}
            {empty ? (
              <div
                className="border border-brand-border rounded-2xl p-10 text-center"
                style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
              >
                <p className="text-brand-muted text-lg">Aktuell sind keine Beiträge vorhanden.</p>
              </div>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {items.map((item) => (
                  <li key={item.slug}>
                    <article
                      className="h-full flex flex-col border border-brand-border rounded-2xl overflow-hidden
                                 hover:border-brand-primary/40 transition-all group"
                      style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
                    >
                      <div className="flex flex-col flex-1 p-6">
                        <time
                          dateTime={item.datum}
                          className="text-xs font-semibold text-safe-secondary uppercase tracking-wider mb-3"
                        >
                          {new Date(item.datum).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <h2 className="text-xl font-bold text-brand-heading mb-3 leading-snug group-hover:text-safe-primary transition-colors">
                          {item.titel}
                        </h2>
                        <p className="text-brand-muted leading-relaxed flex-1 mb-6">
                          {item.intro}
                        </p>
                        <Link
                          href={`/aktuelles/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-safe-primary
                                     hover:gap-2.5 transition-all mt-auto"
                          aria-label={`${item.titel} weiterlesen`}
                        >
                          Weiterlesen
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
