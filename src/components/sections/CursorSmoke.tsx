import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  baseSize: number;
  color: string;
};

export function CursorSmoke() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const hue = useRef(210); // Start with a nice blue

  useEffect(() => {
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

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const speed = Math.hypot(clientX - mouse.current.lastX, clientY - mouse.current.lastY);
      
      // Update mouse pos
      mouse.current.x = clientX;
      mouse.current.y = clientY;
      
      // Spawn particles based on speed
      const spawnCount = Math.min(Math.floor(speed / 2) + 1, 8);
      
      for (let i = 0; i < spawnCount; i++) {
        particles.current.push({
          x: clientX,
          y: clientY,
          // Random drift
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1.0,
          baseSize: Math.random() * 5 + 8, // Larger soft clouds
          color: `hsla(${hue.current}, 80%, 60%,`
        });
      }
      
      mouse.current.lastX = clientX;
      mouse.current.lastY = clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // 1. Clear with slight transparency for trail effect
      // Use 'destination-out' or just clear for a cleaner look
      ctx.clearRect(0, 0, w, h);
      
      // 2. Slowly rotate color
      hue.current = (hue.current + 0.5) % 360;

      // 3. Update and Draw
      // Using 'screen' makes the overlapping "smoke" bright and glowing
      ctx.globalCompositeOperation = "screen";

      particles.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012; // Controls how long the smoke stays
        
        // Physics: slow down the smoke over time (friction)
        p.vx *= 0.96;
        p.vy *= 0.96;

        const size = p.baseSize * (1 + (1 - p.life)); // Grow slightly as it fades
        const alpha = p.life * 0.4;

        // Create the soft cloud look
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `${p.color} ${alpha})`);
        gradient.addColorStop(0.5, `${p.color} ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cleanup dead particles
      particles.current = particles.current.filter((p) => p.life > 0);
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: "blur(8px)" }} // Extra blur makes it look more like smoke
    />
  );
}