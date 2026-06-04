import { motion, useScroll, useTransform } from "framer-motion";

export function Aurora() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const shift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Soft grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Conic aurora ring */}
      <motion.div
        style={{ rotate }}
        className="absolute -inset-[20%] opacity-50 blur-3xl"
      >
        <div
          className="h-full w-full animate-aurora-spin"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--glow) 60deg, transparent 140deg, var(--glow-2) 220deg, transparent 320deg)",
            maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating mesh blobs */}
      <motion.div
        style={{ y: shift }}
        className="absolute -left-32 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-40 blur-[120px] animate-blob-a"
        // eslint-disable-next-line react/forbid-dom-props
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--glow)" }} />
      </motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 160]) }}
        className="absolute -right-32 top-1/3 h-[40rem] w-[40rem] rounded-full opacity-40 blur-[140px] animate-blob-b"
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--glow-2)" }} />
      </motion.div>

      {/* Subtle scan line */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,0.6) 3px, rgba(255,255,255,0.6) 4px)",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />
    </div>
  );
}
