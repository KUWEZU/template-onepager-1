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
export function generateStaticParams() {
  return getAllNewsItems().map((item) => ({ slug: item.slug }));
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
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-page-bg)" }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-32 pb-24">
          <Link
            href="/aktuelles"
            className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-text transition-colors mb-8"
          >
            ← Zurück zu Aktuelles
          </Link>

          <time dateTime={item.datum} className="block text-sm text-brand-muted mb-2">
            {formattedDate}
          </time>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-heading mb-4">
            {item.titel}
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed mb-8 border-b border-brand-border pb-8">
            {item.intro}
          </p>
          <div className="text-brand-text leading-relaxed whitespace-pre-wrap">
            {item.text}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
