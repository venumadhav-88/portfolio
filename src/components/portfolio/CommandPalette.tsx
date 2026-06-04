import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  User,
  Wrench,
  FolderGit2,
  BriefcaseBusiness,
  Award,
  Mail,
  Copy,
  Github,
  Linkedin,
  Palette,
  Volume2,
  VolumeX,
  Command as CmdIcon,
} from "lucide-react";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

const ACCENTS = [
  { id: "violet", name: "Aurora", primary: "0.72 0.18 280", accent: "0.72 0.2 200", glow: "0.72 0.22 290", glow2: "0.78 0.18 200" },
  { id: "cyan", name: "Glacier", primary: "0.78 0.16 200", accent: "0.74 0.18 230", glow: "0.78 0.18 200", glow2: "0.74 0.18 230" },
  { id: "amber", name: "Ember", primary: "0.78 0.18 60", accent: "0.7 0.22 25", glow: "0.78 0.2 50", glow2: "0.74 0.2 20" },
  { id: "emerald", name: "Forest", primary: "0.74 0.18 155", accent: "0.74 0.18 200", glow: "0.78 0.18 160", glow2: "0.78 0.16 200" },
  { id: "rose", name: "Bloom", primary: "0.74 0.2 350", accent: "0.74 0.18 300", glow: "0.78 0.22 340", glow2: "0.78 0.18 300" },
];

export function applyAccent(id: string) {
  const a = ACCENTS.find((x) => x.id === id) ?? ACCENTS[0];
  const r = document.documentElement.style;
  r.setProperty("--primary", `oklch(${a.primary})`);
  r.setProperty("--accent", `oklch(${a.accent})`);
  r.setProperty("--glow", `oklch(${a.glow})`);
  r.setProperty("--glow-2", `oklch(${a.glow2})`);
  r.setProperty("--ring", `oklch(${a.primary})`);
  localStorage.setItem("accent", id);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("accent");
    if (saved) applyAccent(saved);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
    else {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    setOpen(false);
  };

  const commands: Cmd[] = useMemo(
    () => [
      { id: "go-about", group: "Navigate", label: "About", icon: User, run: () => go("about") },
      { id: "go-skills", group: "Navigate", label: "Skills", icon: Wrench, run: () => go("skills") },
      { id: "go-projects", group: "Navigate", label: "Selected Work", icon: FolderGit2, run: () => go("projects") },
      { id: "go-exp", group: "Navigate", label: "Experience", icon: BriefcaseBusiness, run: () => go("experience") },
      { id: "go-cert", group: "Navigate", label: "Certifications", icon: Award, run: () => go("certifications") },
      { id: "go-contact", group: "Navigate", label: "Contact", icon: Mail, run: () => go("contact") },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: "kasaraneni.venumadhav@gmail.com",
        icon: Copy,
        run: () => copy("kasaraneni.venumadhav@gmail.com"),
      },
      { id: "open-gh", group: "Actions", label: "Open GitHub", icon: Github, run: () => { window.open("https://github.com/venumadhav-88", "_blank"); setOpen(false); } },
      { id: "open-li", group: "Actions", label: "Open LinkedIn", icon: Linkedin, run: () => { window.open("https://www.linkedin.com/in/venumadhavkasaraneni", "_blank"); setOpen(false); } },
      {
        id: "sound",
        group: "Preferences",
        label: "Toggle ambient sound",
        icon: typeof window !== "undefined" && localStorage.getItem("sound") === "on" ? Volume2 : VolumeX,
        run: () => {
          const next = localStorage.getItem("sound") === "on" ? "off" : "on";
          localStorage.setItem("sound", next);
          window.dispatchEvent(new CustomEvent("portfolio:sound", { detail: next }));
          setOpen(false);
        },
      },
      ...ACCENTS.map((a) => ({
        id: `accent-${a.id}`,
        group: "Theme",
        label: `Accent — ${a.name}`,
        icon: Palette,
        run: () => {
          applyAccent(a.id);
          setOpen(false);
        },
      })),
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => (c.label + " " + (c.hint ?? "")).toLowerCase().includes(s));
  }, [q, commands]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const groups = useMemo(() => {
    const m = new Map<string, Cmd[]>();
    filtered.forEach((c) => {
      if (!m.has(c.group)) m.set(c.group, []);
      m.get(c.group)!.push(c);
    });
    return Array.from(m.entries());
  }, [filtered]);

  const flat = filtered;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(flat.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      flat[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 px-4 pt-[10vh] backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong glow-ring w-full max-w-xl overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, actions, themes…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {flat.length === 0 && (
                <div className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No matches.
                </div>
              )}
              {groups.map(([group, items]) => (
                <div key={group} className="mb-2">
                  <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {group}
                  </div>
                  {items.map((c) => {
                    const Icon = c.icon;
                    const idx = flat.indexOf(c);
                    const isActive = idx === active;
                    return (
                      <button
                        key={c.id}
                        onMouseEnter={() => setActive(idx)}
                        onClick={c.run}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          isActive ? "bg-primary/15 text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{c.label}</span>
                        {c.hint && <span className="text-xs text-muted-foreground">{c.hint}</span>}
                        <ArrowRight className={`h-3.5 w-3.5 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border/50 px-4 py-2 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CmdIcon className="h-3 w-3" /> Command palette
              </span>
              <span>↑↓ navigate · ↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandHint() {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/i.test(navigator.platform));
  }, []);
  return (
    <button
      onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
      className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
      aria-label="Open command palette"
    >
      <Search className="h-3 w-3" />
      <span>Quick nav</span>
      <kbd className="rounded border border-border/60 bg-background/40 px-1 font-mono text-[10px]">
        {mac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}
