import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { CountUp } from "@/components/CountUp";
import heroBg from "@/assets/microbiome-heads.png";
import artPetri from "@/assets/art-petri.jpg";
import artHand from "@/assets/art-hand.png";
import artMicrobes from "@/assets/art-microbes.png";
import artChromatogram from "@/assets/art-chromatogram.jpg";
import artData from "@/assets/art-data.jpg";
import { methods, newsItems, publications, researchTracks, stats } from "@/lib/lab-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DDOmics Lab — Microbiome Research at NCCS Pune" },
      {
        name: "description",
        content:
          "The DDOmics Lab at NCCS Pune studies microbial communities in human health and disease using classic microbiology, next-generation sequencing and multi-omics integration.",
      },
      { property: "og:title", content: "DDOmics Lab — Microbiome Research at NCCS Pune" },
      {
        property: "og:description",
        content:
          "Mapping the Indian microbiome: gut, oral and skin communities across health, disease and early life.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const selected = publications.filter((p) => p.selected).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="hero-veil relative -mt-24 flex min-h-screen items-center overflow-hidden text-deep-foreground">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="hero-drift pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--deep)_92%)]"
        />

        {/* Floating concept art */}


        <div className="relative mx-auto w-full max-w-4xl px-6 pt-32 pb-24 text-center">
          <Reveal>
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="mx-auto mb-10 h-24 w-24"
            >
              <circle cx="42" cy="52" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-silver" />
              <circle cx="62" cy="34" r="15" className="fill-primary" />
              <circle cx="62" cy="70" r="12" className="fill-silver" />
            </svg>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="display-title text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
              <em>The microbiome is an integral part of</em>
              <br />
              <span className="silver-text">Human Health</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="measure mx-auto mt-8 text-base leading-relaxed opacity-70 sm:text-lg">
              We map microbial communities across Indian populations — gut, oral and skin — combining
              culturomics, next-generation sequencing and multi-omics to turn community structure into
              testable biology.
            </p>
          </Reveal>

          <Reveal delay={260} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/research"
              className="eyebrow sheen border border-primary px-7 py-3 tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore the research
            </Link>
            <Link
              to="/dhiraj-dhotre"
              className="eyebrow sheen border border-silver/50 px-7 py-3 tracking-[0.12em] uppercase transition-colors hover:border-silver"
            >
              Meet the PI
            </Link>
          </Reveal>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 overflow-hidden bg-silver/25"
        >
          <span className="block h-4 w-full animate-[marquee-scroll_2.4s_linear_infinite] bg-primary" />
        </span>
      </section>

      <Marquee />

      {/* Mission */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src={artHand}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 hidden h-[85%] object-contain opacity-25 mix-blend-screen lg:block"
        />
        <img
          src={artMicrobes}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-6 hidden h-[70%] object-contain opacity-25 mix-blend-screen lg:block"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <Reveal>
            <hr className="silver-rule mx-auto mb-14 w-72" />
            <h2 className="display-title text-2xl leading-snug sm:text-4xl">
              <em>In the DDOmics Lab, we study</em> microbial communities{" "}
              <em>in human health and disease.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="measure mx-auto mt-8 text-lg leading-relaxed text-muted-foreground">
              The human body carries microbial cells in roughly 1:1 proportion to human cells, involved in
              metabolism, immune modulation, and production of antimicrobial agents — and imbalance in these
              communities has been observed across a range of diseases and metabolic disorders. We study
              microbial community structure and function using classic microbiology, next-generation
              sequencing, and multi-omics data integration.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="display-title mt-10 text-xl sm:text-2xl">
              What does India's microbiome look like — and what can it tell us about health?
            </h3>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border px-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-background px-6 py-12 text-center">
              <p className="display-title text-4xl lg:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} className="silver-text" />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-3 lg:px-10 lg:py-28">
          {methods.map((m, i) => (
            <Reveal
              key={m.title}
              delay={i * 90}
              className="lift-card sheen border border-border bg-card p-8"
            >
              <div className="art-tile mb-6 aspect-[16/9] w-full overflow-hidden border border-border bg-ink">
                <img
                  src={[artPetri, artChromatogram, artData][i % 3]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <span aria-hidden="true" className="mb-6 block h-1 w-10 bg-primary" />
              <h3 className="display-title mb-3 text-2xl">{m.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Research preview */}
      <section className="bg-deep text-deep-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <p className="eyebrow mb-4 opacity-50">Research</p>
            <h2 className="display-title text-3xl lg:text-4xl">Five active tracks</h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-px bg-deep-foreground/10 sm:grid-cols-2 lg:grid-cols-5">
            {researchTracks.map((t, i) => (
              <Reveal key={t.code} delay={i * 70} className="bg-deep">
                <Link
                  to="/research"
                  hash={t.code.replace(/[^a-z0-9]/gi, "").toLowerCase()}
                  className="group flex h-full flex-col gap-4 px-6 py-10 transition-colors hover:bg-deep-foreground/5"
                >
                  <span className="eyebrow opacity-50 transition-colors group-hover:text-primary group-hover:opacity-100">
                    {t.code}
                  </span>
                  <h3 className="display-title text-lg leading-snug">{t.title}</h3>
                  <p className="text-sm leading-relaxed opacity-60">{t.summary}</p>
                  <span className="eyebrow mt-auto translate-y-1 pt-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-70">
                    Read more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications preview */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow mb-4 text-muted-foreground">Publications</p>
            <h2 className="display-title text-3xl lg:text-4xl">Selected papers</h2>
          </Reveal>

          <ul className="divide-y divide-border border-t border-b border-border">
            {selected.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 60}
                className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.authors.split(",")[0]} et al. · {p.venue}, {p.year}
                  </p>
                </div>
                {p.doi && (
                  <span className="eyebrow whitespace-nowrap text-muted-foreground">{p.doi}</span>
                )}
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              to="/publications"
              className="eyebrow sheen inline-block border border-primary px-7 py-3 tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View full publication list
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3 text-primary">Newsroom</p>
              <h2 className="display-title text-3xl sm:text-4xl">Latest news &amp; media</h2>
            </div>
            <Link
              to="/news"
              className="eyebrow sheen border border-primary px-6 py-3 text-sm tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              All stories
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {newsItems.slice(0, 3).map((n, i) => (
              <Reveal as="article" key={n.title} delay={i * 80} className="group flex flex-col">
                <Link to="/news" className="flex flex-1 flex-col">
                  <div className="art-tile aspect-[4/3] w-full overflow-hidden border border-border bg-ink">
                    <img src={n.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-5 flex items-center gap-3 text-xs tracking-[0.14em] uppercase">
                    <span className="border border-primary px-2 py-1 text-primary">{n.category}</span>
                    <span className="text-muted-foreground">{n.date}</span>
                  </p>
                  <h3 className="display-title mt-3 text-xl leading-snug transition-colors group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
