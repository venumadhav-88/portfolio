import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";

const TIMELINE = [
  { year: "2025", title: "Student Researcher", desc: "Exploring AI/ML, RAG pipelines, and applied research projects." },
  { year: "2025", title: "ML Engineer (Projects)", desc: "Building production-style ML pipelines on AWS with Python and n8n." },
  { year: "2024", title: "Software Developer", desc: "Shipping tools across DSA, systems, and open-source contributions." },
  { year: "2023", title: "Started CS journey", desc: "Deep diving into OS, networks, DSA, Linux, and databases." },
];

const FACTS = [
  { k: "20+", v: "Projects shipped" },
  { k: "8+", v: "Languages & tools" },
  { k: "3+", v: "Years coding" },
  { k: "∞", v: "Curiosity" },
];

export function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Researcher, engineer & <span className="text-gradient">builder</span>
            </>
          }
          description="I love the seam where research meets shipping — from training models to wiring up the systems that put them to work."
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
              <p className="relative text-lg leading-relaxed text-foreground/90">
                I&apos;m <span className="font-semibold">Venu Madhav Kasaraneni</span> — a
                student researcher, ML engineer, and software developer working at the
                intersection of AI, systems, and clean code.
              </p>
              <p className="relative mt-5 text-base leading-relaxed text-muted-foreground">
                I work primarily in Python and Java, with a strong foundation in DSA, OS,
                computer networks, Linux, and databases (MySQL & PostgreSQL). Lately I&apos;ve
                been building with AWS, n8n, Claude Code, and the OpenClaw engine — turning
                research ideas into working systems on GitHub.
              </p>

              <div className="relative mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {FACTS.map((f) => (
                  <div key={f.v}>
                    <div className="text-3xl font-bold text-gradient">{f.k}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {f.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ol className="relative space-y-8 border-l border-border/60 pl-8">
              {TIMELINE.map((t, i) => (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative"
                >
                  <span className="absolute -left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-primary/40 blur-sm transition-all group-hover:bg-primary group-hover:blur-md" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-accent" />
                  </span>
                  <div className="font-mono text-[11px] tracking-widest text-primary">
                    {t.year}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-foreground">{t.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
