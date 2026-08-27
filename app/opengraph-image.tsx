import { ImageResponse } from "next/og";
import { badgeSvg } from "@/lib/brand-mark";
import { siteName, tagline } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const seal = badgeSvg({ fg: "#f1eee7" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0c",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#d8d1c4",
            }}
          >
            {siteName}
          </div>
          <img width={132} height={132} alt="" src={`data:image/svg+xml;utf8,${encodeURIComponent(seal)}`} />
        </div>
        <div style={{ display: "flex", fontSize: 96, fontStyle: "italic", lineHeight: 1, color: "#f1eee7", maxWidth: 900 }}>
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
