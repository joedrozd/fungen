/**
 * Category colour palettes, shared by the SVG hero fallback and the generated
 * Open Graph cards so a page and its social preview match.
 */
export type HeroPalette = { from: string; to: string; ink: string };

export const HERO_PALETTES: Record<string, HeroPalette> = {
  outdoor: { from: "#14532d", to: "#4d7c0f", ink: "#bbf7d0" },
  creative: { from: "#7c2d12", to: "#c2410c", ink: "#fed7aa" },
  learning: { from: "#1e3a8a", to: "#1d4ed8", ink: "#bfdbfe" },
  "food-drink": { from: "#7f1d1d", to: "#b91c1c", ink: "#fecaca" },
  mindfulness: { from: "#164e63", to: "#0e7490", ink: "#a5f3fc" },
  social: { from: "#701a75", to: "#a21caf", ink: "#f5d0fe" },
  games: { from: "#312e81", to: "#4338ca", ink: "#c7d2fe" },
  "career-development": { from: "#1e293b", to: "#334155", ink: "#cbd5e1" },
  organization: { from: "#134e4a", to: "#0f766e", ink: "#99f6e4" },
  skills: { from: "#3730a3", to: "#4f46e5", ink: "#c7d2fe" },
  financial: { from: "#14532d", to: "#15803d", ink: "#bbf7d0" },
  "personal-growth": { from: "#581c87", to: "#7e22ce", ink: "#e9d5ff" },
  "home-improvement": { from: "#78350f", to: "#b45309", ink: "#fde68a" },
  "health-fitness": { from: "#831843", to: "#be185d", ink: "#fbcfe8" },
};

export const FALLBACK_PALETTE: HeroPalette = {
  from: "#334155",
  to: "#64748b",
  ink: "#e2e8f0",
};
