"use client"
// 3. 準備看結果 /prepare（召喚動畫過場）
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore } from "../../store/store";
import PatronusSymbol from "@/component/PatronusSymbol";

export default function Prepare() {

  const router        = useRouter();
  const psyData       = usePsyStore( (state)=>state.psyData );
  const computeWinner = usePsyStore( (state)=>state.computeWinner );

  // phase 0: 粒子收束中　1: 護法輪廓浮現　2: 名字浮現
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  // 進到此頁就算出 winner（最後一題的分數要算進去），僅執行一次
  useEffect( ()=>{
    computeWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 階段時序：粒子 → 護法 → 名字 → 跳到 /result
  useEffect( ()=>{
    const t1 = setTimeout( ()=>setPhase(1), 2200 );
    const t2 = setTimeout( ()=>setPhase(2), 3400 );
    const t3 = setTimeout( ()=>router.push("/result"), 5200 );
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [router]);


  // 粒子場：四面八方匯聚到中央
  useEffect( ()=>{
    const canvas = canvasRef.current;
    if( !canvas ) return;
    const ctx = canvas.getContext("2d");
    if( !ctx ) return;

    let raf = 0;
    const w = canvas.width  = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    const cx = w/2, cy = h/2;
    const N = 90;
    const particles = Array.from({ length: N }).map( ()=>{
      const angle = Math.random() * Math.PI * 2;
      const dist  = 600 + Math.random() * 800;
      return {
        x:  cx + Math.cos(angle) * dist,
        y:  cy + Math.sin(angle) * dist,
        tx: cx + (Math.random() - 0.5) * 200,
        ty: cy + (Math.random() - 0.5) * 200,
        r:  1 + Math.random() * 3,
        v:  0.005 + Math.random() * 0.018,
        op: 0,
      };
    });

    const start = performance.now();
    function draw() {
      if( !ctx ) return;
      const t = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      particles.forEach( (p)=>{
        p.x += (p.tx - p.x) * p.v;
        p.y += (p.ty - p.y) * p.v;
        p.op = Math.min(1, t * 0.55);
        // 外圍光暈
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grad.addColorStop(0,   `rgba(255, 240, 200, ${0.9 * p.op})`);
        grad.addColorStop(0.4, `rgba(212, 168, 90,  ${0.4 * p.op})`);
        grad.addColorStop(1,   "rgba(212, 168, 90, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
        // 核心亮點
        ctx.fillStyle = `rgba(255, 250, 230, ${p.op})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return ()=>cancelAnimationFrame(raf);
  }, []);


  const winner = psyData.winner;
  const result = winner ? psyData.resultData[winner] : null;


  return (
    <div className="fixed inset-0 z-[5] flex flex-col items-center justify-center"
         style={{
           background: "radial-gradient(ellipse at center, rgba(20,12,4,0.4) 0%, rgba(8,4,2,0.95) 100%)",
         }}>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-[2] text-center font-serif"
           style={{ color: "var(--ink)" }}>

        <div className="font-serif-en italic mb-8"
             style={{
               opacity: phase >= 0 ? 1 : 0,
               transition: "opacity 1.2s ease",
               fontSize: 14,
               letterSpacing: "0.6em",
               color: "var(--accent)",
             }}>
          EXPECTO PATRONUM
        </div>

        {/* 護法輪廓淡入 */}
        <div
          style={{
            color: "var(--accent)",
            opacity:   phase >= 1 ? 0.95 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.7)",
            transition: "all 1.4s cubic-bezier(.2,.7,.2,1)",
            filter: phase >= 2
              ? "drop-shadow(0 0 24px rgba(255,235,180,0.6))"
              : "drop-shadow(0 0 40px rgba(255,235,180,0.9))",
          }}
        >
          { winner && <PatronusSymbol zodiac={winner} size={260} /> }
        </div>

        {/* 護法名字 */}
        <div
          className="mt-9"
          style={{
            opacity:   phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.9s ease",
          }}
        >
          <div className="font-serif-en italic mb-3"
               style={{ fontSize: 13, letterSpacing: "0.4em", color: "var(--ink-mute)" }}>
            你的護法
          </div>
          <div className="font-bold"
               style={{
                 fontSize: "clamp(40px, 5vw, 56px)",
                 letterSpacing: "0.15em",
                 color: "var(--ink)",
               }}>
            { result?.patronus }
          </div>
        </div>
      </div>

    </div>
  );

}
