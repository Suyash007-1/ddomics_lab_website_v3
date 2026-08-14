import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lab, navLinks } from "@/lib/lab-data";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/85 text-foreground backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-deep-foreground"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-24 items-center justify-between gap-6">
          {/* Logo slot — drop the lab logo image in place of the mark below */}
          <Link to="/" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              data-logo-slot
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-silver/50 transition-all duration-500 group-hover:ring-primary"
            >
              <svg viewBox="0 0 40 40" className="h-7 w-7">
                <circle
                  cx="17"
                  cy="21"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-silver transition-colors duration-500 group-hover:text-primary"
                />
                <circle cx="25" cy="14" r="6" className="fill-primary" />
                <circle cx="26" cy="29" r="4.5" className="fill-silver" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[11px] font-semibold tracking-[0.28em] opacity-60">
                THE
              </span>
              <span className="block font-display text-2xl font-bold tracking-tight text-current">
                {lab.name}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="link-underline nav-item opacity-80 transition-opacity hover:opacity-100 data-[status=active]:opacity-100"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/join"
              className="eyebrow sheen border border-primary px-5 py-2 text-sm tracking-[0.1em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Join the Lab
            </Link>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="flex w-8 flex-col gap-1.5"
            >
              <span
                className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  open ? "-translate-y-[6.5px] w-full -rotate-45" : "w-2/3 self-end"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="flex animate-fade-in flex-col gap-1 border-t border-border bg-background px-6 pb-6 lg:hidden">
          {[...navLinks, { to: "/join", label: "Join the Lab" }].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="nav-item block border-b border-border py-3 text-foreground/85 last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
