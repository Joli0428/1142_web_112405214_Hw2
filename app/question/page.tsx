"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Question() {

  let questionData = [
    {
      title:"題目一：敘述敘述敘述",
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

  return (
    <>
      
    <div className="flex flex-col justify-center items-center gap-4"> 
      答題





      <Link className="text-white bg-black px-3 py-2" href="/prepare">準備看結果</Link>
    </div>
    </>
  );
}
