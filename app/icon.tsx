import { ImageResponse } from "next/og";
import { badgeSvg } from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  // At 32px the type ring is illegible, so the favicon carries the bare HD mark.
  const mark = badgeSvg({ fg: "#f1eee7", ring: false });

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
        <img width={26} height={26} alt="" src={`data:image/svg+xml;utf8,${encodeURIComponent(mark)}`} />
      </div>
    ),
    { ...size },
  );
}
