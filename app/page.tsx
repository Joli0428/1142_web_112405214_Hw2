"use client"
import { useState, useEffect } from "react";


export default function Home() {

  //階段名稱      路由規劃
  //1. 歡迎畫面   /
  //2. 答題      /question
  //3. 準備看結果 /prepare
  //4. 看結果    /result
  // https://psy-test.com/love/result?id=10
  
  

  const [counter, setCounter] = useState(0); 

  function addMorning(){
    console.log("被點到了");
    setCounter(counter+1);
  }

  useEffect(function(){
    console.log("畫面載入完成");
  }, []);

  // useEffect(()=>{ }, []);

  useEffect(function(){
    console.log("有人說早安");
  },[counter]);



  function nextProblem(){
    setCounter(counter+1);
  }

  return (
    <>

      {
        (counter == 0 ) && <div className="w-[480px] h-screen flex justify-center items-center flex-col bg-red-500 m-auto">
          <div>歡迎畫面</div>
          <div onClick={nextProblem} className="bg-black px-6 py-3">開始測驗</div>
        </div>
      }

      {
        (counter == 1 ) && <div className="w-[480px] h-screen flex justify-center items-center flex-col bg-red-500 m-auto">
          <div>題目一</div>
          <div onClick={nextProblem}  className="bg-black px-6 py-3">下一題</div>
        </div>

      }

      {
        (counter == 2 ) && <div className="w-[480px] h-screen flex justify-center items-center flex-col bg-red-500 m-auto">
          <div>題目二</div>
          <div onClick={nextProblem}  className="bg-black px-6 py-3">下一題</div>
        </div>

      }
    </>
  );
}
