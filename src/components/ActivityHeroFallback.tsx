import type { CSSProperties } from "react";
import { HERO_PALETTES, FALLBACK_PALETTE } from "@/lib/heroPalettes";

/**
 * Deterministic SVG hero for activities that have no photograph.
 *
 * Deliberately abstract rather than illustrative: a wrong or generic stock
 * photo is worse than no photo, and repeating the activity name inside the
 * image would duplicate the H1 for no benefit. The pattern is seeded from the
 * slug so a given activity always renders identically.
 */

/** Small deterministic hash so the same slug always yields the same layout. */
function hash(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Props = {
  categorySlug: string;
  activitySlug: string;
  className?: string;
  style?: CSSProperties;
};

export function ActivityHeroFallback({
  categorySlug,
  activitySlug,
  className,
  style,
}: Props) {
  const palette = HERO_PALETTES[categorySlug] ?? FALLBACK_PALETTE;
  const seed = hash(activitySlug);
  const gradientId = `hero-${categorySlug}-${activitySlug}`;

  // Seven arcs across the frame, sized and offset from the seed. Enough
  // variation that adjacent cards look distinct, little enough that the set
  // still reads as one family.
  const arcs = Array.from({ length: 7 }, (_, i) => {
    const bits = seed >> (i * 3);
    return {
      cx: 60 + ((bits & 0xff) / 255) * 1080,
      cy: 40 + (((bits >> 4) & 0xff) / 255) * 320,
      r: 40 + (((bits >> 8) & 0x3f) / 63) * 150,
      opacity: 0.06 + (((bits >> 2) & 0x7) / 7) * 0.12,
    };
  });

  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="1200" height="400" fill={`url(#${gradientId})`} />
      {arcs.map((arc, i) => (
        <circle
          key={i}
          cx={arc.cx}
          cy={arc.cy}
          r={arc.r}
          fill="none"
          stroke={palette.ink}
          strokeWidth={2 + (i % 3)}
          opacity={arc.opacity}
        />
      ))}
    </svg>
  );
}
