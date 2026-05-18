// 裝飾用：橫排小菱形 + 兩側細線
"use client"

export default function Ornament({ size = 64, opacity = 0.7 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size / 4}
      viewBox="0 0 64 16"
      style={{ display: "block", opacity, color: "currentColor" }}
    >
      <line x1="0" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <path d="M 28 8 L 32 4 L 36 8 L 32 12 Z" fill="currentColor" />
      <line x1="40" y1="8" x2="64" y2="8" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}
