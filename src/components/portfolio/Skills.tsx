import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";

const GROUPS = [
  {
    title: "Languages & Core",
    items: [
      { name: "Python", level: 92 },
      { name: "Java", level: 85 },
      { name: "DSA", level: 88 },
      { name: "Git / GitHub", level: 90 },
      { name: "Linux", level: 85 },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { name: "Machine Learning", level: 88 },
      { name: "Deep Learning", level: 80 },
      { name: "Claude Code", level: 86 },
      { name: "OpenClaw", level: 78 },
      { name: "n8n Automation", level: 82 },
    ],
  },
  {
    title: "Systems & Data",
    items: [
      { name: "AWS", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 84 },
      { name: "Computer Networks", level: 82 },
      { name: "Operating Systems", level: 84 },
    ],
  },
];

const STACK = [
  "Python", "Java", "Git", "GitHub", "AI", "ML", "DSA", "AWS",
  "n8n", "Linux", "OS", "CN", "MySQL", "PostgreSQL",
  "OpenClaw", "Claude Code",
];

function Bar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium text-foreground/90">{name}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{level}%</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tools I reach for, <span className="text-gradient">fluently</span>
            </>
          }
          description="A working toolkit refined over many shipping cycles. I pick the lightest tool that does the job — and bring depth where the product demands it."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:glow-ring">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:to-accent/10 group-hover:opacity-100" />
                <h3 className="mb-6 text-lg font-semibold text-foreground">{g.title}</h3>
                <div className="space-y-4">
                  {g.items.map((it) => (
                    <Bar key={it.name} {...it} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {STACK.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, scale: 1.06 }}
                className="cursor-default rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
