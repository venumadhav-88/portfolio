import { Quote } from "lucide-react";
import { SectionHeading } from "./Reveal";
import data from "@/data/portfolio.json";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

export function Testimonials() {
  const items = (data as unknown as { testimonials: Testimonial[] }).testimonials ?? [];
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <section id="testimonials" className="relative z-10 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Kind words"
          title={
            <>
              Praise from people <span className="text-gradient">I built with</span>
            </>
          }
          description="A few notes from collaborators, founders, and teammates."
        />
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 py-4 group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="glass relative w-[360px] shrink-0 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:glow-ring sm:w-[420px]"
            >
              <Quote className="absolute right-5 top-5 h-6 w-6 text-primary/30" />
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white shadow-lg`}
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
