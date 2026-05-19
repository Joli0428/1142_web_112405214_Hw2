"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePsyStore } from "../store/store";
import Ornament from "@/component/Ornament";
import Sigil from "@/component/Sigil";

function LearningDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`font-serif m-0 text-center ${className}`}
      style={{
        fontSize: 10,
        lineHeight: 1.7,
        letterSpacing: "0.06em",
        color: "var(--ink-faint)",
      }}
    >
      本測驗為課程學習作業，靈感取自哈利波特世界觀之非官方同人創作，
      <br className="hidden sm:inline" />
      僅供學習與非商業用途，與華納兄弟、J.K. Rowling 官方無關。
    </p>
  );
}

export default function Home() {
  const reset = usePsyStore((state) => state.reset);
  const didReset = useRef(false);

  useEffect(() => {
    if (didReset.current) return;
    didReset.current = true;
    reset();
  }, [reset]);

  return (
    <div className="w-full min-h-dvh home-in" style={{ color: "var(--ink)" }}>
      {/* ── 手機版（參考 zodiac 範本：左對齊、法陣置中、聲明在底） ── */}
      <div
        className="sm:hidden flex flex-col min-h-dvh px-6 pt-10 pb-8 max-w-[480px] mx-auto w-full"
        style={{ textAlign: "left" }}
      >
        <p
          className="font-serif-en italic uppercase m-0"
          style={{ fontSize: 11, letterSpacing: "0.45em", color: "var(--ink-mute)" }}
        >
          Patronus · 心理測驗
        </p>

        <div className="mt-4" style={{ color: "var(--accent)" }}>
          <Ornament size={52} opacity={0.85} />
        </div>

        <h1
          className="font-serif font-bold leading-[1.08] mt-6 m-0"
          style={{
            fontSize: "clamp(38px, 10vw, 48px)",
            letterSpacing: "0.04em",
            color: "var(--ink)",
          }}
        >
          你的護法
          <br />
          是哪個
          <br />
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>生肖</span>？
        </h1>

        <p
          className="font-serif mt-5 leading-[1.85] m-0 max-w-[320px]"
          style={{ fontSize: "clamp(15px, 4vw, 17px)", color: "var(--ink-mute)" }}
        >
          呼神護衛術，召喚的不只是光——
          <br />
          是你靈魂最真實的形狀。
        </p>

        <div
          className="flex-1 flex flex-col items-center justify-center py-6 min-h-[180px]"
          style={{ color: "var(--accent)" }}
        >
          <Sigil size={220} opacity={0.82} />
          <p
            className="font-serif-en italic mt-4 m-0"
            style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--ink-mute)" }}
          >
            Expecto Patronum
          </p>
        </div>

        <div className="shrink-0 pb-2 w-full flex flex-col items-center">
        <Link
          href="/question"
          className="inline-flex items-center justify-center gap-4 mt-2 group"
          style={{ color: "var(--ink)" }}
        >
          <span
            className="w-[60px] h-[60px] shrink-0 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, var(--accent) 0%, var(--wax) 60%, var(--wax) 100%)",
              border: "1px solid var(--accent-soft)",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.5), inset 0 0 12px rgba(0,0,0,0.4)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" style={{ opacity: 0.85 }}>
              <path
                d="M 16 4 L 28 16 L 16 28 L 4 16 Z"
                fill="none"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="0.6"
              />
              <path
                d="M 16 9 L 23 16 L 16 23 L 9 16 Z"
                fill="none"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="0.6"
              />
              <circle cx="16" cy="16" r="1.5" fill="rgba(0,0,0,0.5)" />
            </svg>
          </span>
          <span
            className="relative font-serif font-medium text-[22px]"
            style={{ letterSpacing: "0.5em" }}
          >
            召喚
            <span
              className="absolute left-0 -bottom-2 h-px w-[40%] group-hover:w-full transition-all duration-300"
              style={{ background: "var(--accent)" }}
            />
          </span>
        </Link>

        <p
          className="font-serif-en italic mt-5 m-0 text-center w-full"
          style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--ink-faint)" }}
        >
          哈利波特宇宙 × 十二生肖 · 8 題 · 3–5 分鐘
        </p>
        </div>

        <LearningDisclaimer className="shrink-0 pt-3 pb-1" />
      </div>

      {/* ── 桌面版 ── */}
      <div className="hidden sm:flex w-full max-w-[960px] mx-auto px-10 min-h-dvh flex-col">
        <div
          className="flex-1 flex flex-col justify-center py-12"
          style={{ textAlign: "left" }}
        >
          <p
            className="font-serif-en italic uppercase text-[13px] m-0"
            style={{ letterSpacing: "0.5em", color: "var(--ink-mute)" }}
          >
            Patronus · 心理測驗
          </p>

          <div className="mt-5" style={{ color: "var(--accent)" }}>
            <Ornament size={56} opacity={0.85} />
          </div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-12 items-center w-full mt-6">
            <div>
              <h1
                className="font-serif font-bold leading-[1.05] m-0"
                style={{
                  fontSize: "clamp(46px, 7vw, 84px)",
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                }}
              >
                你的護法
                <br />
                是哪個
                <br />
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>生肖</span>？
              </h1>

              <p
                className="font-serif font-normal leading-[1.85] mt-7 max-w-[360px] m-0"
                style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: "var(--ink-mute)" }}
              >
                呼神護衛術，召喚的不只是光——
                <br />
                是你靈魂最真實的形狀。
              </p>

              <Link
                href="/question"
                className="inline-flex items-center gap-[18px] mt-9 group"
                style={{ color: "var(--ink)" }}
              >
                <span
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_var(--accent-soft)]"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, var(--accent) 0%, var(--wax) 60%, var(--wax) 100%)",
                    border: "1px solid var(--accent-soft)",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.5), inset 0 0 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" style={{ opacity: 0.85 }}>
                    <path
                      d="M 16 4 L 28 16 L 16 28 L 4 16 Z"
                      fill="none"
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth="0.6"
                    />
                    <path
                      d="M 16 9 L 23 16 L 16 23 L 9 16 Z"
                      fill="none"
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth="0.6"
                    />
                    <circle cx="16" cy="16" r="1.5" fill="rgba(0,0,0,0.5)" />
                  </svg>
                </span>
                <span
                  className="relative font-serif font-medium text-[22px] pl-[0.3em]"
                  style={{ letterSpacing: "0.5em" }}
                >
                  召喚
                  <span
                    className="absolute left-0 -bottom-2 h-px transition-all duration-[400ms] w-[40%] group-hover:w-full"
                    style={{ background: "var(--accent)" }}
                  />
                </span>
              </Link>

              <p
                className="font-serif-en italic mt-7 m-0"
                style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--ink-faint)" }}
              >
                哈利波特宇宙 × 十二生肖　·　8 題　·　3–5 分鐘
              </p>
            </div>

            <div
              className="flex justify-center items-center relative"
              style={{ color: "var(--accent)" }}
            >
              <Sigil size={360} opacity={0.9} />
              <p
                className="absolute font-serif-en italic text-center w-full pointer-events-none m-0"
                style={{
                  color: "var(--ink-mute)",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  transform: "translateY(120px)",
                }}
              >
                Expecto Patronum
              </p>
            </div>
          </div>
        </div>

        <LearningDisclaimer className="shrink-0 w-full max-w-[680px] mx-auto text-center px-4 pb-8 pt-3" />
      </div>
    </div>
  );
}
