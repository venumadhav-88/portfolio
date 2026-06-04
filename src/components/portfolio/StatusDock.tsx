import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Volume2, VolumeX, Sparkles } from "lucide-react";
import { applyAccent } from "./CommandPalette";

const ACCENTS = [
  { id: "violet", c: "#a78bfa" },
  { id: "cyan", c: "#67e8f9" },
  { id: "amber", c: "#fbbf24" },
  { id: "emerald", c: "#34d399" },
  { id: "rose", c: "#fb7185" },
];

export function StatusDock() {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15_000);
    setSound(localStorage.getItem("sound") === "on");
    const onSound = (e: Event) =>
      setSound((e as CustomEvent).detail === "on");
    window.addEventListener("portfolio:sound", onSound);
    return () => {
      clearInterval(id);
      window.removeEventListener("portfolio:sound", onSound);
    };
  }, []);

  const toggleSound = () => {
    const next = sound ? "off" : "on";
    localStorage.setItem("sound", next);
    setSound(!sound);
    window.dispatchEvent(new CustomEvent("portfolio:sound", { detail: next }));
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-4 z-40 hidden md:block"
    >
      <div className="glass-strong glow-ring flex items-center gap-2 rounded-full px-2 py-1.5 text-xs">
        <div className="flex items-center gap-2 rounded-full px-2 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-medium">Available for work</span>
        </div>
        <span className="h-4 w-px bg-border/60" />
        <span className="px-1 font-mono text-[11px] tabular-nums text-muted-foreground">
          LIS · {time}
        </span>
        <span className="h-4 w-px bg-border/60" />
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Change accent"
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
        >
          <Palette className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={toggleSound}
          aria-label="Toggle ambient sound"
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
        >
          {sound ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            className="glass-strong absolute bottom-12 left-0 flex items-center gap-2 rounded-full px-3 py-2"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  applyAccent(a.id);
                  setOpen(false);
                }}
                className="h-5 w-5 rounded-full ring-2 ring-transparent transition-all hover:scale-110 hover:ring-foreground/40"
                style={{ backgroundColor: a.c, boxShadow: `0 0 16px ${a.c}80` }}
                aria-label={`Accent ${a.id}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
