import { renderOg, ogSize } from "@/lib/og";

export const alt = "QORLIQ — Digital Solutions for Modern Business Growth";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "DIGITAL SERVICES", title: "Digital Solutions for Modern Business Growth" });
}
