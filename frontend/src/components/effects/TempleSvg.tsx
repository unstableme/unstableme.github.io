/**
 * Nyatapola-style pagoda temple silhouette — stepped plinth, tiered roofs
 * with upturned eaves, spire on top. Pure silhouette, fills currentColor.
 */
export function TempleSvg({
  tiers = 5,
  className,
}: {
  tiers?: 3 | 4 | 5;
  className?: string;
}) {
  // Pre-drawn variants keep the curves hand-tuned rather than generated.
  if (tiers === 3) {
    return (
      <svg viewBox="0 0 120 140" className={className} fill="currentColor" aria-hidden="true">
        {/* spire */}
        <path d="M58 6 L62 6 L63 18 L57 18 Z" />
        <circle cx="60" cy="5" r="3" />
        {/* roofs — eaves curve upward at the tips */}
        <path d="M60 16 L92 40 Q95 42 97 38 L97 44 L23 44 L23 38 Q25 42 28 40 Z" />
        <path d="M34 44 L34 52 L86 52 L86 44 Z" />
        <path d="M60 46 L102 74 Q106 76 108 72 L108 78 L12 78 L12 72 Q14 76 18 74 Z" />
        <path d="M28 78 L28 88 L92 88 L92 78 Z" />
        <path d="M60 80 L112 110 Q116 112 118 108 L118 114 L2 114 L2 108 Q4 112 8 110 Z" />
        {/* base walls + plinth */}
        <path d="M22 114 L22 128 L98 128 L98 114 Z" />
        <path d="M10 128 L110 128 L110 140 L10 140 Z" />
      </svg>
    );
  }
  if (tiers === 4) {
    return (
      <svg viewBox="0 0 130 170" className={className} fill="currentColor" aria-hidden="true">
        <path d="M63 6 L67 6 L68 18 L62 18 Z" />
        <circle cx="65" cy="5" r="3" />
        <path d="M65 16 L92 36 Q95 38 97 34 L97 40 L33 40 L33 34 Q35 38 38 36 Z" />
        <path d="M42 40 L42 48 L88 48 L88 40 Z" />
        <path d="M65 42 L100 66 Q104 68 106 64 L106 70 L24 70 L24 64 Q26 68 30 66 Z" />
        <path d="M36 70 L36 79 L94 79 L94 70 Z" />
        <path d="M65 72 L108 98 Q112 100 114 96 L114 102 L16 102 L16 96 Q18 100 22 98 Z" />
        <path d="M30 102 L30 112 L100 112 L100 102 Z" />
        <path d="M65 104 L118 134 Q122 136 124 132 L124 138 L6 138 L6 132 Q8 136 12 134 Z" />
        <path d="M24 138 L24 152 L106 152 L106 138 Z" />
        <path d="M12 152 L118 152 L118 170 L12 170 Z" />
      </svg>
    );
  }
  // 5 tiers — Nyatapola proper
  return (
    <svg viewBox="0 0 140 210" className={className} fill="currentColor" aria-hidden="true">
      <path d="M68 8 L72 8 L73 20 L67 20 Z" />
      <circle cx="70" cy="6" r="3.5" />
      <path d="M70 18 L94 36 Q97 38 99 34 L99 40 L41 40 L41 34 Q43 38 46 36 Z" />
      <path d="M49 40 L49 48 L91 48 L91 40 Z" />
      <path d="M70 42 L102 64 Q106 66 108 62 L108 68 L32 68 L32 62 Q34 66 38 64 Z" />
      <path d="M43 68 L43 77 L97 77 L97 68 Z" />
      <path d="M70 70 L110 94 Q114 96 116 92 L116 98 L24 98 L24 92 Q26 96 30 94 Z" />
      <path d="M37 98 L37 108 L103 108 L103 98 Z" />
      <path d="M70 100 L118 126 Q122 128 124 124 L124 130 L16 130 L16 124 Q18 128 22 126 Z" />
      <path d="M31 130 L31 141 L109 141 L109 130 Z" />
      <path d="M70 132 L128 162 Q132 164 134 160 L134 166 L6 166 L6 160 Q8 164 12 162 Z" />
      <path d="M25 166 L25 182 L115 182 L115 166 Z" />
      {/* stepped plinth */}
      <path d="M16 182 L124 182 L124 192 L16 192 Z" />
      <path d="M6 192 L134 192 L134 202 L6 202 Z" />
      <path d="M0 202 L140 202 L140 210 L0 210 Z" />
    </svg>
  );
}
