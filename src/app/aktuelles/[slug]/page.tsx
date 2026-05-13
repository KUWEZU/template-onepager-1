import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type NewsItem = {
  slug: string;
  titel: string;
  intro: string;
  text: string;
  datum: string;
};

function getAllNewsItems(): NewsItem[] {
  const newsDir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(newsDir)) return [];
  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(newsDir, f), "utf-8")) as NewsItem);
}

// Required for `output: 'export'` — pre-render all known slugs at build time.
// Must be async: Next.js 16 / Turbopack does not detect synchronous fs-based
// generateStaticParams correctly with output: 'export'.
export async function generateStaticParams() {
  try {
    const newsDir = path.join(process.cwd(), "content/news");
    const files = await fs.promises.readdir(newsDir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({ slug: f.replace(".json", "") }));
  } catch {
    return [];
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getAllNewsItems().find((i) => i.slug === slug);
  if (!item) notFound();

  const formattedDate = new Date(item.datum).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

        <section
          className="py-28 pt-48"
          style={{ backgroundColor: "var(--color-page-bg)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Back link as section badge */}
            <div className="mb-10">
              <Link
                href="/aktuelles"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-brand-secondary/10 border border-brand-secondary/30
                           text-safe-secondary text-sm font-semibold uppercase tracking-wider
                           hover:bg-brand-secondary/20 transition-colors"
              >
                ← Aktuelles
              </Link>
            </div>

            <div className="max-w-3xl">
              {/* Date */}
              <time dateTime={item.datum} className="block text-sm font-semibold text-safe-secondary uppercase tracking-wider mb-4">
                {formattedDate}
              </time>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-black text-brand-heading leading-tight mb-6">
                {item.titel}
              </h1>

              {/* Intro */}
              <p className="text-xl text-brand-text/70 leading-relaxed mb-10 pb-10 border-b border-brand-border">
                {item.intro}
              </p>

              {/* Body */}
              <div
                className="text-lg text-brand-text/80 leading-relaxed whitespace-pre-wrap"
                style={{ lineHeight: "1.9" }}
              >
                {item.text}
              </div>

              {/* Footer nav */}
              <div className="mt-16 pt-10 border-t border-brand-border">
                <Link
                  href="/aktuelles"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                             border border-brand-border text-brand-muted hover:text-brand-text
                             hover:border-brand-primary/40 transition-all text-sm font-medium"
                >
                  ← Zurück zu Aktuelles
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
