"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Prepare() {

  

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        準備看結果
        <Link className="text-white bg-black px-3 py-2" href="/result">看結果</Link>
      </div>
    </>
  );

}
