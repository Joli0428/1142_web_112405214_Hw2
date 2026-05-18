// 結果卡四角的 L 型小裝飾
"use client"

export default function CornerOrnament({
  corner = "tl",
  size = 36,
}: {
  corner?: "tl" | "tr" | "bl" | "br";
  size?: number;
}) {
  const flip = { tl: "", tr: "scaleX(-1)", bl: "scaleY(-1)", br: "scale(-1,-1)" }[corner];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      style={{ transform: flip, color: "currentColor", opacity: 0.55 }}
    >
      <path d="M 4 14 L 4 4 L 14 4" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
      <path d="M 8 4 L 12 4" stroke="currentColor" strokeWidth="0.4" />
      <path d="M 4 8 L 4 12" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}
