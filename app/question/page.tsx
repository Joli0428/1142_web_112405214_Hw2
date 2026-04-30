"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Question() {

  let questionData = [
    {
      title:"Q1：敘述敘述敘述",
      options:[
        {
          text:"選項一",
          value:1
        },
        {
          text:"選項二",
          value:2
        },
        {
          text:"選項三",
          value:3
        },
      ]
    },
    {
      title:"Q2：敘述敘述敘述",
      options:[
        {
          text:"選項一",
          value:1
        },
        {
          text:"選項二",
          value:2
        },
        {
          text:"選項三",
          value:3
        },
      ]
    },
    {
      title:"Q3：敘述敘述敘述",
      options:[
        {
          text:"選項一",
          value:1
        },
        {
          text:"選項二",
          value:2
        },
        {
          text:"選項三",
          value:3
        },
      ]
    }
  ];

  //[]是陣列
  //{}是物件


  const [questionIndex, setQuestionIndex] = useState(0);

  function nextQuestion(optionIndex: any){
    console.log("使用者選擇：" + optionIndex);


    if(questionIndex != questionData.length-1){
    console.log("下一題～");
    setQuestionIndex(questionIndex+1);
    
    }else{
      console.log("進入準備看結果頁面")
    }
  }

  return (
    <>
      
    <div className="flex flex-col justify-center items-center gap-4"> 
      答題
      
    <div>
      <div>{questionData[questionIndex].title}</div>
      <div onClick={ ()=>nextQuestion(0) }>{questionData[questionIndex].options[0].text}</div>
      <div onClick={ ()=>nextQuestion(1) }>{questionData[questionIndex].options[1].text}</div>
      <div onClick={ ()=>nextQuestion(2) }>{questionData[questionIndex].options[2].text}</div>
    </div>

      <Link className="text-white bg-black px-3 py-2" href="/prepare">準備看結果</Link>
    </div>
    </>
  );
}

//()=>是箭頭函式，表示直接執行這個函式