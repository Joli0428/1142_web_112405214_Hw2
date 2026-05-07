"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Result() {
  
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        結果
        <Link className="text-white bg-black px-3 py-2" href="/">再玩一次</Link>
      </div>
    </>
  );

}
