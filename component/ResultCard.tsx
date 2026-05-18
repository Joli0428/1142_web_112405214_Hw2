"use client";

import { forwardRef } from "react";
import PatronusSymbol from "@/component/PatronusSymbol";
import Ornament from "@/component/Ornament";
import CornerOrnament from "@/component/CornerOrnament";

export type ResultCardData = {
  winner: string;
  patronus: string;
  role: string;
  symbol: string;
  blurb: string;
  incantation: string;
  translation: string;
  secondary?: string | null;
  secondaryPatronus?: string | null;
};

function SymbolFrame() {
  return (
    <svg className="result-symbol-frame" viewBox="0 0 200 200" aria-hidden>
      <circle
        cx="100"
        cy="100"
        r="94"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        opacity="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.35"
      />
      <circle
        cx="100"
        cy="100"
        r="58"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
        strokeDasharray="1 4"
        opacity="0.4"
      />
      <path
        d="M 100 12 L 100 28 M 100 172 L 100 188 M 12 100 L 28 100 M 172 100 L 188 100"
        stroke="currentColor"
        strokeWidth="0.45"
        opacity="0.3"
      />
    </svg>
  );
}

function ResultSymbolStage({ winner, size }: { winner: string; size: number }) {
  return (
    <div className="result-symbol-stage">
      <SymbolFrame />
      <div
        style={{
          color: "var(--accent)",
          filter: "drop-shadow(0 0 28px rgba(212, 168, 90, 0.32))",
        }}
      >
        <PatronusSymbol
          zodiac={winner}
          size={size}
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  );
}

function ResultCardHeader() {
  return (
    <div className="result-card-header-flourish">
      <p
        className="font-serif-en italic uppercase m-0 shrink-0"
        style={{
          fontSize: "clamp(11px, 1.2vh, 13px)",
          letterSpacing: "0.45em",
          color: "var(--accent)",
        }}
      >
        <span className="lg:text-[13px] lg:tracking-[0.55em]">Patronus Revealed</span>
      </p>
    </div>
  );
}

function ZodiacLabel({ winner }: { winner: string }) {
  return (
    <p
      className="m-0 font-serif lg:text-[13px]"
      style={{
        fontSize: "clamp(12px, 1.3vh, 14px)",
        letterSpacing: "0.32em",
        color: "var(--ink-mute)",
      }}
    >
      生肖 · <span style={{ color: "var(--accent)" }}>{winner}</span> · 召出
    </p>
  );
}

function ResultQuoteBlock({ data }: { data: ResultCardData }) {
  return (
    <div
      className="w-full py-4 lg:py-0 font-serif-en italic border-t border-[var(--line)] lg:border-0 result-card-quote-panel"
      style={{ color: "var(--accent)" }}
    >
      <p
        className="font-serif-en italic m-0 mb-3 hidden lg:block"
        style={{
          fontSize: 11,
          letterSpacing: "0.35em",
          color: "var(--ink-faint)",
        }}
      >
        護法咒語
      </p>
      <div
        className="result-card-quote-latin"
        style={{
          fontSize: "clamp(16px, 2vh, 20px)",
          letterSpacing: "0.12em",
        }}
      >
        {data.incantation}
      </div>
      <div
        className="font-serif not-italic lg:mt-2.5"
        style={{
          marginTop: 8,
          fontSize: "clamp(12px, 1.3vh, 14px)",
          letterSpacing: "0.26em",
          color: "var(--ink-mute)",
        }}
      >
        {data.translation}
      </div>
    </div>
  );
}

function ResultTitleBlock({ data }: { data: ResultCardData }) {
  return (
    <>
      <h1
        className="font-serif font-bold m-0 mt-3 lg:mt-0 lg:text-[3.25rem] lg:leading-[1.06] lg:tracking-[0.12em]"
        style={{
          fontSize: "clamp(44px, 8vw, 56px)",
          letterSpacing: "0.14em",
          lineHeight: 1.08,
          color: "var(--ink)",
        }}
      >
        {data.patronus}
      </h1>
      <p
        className="font-serif m-0 lg:mt-3 lg:text-[17px] lg:leading-[1.7] lg:tracking-[0.12em] lg:pl-4 lg:border-l lg:border-[var(--accent-soft)]"
        style={{
          marginTop: "clamp(8px, 1.2vh, 10px)",
          fontSize: "clamp(13px, 1.5vh, 15px)",
          letterSpacing: "0.16em",
          color: "var(--ink-mute)",
          lineHeight: 1.6,
        }}
      >
        {data.role} · {data.symbol}
      </p>
    </>
  );
}

function ResultBlurb({ blurb, compactTop }: { blurb: string; compactTop?: boolean }) {
  return (
    <p
      className={`font-serif m-0 w-full result-card-blurb ${compactTop ? "lg:mt-0" : ""} lg:text-[18px] lg:leading-[1.95] lg:tracking-[0.05em]`}
      style={{
        marginTop: compactTop ? undefined : "clamp(14px, 2vh, 18px)",
        fontSize: "clamp(15px, 1.7vh, 17px)",
        lineHeight: 1.85,
        letterSpacing: "0.04em",
        color: "var(--ink)",
      }}
    >
      {blurb}
    </p>
  );
}

function ResultCardFooter({
  secondary,
  secondaryPatronus,
}: {
  secondary?: string | null;
  secondaryPatronus?: string | null;
}) {
  return (
    <div className="mt-6 lg:mt-8 pt-5 lg:pt-7 flex flex-col items-center gap-3 border-t border-[var(--line)]">
      <div className="result-card-footer-inner w-full flex flex-col items-center gap-3 lg:gap-0">
        {secondary ? (
          <p
            className="font-serif-en italic m-0 lg:text-[12px] lg:tracking-[0.22em]"
            style={{
              fontSize: "clamp(11px, 1.2vh, 12px)",
              letterSpacing: "0.2em",
              color: "var(--ink-faint)",
            }}
          >
            次要護法傾向 · {secondary}
            {secondaryPatronus && (
              <span style={{ color: "var(--ink-mute)" }}>
                （{secondaryPatronus}）
              </span>
            )}
          </p>
        ) : (
          <span className="hidden lg:block" aria-hidden />
        )}
        <p
          className="font-serif-en italic m-0 lg:text-[11px] lg:tracking-[0.28em]"
          style={{
            fontSize: "clamp(10px, 1.1vh, 11px)",
            letterSpacing: "0.3em",
            color: "var(--ink-faint)",
          }}
        >
          護法的形狀 · 是你靈魂在最安全時候的樣子
        </p>
      </div>
    </div>
  );
}

const ResultCard = forwardRef<HTMLDivElement, { data: ResultCardData }>(
  function ResultCard({ data }, ref) {
    return (
      <div
        ref={ref}
        data-result-card
        className="result-card w-full max-w-[560px] lg:max-w-[1080px] lg:w-[min(100%,88vw)] mx-auto relative text-center lg:py-10 lg:px-14"
        style={{
          padding: "clamp(32px, 4vh, 48px) clamp(28px, 5vw, 56px)",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          color: "var(--ink)",
          boxSizing: "border-box",
        }}
      >
        <div
          className="absolute top-3 left-3 lg:top-4 lg:left-4"
          style={{ color: "var(--accent)" }}
        >
          <CornerOrnament corner="tl" size={36} />
        </div>
        <div
          className="absolute top-3 right-3 lg:top-4 lg:right-4"
          style={{ color: "var(--accent)" }}
        >
          <CornerOrnament corner="tr" size={36} />
        </div>
        <div
          className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4"
          style={{ color: "var(--accent)" }}
        >
          <CornerOrnament corner="bl" size={36} />
        </div>
        <div
          className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4"
          style={{ color: "var(--accent)" }}
        >
          <CornerOrnament corner="br" size={36} />
        </div>

        <ResultCardHeader />

        {/* 手機：單欄垂直 */}
        <div className="mt-6 sm:mt-7 flex flex-col items-center w-full max-w-[520px] mx-auto lg:hidden">
          <div className="result-symbol-glow">
            <ResultSymbolStage winner={data.winner} size={168} />
          </div>
          <div className="mt-5" style={{ color: "var(--accent)" }}>
            <Ornament size={48} opacity={0.65} />
          </div>
          <div className="mt-5 flex flex-col items-center text-center w-full">
            <ZodiacLabel winner={data.winner} />
            <ResultTitleBlock data={data} />
            <ResultBlurb blurb={data.blurb} />
            <div className="w-full mt-6">
              <ResultQuoteBlock data={data} />
            </div>
          </div>
        </div>

        {/* 桌面：圖騰左上、標題右上、內文全寬 */}
        <div className="hidden lg:flex lg:flex-col lg:mt-8 lg:gap-7 lg:text-left">
          <div className="flex items-start gap-8">
            <div className="result-card-symbol-col shrink-0 w-[156px] flex flex-col items-center">
              <div className="result-symbol-glow result-symbol-glow--corner">
                <ResultSymbolStage winner={data.winner} size={120} />
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-1 pr-2">
              <ResultTitleBlock data={data} />
              <div className="mt-4">
                <ZodiacLabel winner={data.winner} />
              </div>
              <div className="mt-5 flex justify-start" style={{ color: "var(--accent)" }}>
                <Ornament size={40} opacity={0.5} />
              </div>
            </div>
          </div>

          <div className="w-full pr-2 flex flex-col gap-7">
            <ResultBlurb blurb={data.blurb} compactTop />
            <ResultQuoteBlock data={data} />
          </div>
        </div>

        <ResultCardFooter
          secondary={data.secondary}
          secondaryPatronus={data.secondaryPatronus}
        />
      </div>
    );
  }
);

export default ResultCard;
