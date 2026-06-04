import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Briefcase, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import data from "@/data/portfolio.json";

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket,
  Briefcase,
  Award,
  Sparkles,
};

interface Milestone {
  icon: string;
  year: string;
  title: string;
  org: string;
  desc: string;
}

const MILESTONES: Milestone[] = data.milestones;
const COUNTERS = data.counters;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="text-5xl font-bold text-gradient sm:text-6xl">
      {n}
      {suffix}
    </span>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative z-10 px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Milestones & <span className="text-gradient">moments</span>
            </>
          }
          description="A condensed view of the work — across staff roles, founder seats, and the studio."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="grid grid-cols-2 gap-5">
              {COUNTERS.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl glass p-6 transition-transform hover:-translate-y-1"
                >
                  <Counter value={c.value} suffix={c.suffix} />
                  <div className="mt-2 text-xs text-muted-foreground">{c.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => {
                const Icon = ICON_MAP[m.icon] || Sparkles;
                return (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group relative ml-12 rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:glow-ring"
                  >
                    <div className="absolute -left-[3.25rem] top-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold text-foreground">{m.title}</h3>
                      <span className="font-mono text-[11px] tracking-widest text-primary">
                        {m.year}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{m.org}</div>
                    <p className="mt-2 text-sm text-foreground/80">{m.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
