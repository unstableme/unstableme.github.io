import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TempleSvg } from "./TempleSvg";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const FLAG_COLORS = ["#3B82B6", "#e8e4d8", "#C0392B", "#27AE60", "#F1C40F"];

/** A string of prayer flags following a gentle catenary between two points. */
function PrayerFlagLine({
  x1,
  y1,
  x2,
  y2,
  sag = 14,
  count = 9,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sag?: number;
  count?: number;
}) {
  const flags = [];
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * sag;
    flags.push(
      <rect
        key={i}
        x={x - 3}
        y={y}
        width="6"
        height="8"
        fill={FLAG_COLORS[i % FLAG_COLORS.length]}
        style={{
          animation: `flag-flutter ${2.2 + (i % 3) * 0.5}s ease-in-out infinite`,
          transformOrigin: `${x}px ${y}px`,
        }}
      />
    );
  }
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + sag * 1.6;
  return (
    <g>
      <path
        d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
        stroke="#4a4438"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      {flags}
    </g>
  );
}

/**
 * Layered Himalayan panorama for the Nepal-mode hero.
 * 5 layers, far → near, each translating at a different rate on scroll.
 */
export function MountainParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Far layers barely move; near layers move the most (classic parallax).
  const yFar = useTransform(scrollY, [0, 1000], [0, reduced ? 0 : 40]);
  const yMid1 = useTransform(scrollY, [0, 1000], [0, reduced ? 0 : 100]);
  const yMid2 = useTransform(scrollY, [0, 1000], [0, reduced ? 0 : 170]);
  const yNear = useTransform(scrollY, [0, 1000], [0, reduced ? 0 : 260]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Sky: soft blue at top fading to parchment at mountain line */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #d4e4ec 0%, #e3e6dd 45%, #f0ebe0 72%)",
        }}
      />
      {/* Warm sun glow */}
      <div
        className="absolute top-[8%] left-[18%] w-[360px] h-[360px] max-w-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,196,79,0.28) 0%, rgba(241,196,79,0.08) 45%, transparent 70%)",
        }}
      />

      {/* L1 — far snow-capped peaks */}
      <motion.svg
        style={{ y: yFar }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute bottom-[15vh] left-0 w-full h-[25vh] sm:bottom-[18vh] sm:h-[46vh]"
      >
        <path
          fill="#aebfca"
          d="M0 400 L0 260 L140 150 L230 220 L340 90 L430 180 L520 120 L640 240 L760 60 L880 200 L980 130 L1100 230 L1220 110 L1330 210 L1440 160 L1440 400 Z"
        />
        {/* snow caps */}
        <path fill="#f4f7f8" d="M340 90 L300 138 L322 130 L340 146 L362 126 L382 140 Z" />
        <path fill="#f4f7f8" d="M760 60 L716 116 L740 106 L760 124 L782 102 L806 118 Z" />
        <path fill="#f4f7f8" d="M1220 110 L1184 156 L1204 148 L1220 162 L1240 144 L1258 156 Z" />
        <path fill="#f4f7f8" d="M140 150 L112 184 L128 178 L140 190 L154 176 L170 186 Z" />
        <path fill="#f4f7f8" d="M980 130 L952 164 L968 158 L980 170 L994 156 L1010 166 Z" />
      </motion.svg>

      {/* L2 — high sage ridge */}
      <motion.svg
        style={{ y: yMid1 }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="absolute bottom-[8vh] left-0 w-full h-[20vh] sm:bottom-[10vh] sm:h-[36vh]"
      >
        <path
          fill="#8fa88f"
          d="M0 300 L0 190 L120 130 L260 200 L400 110 L540 190 L680 130 L820 210 L960 120 L1120 200 L1260 140 L1380 190 L1440 170 L1440 300 Z"
        />
      </motion.svg>

      {/* L3 — mid forest ridge */}
      <motion.svg
        style={{ y: yMid2 }}
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="absolute bottom-[3vh] left-0 w-full h-[17vh] sm:bottom-[4vh] sm:h-[30vh]"
      >
        <path
          fill="#5c7a5c"
          d="M0 260 L0 160 L160 110 L320 180 L470 100 L620 170 L780 110 L940 180 L1100 110 L1250 170 L1380 130 L1440 150 L1440 260 Z"
        />
      </motion.svg>

      {/* L4 — near dark ridge with temples, trees and prayer flags */}
      <motion.div
        style={{ y: yNear }}
        className="absolute bottom-0 left-0 w-full h-[19vh] sm:h-[30vh]"
      >
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path
            fill="#2f4f3e"
            d="M0 240 L0 130 L180 90 L360 140 L560 80 L760 140 L960 90 L1160 150 L1320 100 L1440 130 L1440 240 Z"
          />
          {/* scattered pine silhouettes */}
          {[90, 250, 420, 660, 840, 1050, 1240, 1390].map((x, i) => {
            const base = [116, 108, 112, 106, 112, 108, 122, 118][i];
            return (
              <g key={x} fill="#243d30">
                <path d={`M${x} ${base - 34} L${x + 10} ${base - 10} L${x + 4} ${base - 10} L${x + 13} ${base + 6} L${x - 13} ${base + 6} L${x - 4} ${base - 10} L${x - 10} ${base - 10} Z`} />
                <rect x={x - 1.5} y={base + 6} width="3" height="7" />
              </g>
            );
          })}
        </svg>

        {/* Temples standing on the ridge (positioned in % of scene width) */}
        <div className="absolute bottom-[34%] left-[12%] text-[#243d30]">
          <TempleSvg tiers={5} className="w-16 md:w-24 h-auto" />
        </div>
        <div className="absolute bottom-[30%] left-[46%] text-[#243d30] hidden sm:block">
          <TempleSvg tiers={3} className="w-10 md:w-14 h-auto" />
        </div>
        <div className="absolute bottom-[28%] right-[14%] text-[#243d30]">
          <TempleSvg tiers={4} className="w-12 md:w-20 h-auto" />
        </div>

        {/* Prayer flag lines strung between the temple spires */}
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full hidden sm:block"
        >
          <PrayerFlagLine x1={205} y1={40} x2={678} y2={72} sag={22} count={12} />
          <PrayerFlagLine x1={690} y1={72} x2={1218} y2={58} sag={24} count={13} />
        </svg>
      </motion.div>
    </div>
  );
}
