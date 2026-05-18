// 章節進度條
"use client"

import Ornament from "./Ornament";

function romanize(n: number){
  const M = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  return M[n] || String(n);
}

export default function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      {Array.from({ length: total }).map( (_, i)=>{
        const done = i < current;
        const active = i === current;
        return (
          <span
            key={i}
            className="block transition-all duration-[400ms]"
            style={{
              width: active ? 18 : 6,
              height: 2,
              background: done || active ? "var(--accent)" : "var(--line)",
            }}
          />
        );
      })}
      <span
        className="ml-3 italic text-[13px] font-serif-en"
        style={{ letterSpacing: "0.16em", color: "var(--ink-mute)" }}
      >
        { romanize(current + 1) } / { romanize(total) }
      </span>
    </div>
  );
}
