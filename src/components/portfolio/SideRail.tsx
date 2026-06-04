import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "testimonials", label: "Praise" },
  { id: "contact", label: "Contact" },
];

export function SideRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-3">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className="group flex items-center gap-2 outline-none"
                aria-label={`Go to ${s.label}`}
              >
                <span
                  className={`whitespace-nowrap rounded-full glass px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-foreground opacity-100"
                      : "translate-x-2 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`relative block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-primary shadow-[0_0_12px_var(--glow)]"
                      : "h-1.5 w-1.5 bg-muted-foreground/40 group-hover:bg-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
