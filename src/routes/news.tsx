import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { newsItems, type NewsItem } from "@/lib/lab-data";
import heroBg from "@/assets/art-network.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Latest News & Media — DDOmics Lab" },
      {
        name: "description",
        content:
          "Publication alerts, media coverage, talks and lab life from the DDOmics Lab microbiome group at NCCS Pune.",
      },
      { property: "og:title", content: "Latest News & Media — DDOmics Lab" },
      {
        property: "og:description",
        content: "Publication alerts, talks and lab life from the DDOmics Lab at NCCS Pune.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

const categories = ["All", "Publication", "Media", "Talks"] as const;

function NewsPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const items = useMemo(
    () => (filter === "All" ? newsItems : newsItems.filter((n) => n.category === filter)),
    [filter],
  );

  const [featured, ...rest] = items;

  return (
    <>
      <PageHero
        image={heroBg}
        eyebrow="Newsroom"
        title={
          <>
            <em>Latest</em> News <em>&amp;</em> Media
          </>
        }
        lede="Publication alerts, talks, press and everyday life inside the lab."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          {/* Filters */}
          <Reveal className="mb-14 flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`eyebrow sheen border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all duration-300 ${
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "story" : "stories"}
            </span>
          </Reveal>

          {featured && (
            <Reveal className="group mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="art-tile aspect-[16/10] w-full overflow-hidden border border-border bg-ink">
                  <img
                    src={featured.image}
                    alt=""
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center lg:col-span-5">
                <NewsMeta item={featured} />
                <h2 className="display-title mt-4 text-3xl leading-tight lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <ReadMore />
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((n, i) => (
              <Reveal
                as="article"
                key={n.title}
                delay={i * 70}
                className="group flex flex-col"
              >
                <div className="art-tile aspect-[4/3] w-full overflow-hidden border border-border bg-ink">
                  <img src={n.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-6 flex flex-1 flex-col">
                  <NewsMeta item={n} />
                  <h3 className="display-title mt-3 text-xl leading-snug transition-colors group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {n.excerpt}
                  </p>
                  <ReadMore />
                </div>
              </Reveal>
            ))}
          </div>

          {items.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">Nothing filed under this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

function NewsMeta({ item }: { item: NewsItem }) {
  return (
    <p className="flex flex-wrap items-center gap-3 text-xs tracking-[0.14em] uppercase">
      <span className="border border-primary px-2 py-1 text-primary">{item.category}</span>
      <span className="text-muted-foreground">{item.author}</span>
      <time dateTime={item.iso} className="text-muted-foreground">
        {item.date}
      </time>
    </p>
  );
}

function ReadMore() {
  return (
    <span className="eyebrow mt-6 inline-flex items-center gap-2 text-sm tracking-[0.14em] text-primary uppercase">
      Read More
      <span
        aria-hidden="true"
        className="inline-block h-px w-6 bg-primary transition-all duration-500 group-hover:w-12"
      />
    </span>
  );
}
