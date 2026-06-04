import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative z-10 mt-20 overflow-hidden">
      {/* Wave */}
      <div className="relative h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 h-full w-[200%] animate-wave text-primary/20"
          viewBox="0 0 2400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C300,120 600,-20 1200,50 C1800,120 2100,-20 2400,50 L2400,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 h-full w-[200%] animate-wave text-accent/15"
          style={{ animationDuration: "26s", animationDirection: "reverse" }}
          viewBox="0 0 2400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,10 600,110 1200,60 C1800,10 2100,110 2400,60 L2400,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative border-t border-border/60 glass-strong px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <div className="text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
            Built with curiosity & code.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Venu Madhav Kasaraneni</span>
            <span className="hidden sm:inline">·</span>
            <a href="https://github.com/venumadhav-88" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
            <span className="hidden sm:inline">·</span>
            <a href="https://www.linkedin.com/in/venumadhavkasaraneni" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
            <span className="hidden sm:inline">·</span>
            <a href="mailto:kasaraneni.venumadhav@gmail.com" className="hover:text-foreground">Email</a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <MagneticButton
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-primary/60"
            >
              <ArrowUp className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
