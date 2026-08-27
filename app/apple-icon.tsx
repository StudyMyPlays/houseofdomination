import { ImageResponse } from "next/og";
import { badgeSvg } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // 180px is enough room for the full seal, type ring included.
  const seal = badgeSvg({ fg: "#f1eee7" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
        }}
      >
        <img width={148} height={148} alt="" src={`data:image/svg+xml;utf8,${encodeURIComponent(seal)}`} />
      </div>
    ),
    { ...size },
  );
}
