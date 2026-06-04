import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

interface Confetto {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  rot: number;
  vr: number;
  life: number;
}

export function EasterEgg() {
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const want = SEQUENCE[idxRef.current];
      if (e.key.toLowerCase() === want.toLowerCase()) {
        idxRef.current++;
        if (idxRef.current === SEQUENCE.length) {
          idxRef.current = 0;
          fire();
        }
      } else {
        idxRef.current = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fire = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3200);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#a78bfa", "#67e8f9", "#fbbf24", "#34d399", "#fb7185", "#f0abfc"];
    const parts: Confetto[] = Array.from({ length: 220 }, () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 60,
      y: window.innerHeight / 2 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 18,
      vy: -Math.random() * 16 - 6,
      r: 3 + Math.random() * 4,
      c: colors[(Math.random() * colors.length) | 0],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 1,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = false;
      for (const p of parts) {
        p.vy += 0.35;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.006;
        if (p.life > 0) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r, -p.r * 0.4, p.r * 2, p.r * 0.8);
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[120] h-full w-full"
        aria-hidden
      />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-none fixed left-1/2 top-[58%] z-[121] -translate-x-1/2"
          >
            <div className="glass-strong glow-ring flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              You found the secret. Thanks for exploring ✨
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
