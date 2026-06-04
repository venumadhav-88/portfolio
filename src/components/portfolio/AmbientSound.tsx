import { useEffect, useRef } from "react";

// Ambient pad + light UI hover/click blips. Only active when user enables sound.
export function AmbientSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const padRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(null);
  const uiGainRef = useRef<GainNode | null>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const ensureCtx = () => {
      if (ctxRef.current) return ctxRef.current;
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const ui = ctx.createGain();
      ui.gain.value = 0.55;
      ui.connect(ctx.destination);
      uiGainRef.current = ui;
      return ctx;
    };

    const startPad = () => {
      if (padRef.current) return;
      const ctx = ensureCtx();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      const freqs = [110, 164.81, 220, 246.94];
      const oscs = freqs.map((f) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f;
        g.gain.value = 0.18;
        o.connect(g).connect(gain);
        o.start();
        return o;
      });
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
      padRef.current = { gain, oscs };
    };

    const stopAll = () => {
      const pad = padRef.current;
      const ctx = ctxRef.current;
      if (pad && ctx) {
        pad.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        setTimeout(() => {
          pad.oscs.forEach((o) => o.stop());
          padRef.current = null;
        }, 700);
      }
      setTimeout(() => {
        ctxRef.current?.close();
        ctxRef.current = null;
        uiGainRef.current = null;
      }, 800);
    };

    const blip = (freq: number, dur: number, vol: number, type: OscillatorType = "sine") => {
      const ctx = ctxRef.current;
      const ui = uiGainRef.current;
      if (!ctx || !ui) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + dur);
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g).connect(ui);
      o.start();
      o.stop(ctx.currentTime + dur + 0.02);
    };

    // Throttle hover blips so they feel breezy, not noisy.
    let lastHover = 0;
    const onHover = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const t = e.target as HTMLElement | null;
      if (!t?.closest("a, button, [data-magnetic], [role='button']")) return;
      const now = performance.now();
      if (now - lastHover < 80) return;
      lastHover = now;
      // soft high-frequency pluck
      const notes = [880, 988, 1175, 1318];
      blip(notes[(Math.random() * notes.length) | 0], 0.09, 0.22, "triangle");
    };
    const onClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const t = e.target as HTMLElement | null;
      if (!t?.closest("a, button, [data-magnetic], [role='button']")) return;
      blip(523.25, 0.14, 0.35, "sine");
      setTimeout(() => blip(783.99, 0.12, 0.25, "sine"), 40);
    };

    const onChange = (e: Event) => {
      const v = (e as CustomEvent).detail;
      enabledRef.current = v === "on";
      if (v === "on") startPad();
      else stopAll();
    };

    window.addEventListener("portfolio:sound", onChange);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("portfolio:sound", onChange);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("click", onClick);
      stopAll();
    };
  }, []);
  return null;
}
