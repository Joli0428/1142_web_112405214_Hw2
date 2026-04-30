"use client"
import { useSearchParams } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score") ?? "0";
  const score = Number(scoreParam);

  const resultText = score >= 2 ? "你是行動派戀人" : "你是細膩派戀人";


  return (
    <div className="w-[480px] h-screen flex justify-center items-center flex-col bg-red-500 m-auto text-white gap-4">
      <div>測驗結果</div>
      <div>你的分數：{score}</div>
      <div>{resultText}</div>
    </div>
  );
}
