import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import data from "@/data/portfolio.json";

interface Cert {
  title: string;
  org: string;
  year: string;
  cat: string;
  color: string;
}

const CERTS: Cert[] = data.certifications;
const CATS = Array.from(new Set(["All", ...CERTS.map((c) => c.cat)]));

export function Certifications() {
  const [filter, setFilter] = useState<string>("All");
  const items = CERTS.filter((c) => filter === "All" || c.cat === filter);

  return (
    <section id="certifications" className="relative z-10 px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Learning, <span className="text-gradient">on purpose</span>
            </>
          }
          description="Selected programs and credentials I've completed over the years."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-magnetic
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  filter === c
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((c) => (
              <motion.div
                key={c.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl glass-strong p-6"
              >
                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${c.color} opacity-30 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-60`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} shadow-lg`}
                    >
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                      {c.year}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <div className="mt-1 text-sm text-muted-foreground">{c.org}</div>
                  <div className="mt-4 inline-flex items-center rounded-full border border-border bg-white/5 px-2.5 py-0.5 text-[10px] text-muted-foreground">
                    {c.cat}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
