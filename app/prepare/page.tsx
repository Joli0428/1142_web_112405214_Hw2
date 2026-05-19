"use client";
// 3. 準備看結果 /prepare（召喚動畫過場）
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore } from "../../store/store";
import PatronusSymbol from "@/component/PatronusSymbol";

const revealBtnStyle = {
  border: "1px solid var(--accent)",
  color: "var(--accent)",
  fontSize: 14,
  letterSpacing: "0.35em",
  padding: "14px 28px",
  fontFamily: "inherit",
  background: "transparent",
  cursor: "pointer",
} as const;

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  bx: number;
  by: number;
  r: number;
  delay: number;
  op: number;
  orbit: number;
  orbitSpeed: number;
  orbitPhase: number;
  twinkle: number;
};

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

export default function Prepare() {
  const router = useRouter();
  const psyData = usePsyStore((state) => state.psyData);
  const computeWinner = usePsyStore((state) => state.computeWinner);

  const [phase, setPhase] = useState(0);
  const [symbolSize, setSymbolSize] = useState(252);
  const phaseRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const symbolRef = useRef<HTMLDivElement | null>(null);

  const winner = psyData.winner;
  const result = winner ? psyData.resultData[winner] : null;
  const ready = phase >= 2;

  phaseRef.current = phase;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (!psyData.winner) computeWinner();

    const sym = symbolRef.current;
    if (sym) {
      const w = sym.getBoundingClientRect().width;
      if (w > 0) setSymbolSize(Math.max(160, Math.floor(w * 0.9)));
    }

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const sym = symbolRef.current;
    if (!sym) return;
    const ro = new ResizeObserver(() => {
      const w = sym.getBoundingClientRect().width;
      setSymbolSize(Math.max(160, Math.floor(w * 0.9)));
    });
    ro.observe(sym);
    return () => ro.disconnect();
  }, [winner]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const start = performance.now();

    function getFocal() {
      const c = canvasRef.current;
      const sym = symbolRef.current;
      if (!c) return { fx: 0, fy: 0, w: 0, h: 0 };

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = c.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));

      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }

      let fx = w / 2;
      let fy = h * 0.42;

      if (sym && rect.width > 0) {
        const sr = sym.getBoundingClientRect();
        fx = (sr.left + sr.width / 2 - rect.left) * (w / rect.width);
        fy = (sr.top + sr.height / 2 - rect.top) * (h / rect.height);
      }

      return { fx, fy, w, h };
    }

    const CONVERGE_SEC = 2.2;
    const IDLE_BLEND_SEC = 1.0;

    function spawnParticles(fx: number, fy: number, w: number, h: number) {
      const spread = Math.min(100, w * 0.07);
      const maxDist = Math.max(w, h) * 0.95;
      particles = Array.from({ length: 80 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = maxDist * 0.5 + Math.random() * maxDist * 0.45;
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        const bx = (Math.random() - 0.5) * spread * 2;
        const by = (Math.random() - 0.5) * spread * 2;
        return {
          x: fx + ox,
          y: fy + oy,
          ox,
          oy,
          bx,
          by,
          r: 1 + Math.random() * 2.4,
          delay: Math.random() * 0.35,
          op: 0,
          orbit: 8 + Math.random() * 20,
          orbitSpeed: 0.35 + Math.random() * 0.75,
          orbitPhase: Math.random() * Math.PI * 2,
          twinkle: 1.2 + Math.random() * 2.5 + i * 0.02,
        };
      });
    }

    function draw() {
      const { fx, fy, w, h } = getFocal();
      if (!ctx || !canvas || w < 1) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const t = (performance.now() - start) / 1000;
      const ph = phaseRef.current;
      const phaseFade = ph >= 2 ? 0.38 : ph >= 1 ? 0.62 : 1;

      particles.forEach((p) => {
        const tc = Math.max(0, t - p.delay);
        const convergeEase = smoothstep(tc / CONVERGE_SEC);
        const idleEase = smoothstep(
          Math.max(0, (tc - CONVERGE_SEC) / IDLE_BLEND_SEC),
        );

        const spawnX = fx + p.ox;
        const spawnY = fy + p.oy;
        const homeX = fx + p.bx;
        const homeY = fy + p.by;

        const ot = t * p.orbitSpeed + p.orbitPhase;
        const breathe = 1 + 0.1 * Math.sin(t * 0.55 + p.orbitPhase);
        const orbitX = fx + p.bx * breathe + Math.cos(ot) * p.orbit;
        const orbitY = fy + p.by * breathe + Math.sin(ot * 1.25) * p.orbit * 0.9;

        const atHomeX = spawnX + (homeX - spawnX) * convergeEase;
        const atHomeY = spawnY + (homeY - spawnY) * convergeEase;
        p.x = atHomeX + (orbitX - atHomeX) * idleEase;
        p.y = atHomeY + (orbitY - atHomeY) * idleEase;

        const baseOp = smoothstep(Math.min(1, tc / 0.85));
        const twinkle =
          idleEase > 0.4
            ? 0.72 + 0.28 * Math.sin(t * p.twinkle + p.orbitPhase)
            : 1;
        p.op = baseOp * phaseFade * twinkle;
      });

      ctx.clearRect(0, 0, w, h);
      const idleVisual = t > CONVERGE_SEC + 0.3;
      particles.forEach((p) => {
        const glow = p.r * (idleVisual ? 7 : 6);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        grad.addColorStop(0, `rgba(255, 240, 200, ${0.85 * p.op})`);
        grad.addColorStop(0.45, `rgba(212, 168, 90, ${0.35 * p.op})`);
        grad.addColorStop(1, "rgba(212, 168, 90, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 248, 220, ${0.9 * p.op})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    const { fx, fy, w, h } = getFocal();
    if (w >= 20) spawnParticles(fx, fy, w, h);
    draw();

    const onResize = () => {
      const { fx, fy, w, h } = getFocal();
      if (w < 20) return;
      const spread = Math.min(100, w * 0.07);
      particles.forEach((p) => {
        p.bx = (Math.random() - 0.5) * spread * 2;
        p.by = (Math.random() - 0.5) * spread * 2;
      });
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="prepare-screen fixed inset-0 z-5 flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[420px] flex-col items-center justify-center px-5 sm:px-6">
        <p
          className="font-serif-en italic m-0 mb-8 sm:mb-10 w-full text-center"
          style={{
            fontSize: 12,
            letterSpacing: "0.38em",
            paddingRight: "0.38em",
            color: "var(--accent)",
            opacity: phase >= 0 ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <span
            className="hidden sm:inline"
            style={{ letterSpacing: "0.55em", paddingRight: "0.55em" }}
          >
            EXPECTO PATRONUM
          </span>
          <span className="sm:hidden">EXPECTO PATRONUM</span>
        </p>

        <div
          ref={symbolRef}
          className="relative mx-auto flex shrink-0 items-center justify-center"
          style={{
            width: "min(72vw, 280px)",
            height: "min(72vw, 280px)",
            maxWidth: 280,
            maxHeight: 280,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <div
              className="prepare-symbol-glow rounded-full"
              style={{
                opacity: phase >= 1 ? 1 : 0.4,
                transition: "opacity 1.4s ease",
                animation:
                  phase >= 1
                    ? "prepare-glow-pulse 3.2s ease-in-out infinite"
                    : "none",
              }}
            />
          </div>
          <div
            className="relative z-[1] flex items-center justify-center"
            style={{
              color: "var(--accent)",
              opacity: phase >= 1 ? 0.95 : 0,
              transform: phase >= 1 ? "scale(1)" : "scale(0.72)",
              transition: "all 1.4s cubic-bezier(.2,.7,.2,1)",
              filter: ready
                ? "drop-shadow(0 0 24px rgba(255,235,180,0.5))"
                : "drop-shadow(0 0 40px rgba(255,235,180,0.8))",
            }}
          >
            {winner ? (
              <PatronusSymbol zodiac={winner} size={symbolSize} />
            ) : (
              <div
                aria-hidden
                className="shrink-0"
                style={{ width: symbolSize, height: symbolSize }}
              />
            )}
          </div>
        </div>

        <div
          className="mx-auto w-full max-w-[360px] overflow-hidden text-center"
          style={{
            maxHeight: ready ? 320 : 0,
            marginTop: ready ? 16 : 0,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(12px)",
            transition:
              "max-height 0.9s ease, margin 0.9s ease, opacity 0.9s ease, transform 0.9s ease",
            pointerEvents: ready ? "auto" : "none",
          }}
        >
          <p
            className="font-serif-en italic m-0 mb-3"
            style={{
              fontSize: 13,
              letterSpacing: "0.38em",
              paddingRight: "0.38em",
              color: "var(--ink-mute)",
            }}
          >
            你的護法
          </p>
          <h2
            className="font-serif m-0 w-full text-center font-bold"
            style={{
              fontSize: "clamp(36px, 9vw, 56px)",
              letterSpacing: "0.12em",
              paddingRight: "0.12em",
              lineHeight: 1.15,
              color: "var(--ink)",
            }}
          >
            {result?.patronus}
          </h2>

          <p
            className="font-serif m-0 mt-6 px-1 sm:mt-8"
            style={{
              fontSize: 14,
              letterSpacing: "0.12em",
              lineHeight: 1.75,
              color: "var(--ink-mute)",
            }}
          >
            護法已現形，準備好揭曉完整結果了嗎？
          </p>

          <button
            type="button"
            onClick={() => router.push("/result")}
            disabled={!ready}
            className="mx-auto mt-7 block transition-all duration-200 hover:bg-[var(--accent-soft)] disabled:cursor-default disabled:opacity-0 sm:mt-8"
            style={revealBtnStyle}
          >
            揭曉完整結果 →
          </button>
        </div>
      </div>
    </div>
  );
}
