"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Question() {


  return (
    <>
      答題
      <Link href="/prepare">準備看結果</Link>
    </>
  );
}
