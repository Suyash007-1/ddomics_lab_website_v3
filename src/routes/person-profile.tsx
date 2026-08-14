import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { people } from "@/lib/lab-data";

export const Route = createFileRoute("/people/$personId")({
  loader: ({ params }) => {
    const person = people.find((p) => p.slug === params.personId);
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — DDOmics Lab, NCCS Pune` : "Profile — DDOmics Lab" },
      {
        name: "description",
        content: loaderData?.bio ?? `${loaderData?.name ?? "Lab member"} at DDOmics Lab, NCCS Pune.`,
      },
    ],
  }),
  component: PersonProfilePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow mb-4 text-muted-foreground">Not found</p>
      <h1 className="display-title text-3xl">This person isn't listed</h1>
      <Link to="/people" className="eyebrow sheen mt-8 inline-block border border-primary px-6 py-3 tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground">
        Back to People
      </Link>
    </div>
  ),
});

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const socialLabels: Record<string, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  scholar: "Google Scholar",
  orcid: "ORCID",
  github: "GitHub",
  website: "Website",
};

function PersonProfilePage() {
  const person = Route.useLoaderData();
  const socialEntries = person.socials
    ? (Object.entries(person.socials).filter(([, v]) => !!v) as [string, string][])
    : [];

  return (
    <section className="hero-veil relative -mt-24 overflow-hidden text-deep-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-44 pb-24 lg:grid-cols-12 lg:px-10 lg:pt-52 lg:pb-32">
        <Reveal className="lg:col-span-4">
          <div className="silver-frame sheen relative mx-auto flex aspect-[4/5] w-full max-w-xs items-center justify-center overflow-hidden bg-card/40 backdrop-blur">
            {person.photo ? (
              <img src={person.photo} alt={person.name} className="h-full w-full object-cover" />
            ) : (
              <span className="display-title text-5xl text-muted-foreground">{initials(person.name)}</span>
            )}
          </div>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow mb-5 opacity-60">{person.group === "pi" ? "Principal Investigator" : person.role}</p>
            <h1 className="display-title silver-text text-4xl sm:text-5xl lg:text-6xl">{person.name}</h1>
            <p className="mt-4 font-display text-xl font-semibold text-primary">{person.role}</p>
            <p className="mt-1 text-sm opacity-70">DDOmics Lab, National Centre for Cell Science, Pune</p>
          </Reveal>

          <Reveal delay={120}>
            <p className="measure mt-8 leading-relaxed opacity-85">
              {person.bio ?? "This lab member hasn't shared a bio yet — check back soon."}
            </p>
          </Reveal>

          {socialEntries.length > 0 && (
            <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow sheen border border-silver/50 px-5 py-2.5 tracking-[0.1em] uppercase transition-colors hover:border-silver"
                >
                  {socialLabels[key] ?? key}
                </a>
              ))}
            </Reveal>
          )}

          <Reveal delay={260} className="mt-10">
            <Link
              to="/people"
              className="eyebrow sheen inline-block border border-primary px-6 py-3 tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              ← Back to People
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
