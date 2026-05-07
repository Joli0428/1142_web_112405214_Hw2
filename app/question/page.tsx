"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { usePsyDataStore } from "../../store/store"

export default function Question() {

  const psyData = usePsyDataStore( (state)=> state );

  const router = useRouter();

  let questionData = [
    {
      title: "麵包師傅要你「靜置 30 分鐘」，你會怎麼做？",
      options:[
        {
          text: "乖乖待著… 然後偷偷膨脹三倍大",
          value: 1
        },
        {
          text: "等個屁！我已經開始發酵狂飆了",
          value: 2
        },
        {
          text: "發…什麼？我忘記了，我睡著了",
          value: 3 
        }
      ]
    },
    {
      title: "當你被放進烤箱時，溫度突然升高，你的反應是？",
      options:[
        {
          text: "啊啊啊啊啊啊！（冒泡炸裂）",
          value: 1
        },
        {
          text: "熱熱熱快翻面！我要烤出最酥脆的皮！",
          value: 2
        },
        {
          text: "我已經放棄掙扎，來吧命運……",
          value: 3 
        }
      ]
    },
    {
      title: "如果你被顧客挑選時被放回去了，你會？",
      options:[
        {
          text: "立刻乾癟五公分，氣到扁掉",
          value: 1
        },
        {
          text: "更用力散發麵包香，讓他後悔！",
          value: 2
        },
        {
          text: "裝死，假裝自己是牛角麵包",
          value: 3 
        }
      ]
    }
  ];


  const [questionIndex, setQuestionIndex] = useState(0);

  function nextQuestion(optionIndex: any){
    console.log("使用者選擇：" + optionIndex);
    
    if( questionIndex != questionData.length-1 ){  
      console.log("下一題～");
      setQuestionIndex( questionIndex + 1 );
    }else{
      console.log("進入準備看結果頁面");
      router.push("/prepare");
    }
    
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        答題
      <div>
        <div>{ "Q"+ (questionIndex+1) + "." + questionData[questionIndex].title }</div>
        {/* <div>{ `Q${(questionIndex+1)}.${questionData[questionIndex].title}` }</div> */}
        <div onClick={ ()=>nextQuestion(0) }>{ questionData[questionIndex].options[0].text }</div>
        <div onClick={ ()=>nextQuestion(1) }>{ questionData[questionIndex].options[1].text }</div>
        <div onClick={ ()=>nextQuestion(2) }>{ questionData[questionIndex].options[2].text }</div>
      </div>

        {/* <Link className="text-white bg-black px-3 py-2" href="/prepare">準備看結果</Link> */}
      </div>
    </>
  );

}
