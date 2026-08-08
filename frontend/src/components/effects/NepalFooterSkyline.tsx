const FLAG_COLORS = ["#3B82B6", "#e8e4d8", "#C0392B", "#27AE60", "#F1C40F"];

/** Prayer flags hanging along a gentle catenary between two anchor points. */
function FlagLine({
  x1,
  y1,
  x2,
  y2,
  sag = 16,
  count = 10,
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
        x={x - 2.5}
        y={y}
        width="5"
        height="7"
        fill={FLAG_COLORS[i % FLAG_COLORS.length]}
        opacity="0.85"
      />
    );
  }
  return (
    <g>
      <path
        d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 1.7} ${x2} ${y2}`}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.55"
      />
      {flags}
    </g>
  );
}

/** Boudhanath-style stupa: dome, harmika with eyes, 13-tier spire, umbrella. */
function Stupa({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* umbrella / finial */}
      <path d="M0 -104 L3 -96 L-3 -96 Z" />
      <path d="M-11 -95 L11 -95 L7 -88 L-7 -88 Z" />
      {/* 13 tapering tiers */}
      {Array.from({ length: 13 }, (_, i) => {
        const w = 7 + i * 1.25;
        return <rect key={i} x={-w} y={-88 + i * 4} width={w * 2} height="3.1" />;
      })}
      {/* harmika (the eyes box) */}
      <rect x="-19" y="-38" width="38" height="17" />
      {/* dome */}
      <path d="M-40 0 A 40 34 0 0 1 40 0 Z" />
      {/* stepped plinth */}
      <rect x="-49" y="0" width="98" height="8" />
      <rect x="-58" y="8" width="116" height="8" />
      <rect x="-66" y="16" width="132" height="9" />
    </g>
  );
}

/** Nyatapola-style multi-tiered pagoda temple. */
function Pagoda({
  x,
  y,
  s = 1,
  tiers = 4,
}: {
  x: number;
  y: number;
  s?: number;
  tiers?: number;
}) {
  const roofs = [];
  for (let i = 0; i < tiers; i++) {
    const w = 22 + i * 11;
    const yy = -96 + i * 22;
    roofs.push(
      <g key={i}>
        {/* roof with eaves that flick upward at the tips */}
        <path
          d={`M0 ${yy} L${w} ${yy + 14} Q${w + 5} ${yy + 16} ${w + 7} ${yy + 11}
              L${w + 7} ${yy + 17} L${-w - 7} ${yy + 17} L${-w - 7} ${yy + 11}
              Q${-w - 5} ${yy + 16} ${-w} ${yy + 14} Z`}
        />
        {/* wall band below the roof */}
        <rect x={-w * 0.62} y={yy + 17} width={w * 1.24} height="6" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-2 -110 L2 -110 L3 -98 L-3 -98 Z" />
      <circle cx="0" cy="-112" r="2.6" />
      {roofs}
      {/* plinth steps */}
      <rect x={-22 - tiers * 6} y="-8" width={(22 + tiers * 6) * 2} height="8" />
      <rect x={-30 - tiers * 6} y="0" width={(30 + tiers * 6) * 2} height="9" />
      <rect x={-38 - tiers * 6} y="9" width={(38 + tiers * 6) * 2} height="9" />
    </g>
  );
}

/** Dharahara-style watchtower. */
function Tower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-1.5 -128 L1.5 -128 L2.5 -118 L-2.5 -118 Z" />
      <circle cx="0" cy="-130" r="2.2" />
      {/* domed cap */}
      <path d="M-9 -112 A 9 9 0 0 1 9 -112 Z" />
      {/* balcony */}
      <rect x="-13" y="-114" width="26" height="4" />
      {/* tapering shaft */}
      <path d="M-8 -110 L8 -110 L12 0 L-12 0 Z" />
      {/* base */}
      <rect x="-16" y="0" width="32" height="9" />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -46 L13 -16 L6 -16 L17 6 L-17 6 L-6 -16 L-13 -16 Z" />
      <rect x="-2" y="6" width="4" height="8" />
    </g>
  );
}

/**
 * Cultural skyline for the Nepal-mode footer: Boudhanath stupa, Nyatapola
 * pagodas, a Dharahara-style tower, trees and prayer flags — pure silhouette
 * sitting on the ground line at the bottom of the page.
 */
export function NepalFooterSkyline() {
  return (
    <div
      className="relative w-full h-[104px] sm:h-[150px] md:h-[178px] -mt-14 sm:-mt-20 md:-mt-24 text-[#2f4f3e] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* warm haze so the silhouettes sit in air rather than on a hard edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-full"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(45,106,79,0.05) 55%, rgba(45,106,79,0.12) 100%)",
        }}
      />
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
        fill="currentColor"
      >
        {/* distant, faded back row */}
        <g opacity="0.32">
          <Pagoda x={210} y={236} s={0.62} tiers={3} />
          <Pagoda x={1035} y={236} s={0.58} tiers={3} />
          <Tree x={505} y={236} s={0.7} />
          <Tree x={905} y={236} s={0.62} />
          <Tree x={1330} y={236} s={0.68} />
        </g>

        {/* prayer flags strung between the tall spires */}
        <g>
          <FlagLine x1={352} y1={130} x2={722} y2={106} sag={26} count={11} />
          <FlagLine x1={738} y1={106} x2={1188} y2={141} sag={30} count={13} />
        </g>

        {/* foreground row */}
        <Pagoda x={120} y={252} s={0.85} tiers={4} />
        <Tree x={262} y={252} s={0.85} />
        <Tower x={352} y={252} s={0.95} />
        <Pagoda x={470} y={252} s={0.7} tiers={3} />
        <Stupa x={730} y={224} s={1.15} />
        <Pagoda x={960} y={252} s={0.78} tiers={4} />
        <Tree x={1075} y={252} s={0.8} />
        <Pagoda x={1190} y={252} s={1} tiers={5} />
        <Tree x={1310} y={252} s={0.9} />
        <Tree x={1390} y={252} s={0.72} />

        {/* ground */}
        <rect x="0" y="250" width="1440" height="14" />
      </svg>
    </div>
  );
}
