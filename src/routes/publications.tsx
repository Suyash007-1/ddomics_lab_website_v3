import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import bgPublications from "@/assets/bg-publications.jpg";
import { publications, publicationTopics, featuredPublications } from "@/lib/lab-data";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — DDOmics Lab, NCCS Pune" },
      {
        name: "description",
        content:
          "Featured studies and the full list of peer-reviewed publications from the DDOmics Lab on gut, oral and skin microbiomes, gluten disorders and Indian population cohorts.",
      },
      { property: "og:title", content: "Publications — DDOmics Lab, NCCS Pune" },
      {
        property: "og:description",
        content: "Featured studies and complete publication list from the DDOmics Lab at NCCS Pune.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [],
  );
  const [year, setYear] = useState<"all" | number>("all");

  const filtered = useMemo(
    () => (year === "all" ? publications : publications.filter((p) => p.year === year)),
    [year],
  );

  return (
    <>
      <PageHero
        image={bgPublications}
        height="short"
        eyebrow="Publications"
        title={
          <>
            Papers from <span className="silver-text">the lab</span>
          </>
        }
        lede="Featured studies below, followed by the complete list grouped by research theme. Each entry links out to the publisher via DOI."
      />

      {/* ---------- Featured studies ---------- */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
          <Reveal>
            <h2 className="display-title text-3xl lg:text-4xl">Featured Publications</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              For a complete list,{" "}
              <a
                href="https://scholar.google.com/citations?user=Dhiraj+Dhotre"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                find us on Google Scholar
              </a>
              .
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPublications.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="group flex h-full flex-col">
                  <div className="art-tile relative aspect-[4/3] overflow-hidden border border-border">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 font-display text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.authors} · <em>{p.venue}</em> ({p.year})
                  </p>
                  {p.doi && (
                    <a
                      href={`https://doi.org/${p.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="eyebrow sheen mt-4 inline-block self-start border border-border px-4 py-2 text-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                    >
                      Read it →
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Full list ---------- */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-10">
            <h2 className="display-title text-3xl lg:text-4xl">All Publications</h2>
            <label className="flex items-center gap-3 text-sm">
              <span className="eyebrow text-muted-foreground">Year</span>
              <select
                value={String(year)}
                onChange={(e) =>
                  setYear(e.target.value === "all" ? "all" : Number(e.target.value))
                }
                className="border border-border bg-background px-4 py-2 text-sm transition-colors hover:border-primary focus:border-primary focus:outline-none"
              >
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
          </Reveal>

          {publicationTopics.map((topic) => {
            const items = filtered.filter((p) => p.topic === topic);
            if (items.length === 0) return null;
            return (
              <section key={topic} className="mb-16">
                <Reveal>
                  <h3 className="display-title text-2xl text-primary">{topic}</h3>
                </Reveal>
                <ul className="mt-6 divide-y divide-border border-t border-border">
                  {items.map((p, i) => (
                    <Reveal as="li" key={p.title} delay={i * 50} className="py-6">
                      <p className="leading-relaxed">
                        <span className="text-muted-foreground">{p.authors}</span> ({p.year}).{" "}
                        <span className="font-medium">{p.title}</span>{" "}
                        <em className="text-muted-foreground">{p.venue}</em>.
                      </p>
                      {p.doi && (
                        <a
                          href={`https://doi.org/${p.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block font-mono text-xs text-primary underline-offset-4 hover:underline"
                        >
                          https://doi.org/{p.doi}
                        </a>
                      )}
                    </Reveal>
                  ))}
                </ul>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-muted-foreground">No publications listed for {String(year)}.</p>
          )}
        </div>
      </section>
    </>
  );
}
