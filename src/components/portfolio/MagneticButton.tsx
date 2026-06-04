import { useRef, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  href,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const props = {
    ref: ref as never,
    "data-magnetic": true,
    className: `inline-flex items-center justify-center transition-transform duration-300 ease-out will-change-transform ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
  };

  if (as === "a") return <a {...props} href={href}>{children}</a>;
  if (as === "div") return <div {...props}>{children}</div>;
  return <button {...props}>{children}</button>;
}
