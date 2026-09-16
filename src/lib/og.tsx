import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const logo = await readFile(join(process.cwd(), "public/assets/brand/qorliq-logo-white.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

/** Branded social preview card shared by every route. */
export function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
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
          color: "white",
          backgroundImage: "linear-gradient(120deg, #050835 0%, #0a1458 40%, #0b4a80 75%, #0b6f86 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="QORLIQ" width={340} height={85} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#ff5a2c", fontWeight: 700 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 40 ? 64 : 84, fontWeight: 800, lineHeight: 1, textTransform: "uppercase" }}>
            {title}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
