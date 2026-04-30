"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Question() {


  return (
    <>
      
      <div className="flex flex-col justify-center items-center gap-4"> 
      答題
      <Link className="text-white bg-black px-3 py-2" href="/prepare">準備看結果</Link>
    </div>
    </>
  );
}
