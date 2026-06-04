import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { CommandHint } from "./CommandPalette";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
      />
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass-strong glow-ring" : "glass"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-primary-foreground">
            VK
            <span className="absolute inset-0 -z-10 rounded-full bg-primary/60 blur-md" />
          </span>
          <span className="hidden sm:inline">Venu Madhav</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              data-magnetic
              className="relative rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandHint />
          <MagneticButton
            onClick={() => go("contact")}
            className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
          >
            Let's talk
          </MagneticButton>
        </div>
      </motion.header>
    </>
  );
}
