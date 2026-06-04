import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const ROLES = [
  "Student Researcher",
  "ML Engineer",
  "Software Developer",
  "AI Enthusiast",
];

function useTypewriter(words: string[], speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), pause);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((p) => p + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLES);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMx(x);
      setMy(y);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px] animate-pulse-glow"
        style={{ transform: `translate3d(${mx * 30}px, ${my * 30}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[460px] w-[460px] rounded-full bg-accent/25 blur-[140px] animate-pulse-glow"
        style={{ transform: `translate3d(${mx * -40}px, ${my * -20}px, 0)`, animationDelay: "2s" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background:radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Floating shapes */}
      <motion.div
        className="absolute left-[8%] top-[28%] hidden h-16 w-16 rounded-2xl border border-white/20 backdrop-blur-md md:block"
        style={{ transform: `translate3d(${mx * 20}px, ${my * 20}px, 0)` }}
        animate={{ rotate: [0, 12, 0], y: [0, -16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[22%] hidden h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/40 md:block"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[18%] hidden h-20 w-20 rounded-full border border-accent/40 md:block"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Available for new projects · Q3 2026
          <span className="relative ml-1 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.6rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight"
        >
          <span className="text-gradient">Venu Madhav</span>
          <br />
          <span className="text-foreground/90">building with</span>{" "}
          <span className="italic text-foreground/60">AI, code</span>
          <br />
          <span className="text-foreground/90">and curiosity.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          I&apos;m a{" "}
          <span className="font-medium text-foreground">
            {typed}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[2px] bg-primary align-middle animate-caret" />
          </span>
          {" "}exploring AI/ML, building software, and turning research ideas into
          working systems — one commit at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
          >
            <span className="relative z-10">View selected work</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-foreground transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </MagneticButton>
          <MagneticButton
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full glass-strong px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-white/10"
          >
            Get in touch →
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex items-center justify-center gap-5 text-muted-foreground"
        >
          {[
            { Icon: Github, href: "https://github.com/venumadhav-88" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/venumadhavkasaraneni" },
            { Icon: Mail, href: "mailto:kasaraneni.venumadhav@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              data-magnetic
              className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          Scroll
          <ArrowDown className="h-3 w-3" />
        </motion.div>
      </motion.div>
    </section>
  );
}
