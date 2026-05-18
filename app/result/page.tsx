"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore } from "@/store/store";
import ResultCard from "@/component/ResultCard";
import { downloadShareCard } from "@/lib/downloadShareCard";

const btnStyle = {
  border: "1px solid var(--line)",
  color: "var(--ink-mute)",
  fontSize: 13,
  letterSpacing: "0.35em",
  padding: "14px 28px",
  fontFamily: "inherit",
  background: "transparent",
  cursor: "pointer",
} as const;

export default function Result() {
  const router = useRouter();
  const psyData = usePsyStore((state) => state.psyData);
  const reset = usePsyStore((state) => state.reset);
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const winner = psyData.winner;
  const r = winner ? psyData.resultData[winner] : null;

  if (!winner || !r) {
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <div className="text-center">
          <p style={{ color: "var(--ink-mute)" }} className="mb-6">
            尚未召喚護法，請先回到起點。
          </p>
          <button type="button" onClick={() => router.push("/")} style={btnStyle}>
            回到起點
          </button>
        </div>
      </div>
    );
  }

  const sorted = Object.entries(psyData.scoreMap)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .filter(([k]) => k !== winner);
  const secondary = sorted[0] ? sorted[0][0] : null;
  const secondaryPatronus = secondary
    ? psyData.resultData[secondary]?.patronus
    : null;

  const cardData = {
    winner,
    patronus: r.patronus,
    role: r.role,
    symbol: r.symbol,
    blurb: r.blurb,
    incantation: r.incantation,
    translation: r.translation,
    secondary,
    secondaryPatronus,
  };

  function playAgain() {
    reset();
    router.push("/");
  }

  async function handleDownload() {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      await downloadShareCard(
        cardRef.current,
        `護法-${r.patronus}-${winner}.png`
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div
      className="w-full min-h-dvh flex flex-col items-center justify-center px-5 sm:px-10 py-10 sm:py-12 lg:h-dvh lg:max-h-dvh lg:py-6 lg:px-8 lg:overflow-hidden overflow-y-auto page-in"
      style={{ color: "var(--ink)" }}
    >
      <div className="w-full max-w-[600px] lg:max-w-[min(1080px,88vw)] lg:w-full mx-auto flex flex-col items-center gap-7 sm:gap-8 lg:gap-5 shrink-0">
        <ResultCard ref={cardRef} data={cardData} />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="transition-all duration-200 w-full sm:w-auto"
            style={{
              ...btnStyle,
              borderColor: "var(--accent)",
              color: downloading ? "var(--ink-faint)" : "var(--accent)",
            }}
          >
            {downloading ? "生成中…" : "下載分享卡"}
          </button>
          <button
            type="button"
            onClick={playAgain}
            className="transition-all duration-200 w-full sm:w-auto hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={btnStyle}
          >
            再召一次
          </button>
        </div>
      </div>
    </div>
  );
}
