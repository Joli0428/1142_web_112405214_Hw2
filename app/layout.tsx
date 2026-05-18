import type { Metadata } from "next";
import { Noto_Serif_TC, EB_Garamond } from "next/font/google";
import "./globals.css";

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-serif-en",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "你的護法是哪個生肖？",
  description: "哈利波特宇宙 × 十二生肖 心理測驗",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerifTC.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-full bg-[#0a0805]">
        <div className="parchment-bg">
          <div className="parchment-grain" />
          <div className="parchment-vignette" />
          <div className="parchment-candle" />
        </div>

        <main className="relative z-[1] min-h-screen flex justify-center items-stretch">
          {children}
        </main>
      </body>
    </html>
  );
}
