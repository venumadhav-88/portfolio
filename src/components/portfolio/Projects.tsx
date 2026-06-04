import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import data from "@/data/portfolio.json";

interface Project {
  title: string;
  tag: string;
  year: string;
  desc: string;
  long: string;
  tech: string[];
  color: string;
  pattern: string;
}

const PROJECTS: Project[] = data.projects;
const FILTERS = Array.from(new Set(["All", ...PROJECTS.map((p) => p.tag)]));

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      ry: (x - 0.5) * 12,
      rx: -(y - 0.5) * 12,
      gx: x * 100,
      gy: y * 100,
    });
  };
  const reset = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onOpen}
      data-magnetic
      className="group relative cursor-pointer overflow-hidden rounded-3xl glass-strong [perspective:1200px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div
          className="relative aspect-[4/3] w-full overflow-hidden"
          style={{ background: p.pattern, backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.18), transparent 50%)`,
            }}
          />
          <div className="absolute inset-0 [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90 backdrop-blur">
              {p.tag}
            </span>
            <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-mono text-white/70 backdrop-blur">
              {p.year}
            </span>
          </div>
          <div
            className="absolute bottom-5 right-5 rounded-full bg-white/15 p-2.5 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45"
            style={{ transform: "translateZ(40px)" }}
          >
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="p-6" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-semibold text-foreground">{p.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-white/5 px-2.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const items = PROJECTS.filter((p) => filter === "All" || p.tag === filter);

  return (
    <section id="projects" className="relative z-10 px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Recent <span className="text-gradient">projects</span>
            </>
          }
          description="A small selection of work I'm proud of. Click any card for the longer story."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-magnetic
                className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  filter === f
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <ProjectCard key={p.title} p={p} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-strong"
            >
              <div
                className="relative aspect-[16/9]"
                style={{ background: open.pattern, backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <button
                  onClick={() => setOpen(null)}
                  className="absolute right-4 top-4 rounded-full bg-black/40 p-2 backdrop-blur-md transition-colors hover:bg-black/60"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
              <div className="p-8">
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span>{open.tag}</span>·<span>{open.year}</span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  {open.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {open.long}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Live demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
