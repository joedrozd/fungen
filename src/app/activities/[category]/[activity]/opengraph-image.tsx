import { ImageResponse } from "next/og";
import { getActivity, getAllActivities } from "@/lib/activities";
import { HERO_PALETTES, FALLBACK_PALETTE } from "@/lib/heroPalettes";

export const alt = "One-Hour Activity Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllActivities().map(({ activity, category }) => ({
    category: category.slug,
    activity: activity.slug,
  }));
}

type Props = { params: Promise<{ category: string; activity: string }> };

export default async function Image({ params }: Props) {
  const { category: categorySlug, activity: activitySlug } = await params;
  const found = getActivity(categorySlug, activitySlug);

  const palette = HERO_PALETTES[categorySlug] ?? FALLBACK_PALETTE;
  const name = found?.activity.name ?? "One-Hour Activity";
  const categoryName = found?.category.name ?? "Activities";
  const minutes = found?.activity.meta?.timeMinutes;

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
          {categoryName.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: name.length > 46 ? 62 : 78,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          {name}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", color: palette.ink }}>fungen.app</div>
          {minutes ? (
            <div style={{ display: "flex", color: palette.ink }}>{minutes} minutes</div>
          ) : null}
        </div>
      </div>
    ),
    size
  );
}
