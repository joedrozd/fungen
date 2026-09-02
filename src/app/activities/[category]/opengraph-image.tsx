import { ImageResponse } from "next/og";
import { getAllCategories, getCategory } from "@/lib/activities";
import { HERO_PALETTES, FALLBACK_PALETTE } from "@/lib/heroPalettes";

export const alt = "Activity category on fungen.app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

type Props = { params: Promise<{ category: string }> };

export default async function Image({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  const palette = HERO_PALETTES[slug] ?? FALLBACK_PALETTE;
  const name = category?.name ?? "Activities";
  const count = category?.activities.length ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: palette.ink, letterSpacing: 2 }}>
          {category?.kind === "productive" ? "PRODUCTIVE" : "LEISURE"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>
            {name}
          </div>
          {count > 0 && (
            <div style={{ display: "flex", fontSize: 38, color: palette.ink, marginTop: 16 }}>
              {count} activities, each with a full guide
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 28, color: palette.ink }}>fungen.app</div>
      </div>
    ),
    size
  );
}
