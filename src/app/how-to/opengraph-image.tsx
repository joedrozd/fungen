import { ImageResponse } from "next/og";

export const alt = "Fungen DIY and home how-to guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        color: "#fffdf7",
        background: "linear-gradient(130deg, #172b23, #345a3d)",
      }}>
        <div style={{ display: "flex", fontSize: 27, letterSpacing: 3 }}>FUNGEN / HOW-TO</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, lineHeight: 1.06 }}>
          <div>DIY &amp; home</div>
          <div style={{ color: "#ffdbad" }}>how-to guides</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#e2eee0" }}>activitygenerator.co.uk</div>
      </div>
    ),
    size,
  );
}
