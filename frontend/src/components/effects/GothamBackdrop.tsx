import { useEffect, useRef } from "react";

// Deterministic starfield — same sky every visit, no hydration jitter.
const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: ((i * 761) % 1000) / 10, // percent
  y: ((i * 383) % 620) / 10,
  r: 0.6 + ((i * 13) % 10) / 9,
  o: 0.25 + ((i * 7) % 10) / 18,
  twinkle: 2.5 + ((i * 11) % 10) / 3,
}));

/**
 * Gotham atmosphere for the hero: starry night sky, the bat-signal — a dark
 * bat silhouette wrapped in a cold white-blue halo with a searchlight beam
 * rising from the skyline — and building silhouettes along the bottom.
 * The signal fades as the user scrolls into the page.
 */
/** The bat emblem, drawn once and shared by the signal and the diving bat. */
const BAT_PATH =
  "M4 38 C 26 18, 56 10, 86 14 L 91 15 L 94 3 L 98 12 L 102 12 L 106 3 L 109 15 " +
  "L 114 14 C 144 10, 174 18, 196 38 C 168 34, 150 40, 148 52 C 140 44, 122 46, 116 58 " +
  "C 110 50, 104 52, 100 66 C 96 52, 90 50, 84 58 C 78 46, 60 44, 52 52 C 50 40, 32 34, 4 38 Z";

/** Samples along the bat's tapered smoke trail. */
const TRAIL_SAMPLES = 26;

export function GothamBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const signalSvgRef = useRef<SVGSVGElement>(null);
  const batRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!signalRef.current) return;
        const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.9));
        signalRef.current.style.opacity = String(fade);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /**
   * The bat dives out of the signal and escorts the reader down the entire
   * page: a slow serpentine glide, weaving left↔right across the viewport
   * and drifting downward, until it settles on the chat button in the corner
   * and fades out. A gold wisp trails behind so the dark silhouette stays
   * legible against the night.
   *
   * The whole flight is a pure function of scrollY, so scrolling back up
   * flies it home to the signal along the same path.
   */
  useEffect(() => {
    const root = rootRef.current;
    const svg = signalSvgRef.current;
    const bat = batRef.current;
    if (!root || !svg || !bat) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let chatBtn: Element | null = null;
    let startX = 0;
    let startY = 0;
    let startW = 0;

    /**
     * Perch point: where the emblem rests inside the signal, as a viewport
     * position at scroll 0. The SVG uses preserveAspectRatio="xMidYMin meet"
     * over an 800×900 viewBox. It is frozen rather than tracked live — if it
     * followed the signal it would drag the bat up off-screen as the hero
     * scrolls away, instead of letting it fly its own path.
     */
    const measure = () => {
      const svgRect = svg.getBoundingClientRect();
      if (!svgRect.width) return;
      const s = Math.min(svgRect.width / 800, svgRect.height / 900);
      const offX = (svgRect.width - 800 * s) / 2;
      startX = svgRect.left + offX + 400 * s;
      startY = svgRect.top + window.scrollY + 240 * s;
      startW = 196 * 1.38 * s;
    };

    const apply = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // The flight spans the whole document: perch at the top, chat button
      // at the very bottom.
      const range = Math.max(1, document.documentElement.scrollHeight - vh);
      if (!startW) return;

      const t = reduced ? 0 : Math.min(1, Math.max(0, window.scrollY / range));

      // Land on the chat button (fixed to the viewport corner).
      if (!chatBtn?.isConnected) chatBtn = document.querySelector('button[aria-label="Open chat"]');
      const target = chatBtn?.getBoundingClientRect();
      const endX = target ? target.left + target.width / 2 : vw - 52;
      const endY = target ? target.top + target.height / 2 : vh - 52;

      // One full left→right→left sweep roughly every 5.2 viewports of scroll,
      // so the cadence feels the same on a phone as on a desktop. Fewer,
      // longer crossings mean each one carries more of the descent, giving
      // the flight a steeper slope instead of skating back and forth.
      const cycles = Math.max(1.2, range / (vh * 5.2));

      // The sweep is centred on the screen and reaches almost to both edges,
      // so the bat genuinely crosses the full width each pass.
      const margin = vw < 640 ? 38 : 64;
      const xCenter = vw / 2;
      const xAmp = Math.max(60, vw / 2 - margin);
      // Phase picked so the flight begins exactly on the perch and the first
      // move is to the LEFT (cos is descending for phase ∈ (0, π)).
      const phi = Math.acos(Math.min(0.95, Math.max(-0.95, (startX - xCenter) / xAmp)));

      // Descent is strictly monotonic — the bat never climbs. `k` scallops
      // the rate: steepest through the middle of a crossing, easing off at
      // each edge so the bat arcs around the turn in a rounded U instead of
      // dropping hardest right at the reversal, which cusps it into a V.
      const k = 0.6;
      const omega = 4 * Math.PI * cycles;
      const sin2phi = Math.sin(2 * phi);
      const gNorm = 1 + (k * (Math.sin(omega + 2 * phi) - sin2phi)) / omega;
      const drop = endY - startY;

      /** Position along the serpentine flight at u ∈ [0,1]. */
      const pathAt = (u: number) => {
        const c = Math.min(1, Math.max(0, u));
        const phase = 2 * Math.PI * cycles * c + phi;
        const g = (c + (k * (Math.sin(2 * phase) - sin2phi)) / omega) / gNorm;
        const y = startY + drop * g;
        // Ease onto the chat button over the last stretch of the page. The
        // sweep is damped out first — blending straight to the corner while
        // it was still swinging kinked the path into a little hook.
        const l = Math.min(1, Math.max(0, (c - 0.76) / 0.24));
        const land = l * l * (3 - 2 * l);
        const x = xCenter + xAmp * (1 - land) * Math.cos(phase);
        return { x: x + (endX - x) * land, y: y + (endY - y) * land };
      };

      const pos = pathAt(t);
      const ahead = pathAt(Math.min(1, t + 0.0015));
      const dx = ahead.x - pos.x;
      const dy = ahead.y - pos.y;
      const len = Math.hypot(dx, dy) || 1;
      // bank into the turn; eased in so it sits level while still perched
      const bank = (dx / len) * 26 * Math.min(1, t * 12);

      // fade out as it settles onto the button at the end of the page
      const fade = t < 0.93 ? 1 : Math.max(0, 1 - (t - 0.93) / 0.07);

      bat.style.width = `${startW * (1 - 0.55 * Math.min(1, t * 2.2))}px`;
      bat.style.opacity = String(fade);
      bat.style.transform =
        `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${bank}deg)`;
      // faint gold rim once it leaves the light, so it reads against the city
      bat.style.filter =
        t > 0.02
          ? `drop-shadow(0 0 6px rgba(245, 197, 24, ${(0.55 * Math.min(1, t * 6)).toFixed(3)}))`
          : "none";

      // Trail: a single ribbon hugging the flight path just behind the bat,
      // tapering to nothing at its tail. Drawn as one filled shape rather
      // than stacked strokes — overlapping translucent segments would bead
      // up at every joint. Spanning a fixed on-screen distance keeps it
      // consistent even though the bat's speed varies through the weave.
      const trail = trailRef.current;
      if (!trail) return;
      if (t <= 0.008 || fade === 0) {
        trail.setAttribute("fill-opacity", "0");
        return;
      }
      // Length is derived from the flight's average speed, not the speed at
      // this instant: the bat almost stops at each turn, and an instantaneous
      // figure would balloon the trail across the whole screen there.
      const avgSpeed = Math.max(1, 4 * xAmp * cycles + Math.abs(drop));
      const tailSpan = Math.min(0.06, Math.min(340, vw * 0.3) / avgSpeed);
      const maxHalf = 3;
      const left: string[] = [];
      const right: string[] = [];
      for (let i = 0; i <= TRAIL_SAMPLES; i++) {
        const u = t - tailSpan * (1 - i / TRAIL_SAMPLES);
        const a = pathAt(u);
        const b = pathAt(u + 0.0008);
        const l = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = -(b.y - a.y) / l;
        const ny = (b.x - a.x) / l;
        const h = maxHalf * Math.pow(i / TRAIL_SAMPLES, 1.25);
        left.push(`${(a.x + nx * h).toFixed(1)} ${(a.y + ny * h).toFixed(1)}`);
        right.push(`${(a.x - nx * h).toFixed(1)} ${(a.y - ny * h).toFixed(1)}`);
      }
      trail.setAttribute("d", `M ${left.join(" L ")} L ${right.reverse().join(" L ")} Z`);
      trail.setAttribute("fill-opacity", (0.62 * fade * Math.min(1, t * 8)).toFixed(3));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Starfield */}
      <svg className="absolute inset-0 w-full h-[70%]" preserveAspectRatio="none" viewBox="0 0 100 62">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r * 0.08}
            fill="#dfe6f0"
            opacity={s.o}
            style={{
              animation: `star-twinkle ${s.twinkle}s ease-in-out ${i % 5}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Bat-signal: searchlight beam from the skyline up to the emblem
          projected on the clouds — modeled on the film shot: a hot white
          disc of light, streaky lit haze radiating outward, crisp dark bat */}
      {/* On phones the signal is smaller and horizontally centred, sitting
          above the name block; from sm up it moves to the right of it. */}
      <div
        ref={signalRef}
        className="absolute left-1/2 -translate-x-1/2 top-[4vh] w-[78vw] h-[70vh] sm:left-auto sm:translate-x-0 sm:right-0 sm:top-0 sm:w-[70vw] sm:h-[92vh] md:w-[62vw] max-w-[820px]"
        style={{ transition: "opacity 0.15s linear" }}
      >
        <svg
          ref={signalSvgRef}
          viewBox="0 0 800 900"
          className="w-full h-full"
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            {/* projected disc: hot core, fast falloff, wide cold haze */}
            <radialGradient id="signal-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f4f8fd" stopOpacity="0.95" />
              <stop offset="12%" stopColor="#e4edf7" stopOpacity="0.8" />
              <stop offset="24%" stopColor="#c2d4e8" stopOpacity="0.4" />
              <stop offset="42%" stopColor="#93aac6" stopOpacity="0.16" />
              <stop offset="68%" stopColor="#647d9a" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#647d9a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="signal-beam-outer" x1="0.7" y1="1" x2="0.42" y2="0">
              <stop offset="0%" stopColor="#c9d9ea" stopOpacity="0" />
              <stop offset="30%" stopColor="#c9d9ea" stopOpacity="0.07" />
              <stop offset="80%" stopColor="#dbe7f4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e8f0fa" stopOpacity="0.26" />
            </linearGradient>
            <linearGradient id="signal-beam-core" x1="0.7" y1="1" x2="0.42" y2="0">
              <stop offset="0%" stopColor="#d8e4f2" stopOpacity="0.02" />
              <stop offset="55%" stopColor="#e6eef8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f2f7fc" stopOpacity="0.4" />
            </linearGradient>
            <filter id="signal-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="ray-blur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="cloud-blur" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
          </defs>

          {/* searchlight cone — soft outer spread + brighter narrow core */}
          <polygon
            points="548,900 612,900 480,306 322,258"
            fill="url(#signal-beam-outer)"
            filter="url(#ray-blur)"
          />
          <polygon
            points="568,900 592,900 452,296 366,268"
            fill="url(#signal-beam-core)"
            filter="url(#signal-blur)"
          />

          {/* streaks of lit haze radiating from the disc, like light raking
              across cloud layers */}
          <g filter="url(#ray-blur)">
            {[
              { a: -8, len: 380, ht: 26, o: 0.1 },
              { a: 12, len: 330, ht: 20, o: 0.09 },
              { a: 178, len: 400, ht: 30, o: 0.11 },
              { a: 158, len: 300, ht: 18, o: 0.08 },
              { a: -35, len: 260, ht: 16, o: 0.07 },
              { a: 205, len: 280, ht: 20, o: 0.08 },
              { a: 95, len: 220, ht: 16, o: 0.05 },
            ].map((r, i) => (
              <rect
                key={i}
                x="400"
                y={240 - r.ht / 2}
                width={r.len}
                height={r.ht}
                rx={r.ht / 2}
                fill="#cfdcec"
                opacity={r.o}
                transform={`rotate(${r.a} 400 240)`}
              />
            ))}
          </g>

          {/* cloud bands drifting through the light */}
          <ellipse cx="230" cy="270" rx="210" ry="30" fill="#9db4cd" opacity="0.1" filter="url(#cloud-blur)" />
          <ellipse cx="600" cy="190" rx="210" ry="26" fill="#9db4cd" opacity="0.09" filter="url(#cloud-blur)" />
          <ellipse cx="430" cy="150" rx="180" ry="24" fill="#aabfd6" opacity="0.08" filter="url(#cloud-blur)" />
          <ellipse cx="420" cy="390" rx="250" ry="34" fill="#8ba3bf" opacity="0.07" filter="url(#cloud-blur)" />

          {/* the projected disc */}
          <circle cx="400" cy="240" r="250" fill="url(#signal-halo)" />
          {/* hot center */}
          <circle cx="400" cy="240" r="108" fill="#f6fafd" opacity="0.7" filter="url(#signal-blur)" />

          {/* the emblem itself is rendered outside this group — see the
              diving bat below, which starts life right here in the light */}
        </svg>
      </div>

      {/* Tall derelict towers rising up both sides — slightly lighter than
          the sky so they read as structures, jagged broken parapets, a dead
          construction crane, a handful of windows still faintly lit */}
      <svg
        viewBox="0 0 1440 580"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[58vh]"
        aria-hidden="true"
      >
        {/* left cluster */}
        <g fill="#0e0e18">
          <path d="M30 580 L30 130 L48 130 L48 112 L58 112 L58 130 L86 130 L86 122 L104 122 L104 138 L130 138 L130 580 Z" />
          <rect x="73" y="52" width="3" height="62" />
          <path d="M150 580 L150 240 L172 240 L172 222 L214 222 L214 240 L250 240 L250 580 Z" />
          <path d="M262 580 L262 350 L280 336 L300 350 L318 342 L318 580 Z" />
          <path d="M380 580 L380 466 L410 458 L444 466 L468 462 L468 580 Z" />
        </g>
        {/* right cluster — backlit by the beam base */}
        <g fill="#0f0f1a">
          <path d="M1130 580 L1130 108 L1152 108 L1160 84 L1185 62 L1210 84 L1218 108 L1240 108 L1240 580 Z" />
          <rect x="1183" y="26" width="3" height="42" />
          <path d="M1260 580 L1260 232 L1290 218 L1322 236 L1348 226 L1360 238 L1360 580 Z" />
          <path d="M1380 580 L1380 330 L1402 322 L1428 332 L1440 328 L1440 580 Z" />
          <path d="M1020 580 L1020 292 L1044 284 L1076 292 L1108 288 L1108 580 Z" />
          {/* abandoned crane above the unfinished tower */}
          <rect x="1058" y="168" width="4" height="120" />
          <rect x="1006" y="168" width="176" height="4" />
          <rect x="1176" y="172" width="3" height="26" />
          <path d="M1060 168 L1010 190 L1014 192 L1062 174 Z" />
          <path d="M1060 168 L1120 190 L1116 193 L1058 174 Z" />
        </g>
        {/* a few windows still burning */}
        <g fill="#f5c518">
          <rect x="60" y="180" width="5" height="8" opacity="0.1" />
          <rect x="96" y="256" width="5" height="8" opacity="0.07" />
          <rect x="185" y="300" width="5" height="8" opacity="0.12" />
          <rect x="222" y="382" width="5" height="8" opacity="0.06" />
          <rect x="1160" y="170" width="5" height="8" opacity="0.14" />
          <rect x="1196" y="238" width="5" height="8" opacity="0.08" />
          <rect x="1290" y="300" width="5" height="8" opacity="0.1" />
          <rect x="1318" y="410" width="5" height="8" opacity="0.06" />
          <rect x="1052" y="360" width="5" height="8" opacity="0.09" />
          <rect x="1398" y="392" width="5" height="8" opacity="0.07" />
        </g>
      </svg>

      {/* Skyline — two depths of building silhouettes */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[26vh] opacity-60"
        fill="#08080f"
      >
        <path d="M0 220 L0 150 L40 150 L40 110 L70 110 L70 160 L120 160 L120 90 L128 90 L128 70 L150 70 L150 90 L160 90 L160 160 L210 160 L210 120 L260 120 L260 170 L310 170 L310 100 L318 84 L326 100 L326 170 L380 170 L380 130 L430 130 L430 150 L480 150 L480 80 L490 80 L490 60 L512 60 L512 80 L522 80 L522 150 L580 150 L580 110 L640 110 L640 170 L700 170 L700 90 L710 74 L720 90 L720 170 L770 170 L770 140 L830 140 L830 160 L890 160 L890 100 L940 100 L940 170 L1000 170 L1000 120 L1010 104 L1020 120 L1020 170 L1080 170 L1080 130 L1140 130 L1140 150 L1200 150 L1200 90 L1210 90 L1210 70 L1230 70 L1230 90 L1240 90 L1240 160 L1300 160 L1300 120 L1360 120 L1360 170 L1440 170 L1440 220 Z" />
      </svg>
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[17vh] opacity-90"
        fill="#050509"
      >
        <path d="M0 160 L0 90 L60 90 L60 60 L110 60 L110 110 L180 110 L180 40 L192 40 L192 24 L212 24 L212 40 L224 40 L224 110 L300 110 L300 70 L370 70 L370 120 L450 120 L450 50 L462 34 L474 50 L474 120 L560 120 L560 80 L640 80 L640 110 L730 110 L730 30 L742 30 L742 14 L762 14 L762 30 L774 30 L774 110 L860 110 L860 70 L950 70 L950 120 L1040 120 L1040 60 L1052 44 L1064 60 L1064 120 L1160 120 L1160 90 L1250 90 L1250 110 L1340 110 L1340 50 L1352 50 L1352 34 L1372 34 L1372 50 L1384 50 L1384 110 L1440 110 L1440 160 Z" />
      </svg>

      {/* Ground fog */}
      <div
        className="absolute bottom-0 left-0 w-full h-[12vh]"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(10,10,15,0.9))",
        }}
      />

      {/* The bat's flight. Both layers are fixed to the viewport so the glide
          can finish on the chat button in the corner; z-40 keeps them under
          the button itself, which the bat lands behind. */}
      <svg
        className="fixed inset-0 w-screen h-screen z-[6] pointer-events-none"
        style={{ filter: "drop-shadow(0 0 4px rgba(245, 197, 24, 0.35))" }}
      >
        <path ref={trailRef} fill="#f5c518" fillOpacity="0" />
      </svg>

      <div
        ref={batRef}
        className="fixed left-0 top-0 z-[6] will-change-transform"
        style={{ width: 0 }}
      >
        <svg viewBox="0 0 200 70" className="w-full h-auto block">
          <path d={BAT_PATH} fill="#0a0a12" />
        </svg>
      </div>
    </div>
  );
}
