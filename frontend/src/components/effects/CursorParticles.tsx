import { useEffect, useRef } from "react";
import { useMode } from "@/context/ThemeContext";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  rot: number;
  rotV: number;
  sway: number;
  color: string;
};

const LEAF_COLORS = ["#4a7a5a", "#6b8f5e", "#8a7a4a", "#a0704a", "#5c6b45"];

/**
 * Site-wide cursor effect. Batman: golden ember/smoke wisps.
 * Nepal: small leaves that drift downward with a gentle sway.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function CursorParticles() {
  const { mode } = useMode();
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const last = useRef({ x: -1, y: -1 });
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const enabled = !mobile && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (last.current.x < 0) {
        last.current = { x, y };
        return;
      }
      const speed = Math.hypot(x - last.current.x, y - last.current.y);
      const isBat = modeRef.current === "batman";
      const spawn = Math.min(isBat ? Math.floor(speed / 3) + 1 : Math.floor(speed / 14), isBat ? 5 : 2);

      for (let i = 0; i < spawn; i++) {
        if (isBat) {
          particles.current.push({
            x, y,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 - 0.4,
            life: 1,
            size: Math.random() * 5 + 7,
            rot: 0, rotV: 0, sway: 0,
            color: "ember",
          });
        } else {
          particles.current.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.6,
            vy: 0.5 + Math.random() * 0.7,
            life: 1,
            size: Math.random() * 4 + 4,
            rot: Math.random() * Math.PI * 2,
            rotV: (Math.random() - 0.5) * 0.06,
            sway: Math.random() * Math.PI * 2,
            color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
          });
        }
      }
      // cap total particles
      if (particles.current.length > 260) {
        particles.current.splice(0, particles.current.length - 260);
      }
      last.current = { x, y };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const isBat = modeRef.current === "batman";
      ctx.globalCompositeOperation = isBat ? "screen" : "source-over";

      for (const p of particles.current) {
        if (p.color === "ember") {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.life -= 0.016;
          const size = p.size * (1 + (1 - p.life));
          const alpha = Math.max(0, p.life) * 0.35;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
          g.addColorStop(0, `rgba(245, 197, 24, ${alpha})`);
          g.addColorStop(0.5, `rgba(214, 158, 20, ${alpha * 0.3})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // leaf: drift down with horizontal sway
          p.sway += 0.04;
          p.x += p.vx + Math.sin(p.sway + t) * 0.5;
          p.y += p.vy;
          p.rot += p.rotV;
          p.life -= 0.008;
          const alpha = Math.min(1, Math.max(0, p.life)) * 0.6;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          // simple leaf: two arcs meeting at points
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.9, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.9, 0, 0, -p.size);
          ctx.fill();
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }
      particles.current = particles.current.filter((p) => p.life > 0 && p.y < h + 20);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45]"
      style={{ filter: mode === "batman" ? "blur(6px)" : "none" }}
      aria-hidden="true"
    />
  );
}
