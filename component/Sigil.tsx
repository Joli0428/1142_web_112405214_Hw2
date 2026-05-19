// 大型法陣印記（封面用）
"use client";

const ORIGIN = { transformOrigin: "60px 60px" } as const;

export default function Sigil({
  size = 320,
  opacity = 0.85,
  animate = true,
}: {
  size?: number;
  opacity?: number;
  animate?: boolean;
}) {
  const outerClass = animate ? "sigil-ring-outer" : undefined;
  const dashedClass = animate ? "sigil-ring-dashed" : undefined;
  const innerClass = animate ? "sigil-ring-inner" : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className="sigil-root"
      style={{ display: "block", opacity, color: "currentColor" }}
      aria-hidden
    >
      {/* 外圈 + 八方小點：閒置時緩慢順時針 */}
      <g className={outerClass} style={ORIGIN}>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="0.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i * Math.PI) / 4;
          const x = 60 + Math.cos(a) * 56;
          const y = 60 + Math.sin(a) * 56;
          return <circle key={i} cx={x} cy={y} r={1.2} fill="currentColor" />;
        })}
      </g>

      {/* 虛線中圈：閒置時緩慢逆時針 */}
      <g className={dashedClass} style={ORIGIN}>
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="1 4"
        />
      </g>

      {/* 內圈與中心：固定不旋轉 */}
      <g className={innerClass}>
        <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="60" cy="60" r="18" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <path
          d="M 60 14 L 60 30 M 60 90 L 60 106 M 14 60 L 30 60 M 90 60 L 106 60"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <path
          d="M 60 38 L 76 60 L 60 82 L 44 60 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <circle cx="60" cy="60" r="2" fill="currentColor" />
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="0.3"
          fontFamily="EB Garamond, serif"
          fontStyle="italic"
          fill="currentColor"
          opacity="0.6"
        >
          P
        </text>
      </g>
    </svg>
  );
}
