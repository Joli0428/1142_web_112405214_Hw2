"use client"
// 2. 答題 /question
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore } from "../../store/store";
import Progress from "@/component/Progress";
import Ornament from "@/component/Ornament";

export default function Question() {

  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  // 用 key 讓每次換題時動畫重播
  const [animKey, setAnimKey] = useState(0);

  const psyData       = usePsyStore( (state) => state.psyData );
  const addScore      = usePsyStore( (state) => state.addScore );
  const computeWinner = usePsyStore( (state) => state.computeWinner );

  const q = psyData.quizData[questionIndex];


  function pickOption(optionIndex: number){
    console.log("使用者選擇：" + optionIndex);
    setSelected(optionIndex);
  }

  function nextQuestion(){
    if( selected === null ) return;

    // 把這題的 tags 加進分數
    addScore( q.options[selected].tags );

    if( questionIndex !== psyData.quizData.length - 1 ){
      console.log("下一題～");
      setQuestionIndex( questionIndex + 1 );
      setSelected(null);
      setAnimKey( animKey + 1 );
    }else{
      console.log("進入準備看結果頁面");
      computeWinner();
      router.push("/prepare", { scroll: false });
    }
  }

  function backQuestion(){
    if( questionIndex === 0 ) return;
    // 注意：這裡簡化處理，回上一題不會把分數扣回去（避免 store 太複雜）
    // 實際上想做完整可逆，可以改用 answers 陣列重算
    setQuestionIndex( questionIndex - 1 );
    setSelected(null);
    setAnimKey( animKey + 1 );
  }


  return (
    <div key={animKey} className="w-full max-w-[960px] px-6 sm:px-10 py-8 flex flex-col min-h-screen page-in" style={{ color: "var(--ink)" }}>

      {/* 進度 */}
      <div className="pt-3 pb-4">
        <Progress current={questionIndex} total={psyData.quizData.length} />
      </div>

      {/* 中央內容 */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-[640px] mx-auto w-full">

        <div className="font-serif-en italic uppercase mb-[18px]"
             style={{
               fontSize: 13,
               letterSpacing: "0.32em",
               color: "var(--accent)",
               opacity: 0.85,
             }}>
          Capitulum {q.chapter}　·　{q.kicker}
        </div>

        <div style={{ color: "var(--accent)" }} className="mb-7">
          <Ornament size={56} opacity={0.7} />
        </div>

        <h2 className="font-serif font-semibold m-0"
            style={{
              fontSize: "clamp(22px, 2.6vw, 32px)",
              lineHeight: 1.55,
              letterSpacing: "0.04em",
              textWrap: "pretty",
            }}>
          { q.title }
        </h2>

        {/* 選項 */}
        <div className="w-full max-w-[560px] mt-8 sm:mt-12 flex flex-col gap-3">
          {
            q.options.map( (option: { text: string; tags: string[] }, index: number)=>{
              const on = selected === index;
              const letter = ["A","B","C","D"][index];
              return (
                <button
                  key={index}
                  onClick={ ()=>pickOption(index) }
                  className="opt-in cursor-pointer text-left grid grid-cols-[auto_1fr] gap-[18px] items-center transition-all duration-[250ms]"
                  style={{
                    animationDelay: `${0.15 + index * 0.08}s`,
                    padding: "18px 22px",
                    background: on ? "var(--surface)" : "transparent",
                    border: `1px solid ${ on ? "var(--accent)" : "var(--line)" }`,
                    color: "var(--ink)",
                    fontFamily: "inherit",
                    fontSize: "clamp(15px, 1.3vw, 17px)",
                    lineHeight: 1.7,
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={ (e)=>{ if(!on) e.currentTarget.style.background = "var(--surface)"; } }
                  onMouseLeave={ (e)=>{ if(!on) e.currentTarget.style.background = "transparent"; } }
                >
                  <span
                    className="inline-flex items-center justify-center font-serif-en italic transition-all duration-[250ms] shrink-0"
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      border: `1px solid ${ on ? "var(--accent)" : "var(--line)" }`,
                      fontSize: 17,
                      color: on ? "var(--accent)" : "var(--ink-mute)",
                      background: on ? "var(--accent-soft)" : "transparent",
                    }}
                  >
                    { letter }
                  </span>
                  <span style={{ textWrap: "pretty" }}>{ option.text }</span>
                </button>
              );
            })
          }
        </div>
      </div>

      {/* 底部導覽列 */}
      <div className="py-4 sm:py-6 flex justify-between items-center max-w-[560px] mx-auto w-full">
        <button
          onClick={backQuestion}
          disabled={ questionIndex === 0 }
          className="bg-transparent border-0 font-serif font-medium transition-colors duration-200 disabled:opacity-40 disabled:cursor-default cursor-pointer px-4 py-2"
          style={{
            color: questionIndex === 0 ? "var(--ink-faint)" : "var(--ink-mute)",
            fontSize: 15, letterSpacing: "0.3em",
          }}
        >
          ← 返
        </button>

        <span className="font-serif-en italic"
              style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--ink-faint)" }}>
          { q.id }
        </span>

        <button
          onClick={nextQuestion}
          disabled={ selected === null }
          className="bg-transparent border-0 font-serif font-medium transition-colors duration-200 disabled:opacity-40 disabled:cursor-default cursor-pointer px-4 py-2"
          style={{
            color: selected === null ? "var(--ink-faint)" : "var(--accent)",
            fontSize: 15, letterSpacing: "0.3em",
          }}
        >
          { questionIndex === psyData.quizData.length - 1 ? "召喚 →" : "續 →" }
        </button>
      </div>

    </div>
  );
}
