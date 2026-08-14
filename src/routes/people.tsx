import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ImageMarquee } from "@/components/ImageMarquee";
import { alumni, people, labGroupPhoto } from "@/lib/lab-data";
import peopleHeroBg from "@/assets/people-hero.png";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People — DDOmics Lab, NCCS Pune" },
      {
        name: "description",
        content:
          "Meet the DDOmics Lab team: principal investigator Dr. Dhiraj Dhotre, project scientists, Ph.D. students and technical staff at NCCS Pune.",
      },
      { property: "og:title", content: "People — DDOmics Lab, NCCS Pune" },
      { property: "og:description", content: "The scientists and students behind the DDOmics Lab." },
    ],
  }),
  component: PeoplePage,
});

const groups = [
  { key: "pi", label: "Principal Investigator" },
  { key: "scientist", label: "Scientists" },
  { key: "student", label: "Ph.D. Students" },
  { key: "staff", label: "Technical & Project Staff" },
] as const;

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PeoplePage() {
  return (
    <>
      <section className="hero-veil relative -mt-24 overflow-hidden text-deep-foreground">
        <img
          src={peopleHeroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--deep)_35%,transparent),var(--deep)_62%)]"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-44 pb-16 lg:grid-cols-12 lg:px-10 lg:pt-52 lg:pb-24">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-5 opacity-60">People</p>
            <h1 className="display-title max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              Meet <span className="silver-text">the lab</span>
            </h1>
            <p className="measure mt-8 leading-relaxed opacity-80">
              A mix of microbiologists, bioinformaticians and students working between the wet lab and the
              compute cluster at the National Centre for Cell Science, Pune.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="silver-frame sheen overflow-hidden bg-card/40 backdrop-blur">
              <img
                src={labGroupPhoto}
                alt="DDOmics Lab group photo"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <ImageMarquee />
      </Reveal>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {groups.map((g) => {
            const members = people.filter((p) => p.group === g.key);
            if (members.length === 0) return null;
            return (
              <div key={g.key} className="mb-20 last:mb-0">
                <Reveal>
                  <h2 className="display-title text-2xl">{g.label}</h2>
                  <hr className="silver-rule mt-5 mb-10" />
                </Reveal>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((p, i) => {
                    const card = (
                      <>
                        <div className="relative flex aspect-square w-36 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-silver/30 transition-all duration-500 group-hover:ring-primary">
                          {p.photo ? (
                            <img
                              src={p.photo}
                              alt={p.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <span className="display-title text-3xl text-muted-foreground transition-transform duration-500 group-hover:scale-110">
                              {initials(p.name)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="display-title text-xl leading-tight">{p.name}</h3>
                          <p className="mt-1 font-display text-base font-semibold text-primary">{p.role}</p>
                        </div>
                      </>
                    );
                    const cls =
                      "lift-card sheen group flex h-full flex-col items-center gap-5 border border-border bg-card p-8 text-center";
                    const viewProfile = (
                      <span className="eyebrow text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        View profile →
                      </span>
                    );
                    return (
                      <Reveal key={p.slug} delay={(i % 4) * 80}>
                        {p.link ? (
                          <Link to="/dhiraj-dhotre" className={cls}>
                            {card}
                            {viewProfile}
                          </Link>
                        ) : (
                          <Link to="/people/$personId" params={{ personId: p.slug }} className={cls}>
                            {card}
                            {viewProfile}
                          </Link>
                        )}
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:py-24">
          <Reveal>
            <h2 className="display-title text-2xl sm:text-3xl">Alumni</h2>
            <hr className="silver-rule mt-5 mb-8" />
          </Reveal>
          <ul className="divide-y divide-border border-t border-b border-border">
            {alumni.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 70} className="flex items-center justify-between gap-4 py-5">
                <span className="flex items-center gap-4">
                  {a.photo ? (
                    <img
                      src={a.photo}
                      alt={a.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-silver/30"
                    />
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-1 ring-silver/30">
                      {initials(a.name)}
                    </span>
                  )}
                  <span className="font-display text-lg font-semibold">{a.name}</span>
                </span>
                <span className="text-sm text-muted-foreground">{a.role}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <p className="measure mt-8 leading-relaxed text-muted-foreground">
              Former students and staff of the lab have moved on to postdoctoral positions, industry
              bioinformatics roles and doctoral programmes in India and abroad. Alumni listings are updated
              each academic year.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
