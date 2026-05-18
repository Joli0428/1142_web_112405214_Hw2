// 12 隻護法的幾何抽象符號（圓、弧、線條暗示輪廓，銀絲風）
// viewBox 200×200，currentColor 控色

import type { CSSProperties } from "react";

const SW = 1.4;        // 主線粗
const SW_THIN = 0.7;   // 細線

// 共用：path / circle / line / dot 小元件
function P({ d, sw = SW, dash, op = 1 }: { d: string; sw?: number; dash?: string; op?: number }) {
  return <path d={d} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} opacity={op} />;
}
function C({ cx, cy, r, sw = SW, op = 1, dash }: { cx: number; cy: number; r: number; sw?: number; op?: number; dash?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={sw} opacity={op} strokeDasharray={dash} />;
}
function L({ x1, y1, x2, y2, sw = SW, op = 1, dash }: { x1: number; y1: number; x2: number; y2: number; sw?: number; op?: number; dash?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" opacity={op} strokeDasharray={dash} />;
}
function Dot({ cx, cy, r = 1.8 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" />;
}

// 共用裝飾外框（虛線圓 + 四向小線段）
function Frame() {
  return (
    <g opacity="0.22">
      <C cx={100} cy={100} r={92} sw={SW_THIN} dash="1 4" />
      <L x1={100} y1={4}   x2={100} y2={20}  sw={SW_THIN} />
      <L x1={100} y1={180} x2={100} y2={196} sw={SW_THIN} />
      <L x1={4}   y1={100} x2={20}  y2={100} sw={SW_THIN} />
      <L x1={180} y1={100} x2={196} y2={100} sw={SW_THIN} />
    </g>
  );
}


// 鼠 → 獾（低圓丘 + 兩耳 + 中線）
const Sym鼠 = () => (
  <g>
    <Frame />
    <P d="M 50 130 Q 100 60 150 130" />
    <L x1={50} y1={130} x2={150} y2={130} />
    <P d="M 78 92 L 84 76 L 92 88" />
    <P d="M 122 92 L 116 76 L 108 88" />
    <L x1={100} y1={75} x2={100} y2={128} sw={SW_THIN} dash="2 3" op={0.7} />
    <Dot cx={84} cy={108} />
    <Dot cx={116} cy={108} />
    <L x1={36} y1={148} x2={164} y2={148} sw={SW_THIN} op={0.5} />
  </g>
);

// 牛 → 犀牛（厚弧身 + 角）
const Sym牛 = () => (
  <g>
    <Frame />
    <P d="M 102 78 Q 92 50 78 56" sw={1.8} />
    <P d="M 60 132 Q 50 120 60 100 Q 75 80 110 82 Q 145 84 155 110 Q 158 130 148 140" />
    <L x1={60} y1={132} x2={148} y2={140} />
    <Dot cx={88} cy={104} />
    <L x1={48} y1={156} x2={160} y2={156} sw={SW_THIN} op={0.5} />
    <L x1={70} y1={156} x2={70} y2={166} sw={SW_THIN} op={0.5} />
    <L x1={138} y1={156} x2={138} y2={166} sw={SW_THIN} op={0.5} />
  </g>
);

// 虎 → 格里芬（展翅 + 上方星點）
const Sym虎 = () => (
  <g>
    <Frame />
    <P d="M 100 110 Q 64 96 38 60" />
    <P d="M 100 110 Q 70 110 52 84" sw={SW_THIN} op={0.7} />
    <P d="M 100 110 Q 136 96 162 60" />
    <P d="M 100 110 Q 130 110 148 84" sw={SW_THIN} op={0.7} />
    <C cx={100} cy={120} r={10} />
    <P d="M 100 130 L 100 154" />
    <P d="M 100 154 L 92 162" />
    <P d="M 100 154 L 108 162" />
    <Dot cx={80} cy={48} r={1.4} />
    <Dot cx={100} cy={36} r={2.2} />
    <Dot cx={120} cy={48} r={1.4} />
  </g>
);

// 兔 → 貓頭鷹（圓身 + 大眼）
const Sym兔 = () => (
  <g>
    <Frame />
    <P d="M 60 90 Q 60 160 100 160 Q 140 160 140 90 Q 140 56 100 56 Q 60 56 60 90 Z" />
    <P d="M 74 60 L 70 44 L 84 58" sw={SW_THIN} />
    <P d="M 126 60 L 130 44 L 116 58" sw={SW_THIN} />
    <C cx={84} cy={92} r={14} />
    <C cx={116} cy={92} r={14} />
    <Dot cx={84} cy={92} r={3.2} />
    <Dot cx={116} cy={92} r={3.2} />
    <P d="M 95 108 L 100 118 L 105 108 Z" />
    <L x1={86} y1={130} x2={86} y2={146} sw={SW_THIN} op={0.5} />
    <L x1={100} y1={132} x2={100} y2={148} sw={SW_THIN} op={0.5} />
    <L x1={114} y1={130} x2={114} y2={146} sw={SW_THIN} op={0.5} />
  </g>
);

// 龍 → 鳳凰（上升火焰弧）
const Sym龍 = () => (
  <g>
    <Frame />
    <P d="M 100 132 Q 60 100 56 50" />
    <P d="M 100 132 Q 80 100 72 38" sw={SW_THIN} op={0.7} />
    <P d="M 100 132 Q 100 90 100 30" />
    <P d="M 100 132 Q 120 100 128 38" sw={SW_THIN} op={0.7} />
    <P d="M 100 132 Q 140 100 144 50" />
    <C cx={100} cy={140} r={8} />
    <P d="M 100 148 Q 96 162 100 174 Q 104 162 100 148" />
    <Dot cx={68} cy={66} r={1.3} />
    <Dot cx={132} cy={66} r={1.3} />
    <Dot cx={86} cy={48} r={1.1} />
    <Dot cx={114} cy={48} r={1.1} />
  </g>
);

// 蛇 → 蛇怪（盤蛇 + 菱形頭）
const Sym蛇 = () => (
  <g>
    <Frame />
    <P d="M 132 100 A 32 32 0 1 1 100 68 A 24 24 0 1 1 124 92 A 16 16 0 1 1 108 100" />
    <P d="M 132 100 L 156 100" />
    <P d="M 156 100 L 162 94 L 170 100 L 162 106 Z" />
    <P d="M 170 100 L 178 96" sw={SW_THIN} />
    <P d="M 170 100 L 178 104" sw={SW_THIN} />
    <Dot cx={158} cy={100} r={1.4} />
  </g>
);

// 馬 → 獨角獸（側臉 + 獨角）
const Sym馬 = () => (
  <g>
    <Frame />
    <P d="M 96 32 L 108 96" sw={1.8} />
    <L x1={98} y1={48}  x2={104} y2={50} sw={SW_THIN} />
    <L x1={100} y1={62} x2={106} y2={64} sw={SW_THIN} />
    <L x1={102} y1={76} x2={108} y2={78} sw={SW_THIN} />
    <P d="M 60 130 Q 56 100 80 92 Q 100 88 108 96 Q 130 102 130 130 Q 130 138 122 142 L 90 142 Q 78 142 70 138 Z" />
    <P d="M 80 92 L 76 76 L 88 84" sw={SW_THIN} />
    <P d="M 60 124 Q 48 130 44 144 Q 52 138 60 138" sw={SW_THIN} op={0.7} />
    <P d="M 56 110 Q 42 116 38 126" sw={SW_THIN} op={0.5} />
    <Dot cx={102} cy={118} />
    <Dot cx={120} cy={132} r={1.2} />
  </g>
);

// 羊 → 水中仙（同心水紋 + 人形）
const Sym羊 = () => (
  <g>
    <Frame />
    <C cx={100} cy={130} r={62} sw={SW_THIN} op={0.45} />
    <C cx={100} cy={130} r={46} sw={SW_THIN} op={0.6} />
    <C cx={100} cy={130} r={30} sw={SW_THIN} op={0.85} />
    <C cx={100} cy={70}  r={12} />
    <P d="M 88 82 Q 82 110 88 138 Q 100 154 112 138 Q 118 110 112 82" />
    <P d="M 90 96 Q 70 100 58 116" sw={SW_THIN} />
    <P d="M 110 96 Q 130 100 142 116" sw={SW_THIN} />
    <Dot cx={60} cy={148} r={1.2} />
    <Dot cx={140} cy={148} r={1.2} />
    <Dot cx={50} cy={170} r={1.0} />
    <Dot cx={150} cy={170} r={1.0} />
  </g>
);

// 猴 → 玻瓦特（散落菱形 + 連線，混亂感）
const Sym猴 = () => (
  <g>
    <Frame />
    <P d="M 100 70 L 130 100 L 100 130 L 70 100 Z" />
    <P d="M 56 60  L 68 72  L 56 84  L 44 72 Z"   sw={SW_THIN} op={0.75} />
    <P d="M 144 60 L 156 72 L 144 84 L 132 72 Z"  sw={SW_THIN} op={0.75} />
    <P d="M 56 124 L 64 132 L 56 140 L 48 132 Z"  sw={SW_THIN} op={0.6} />
    <P d="M 144 124 L 152 132 L 144 140 L 136 132 Z" sw={SW_THIN} op={0.6} />
    <P d="M 100 156 L 110 166 L 100 176 L 90 166 Z"  sw={SW_THIN} op={0.5} />
    <P d="M 100 24 L 108 32 L 100 40 L 92 32 Z"      sw={SW_THIN} op={0.5} />
    <L x1={86}  y1={86}  x2={64}  y2={74}  sw={SW_THIN} op={0.4} dash="1 3" />
    <L x1={114} y1={86}  x2={138} y2={74}  sw={SW_THIN} op={0.4} dash="1 3" />
    <L x1={86}  y1={114} x2={62}  y2={132} sw={SW_THIN} op={0.4} dash="1 3" />
    <L x1={114} y1={114} x2={138} y2={132} sw={SW_THIN} op={0.4} dash="1 3" />
    <Dot cx={100} cy={100} r={2.4} />
  </g>
);

// 雞 → 鳳凰鳴禽（地平線 + 小鳥 + 太陽光芒）
const Sym雞 = () => (
  <g>
    <Frame />
    <P d="M 50 140 A 50 50 0 0 1 150 140" />
    <L x1={36} y1={140} x2={164} y2={140} />
    <L x1={60}  y1={100} x2={54}  y2={88} sw={SW_THIN} op={0.7} />
    <L x1={100} y1={86}  x2={100} y2={70} sw={SW_THIN} op={0.7} />
    <L x1={140} y1={100} x2={146} y2={88} sw={SW_THIN} op={0.7} />
    <P d="M 78 108 Q 90 96 110 100 Q 122 102 124 110 L 124 116 L 80 116 Z" />
    <P d="M 78 112 L 64 110 L 70 116" sw={SW_THIN} />
    <C cx={118} cy={96} r={6} />
    <P d="M 124 96 L 132 94 L 124 100" sw={SW_THIN} />
    <P d="M 116 90 L 114 84 L 118 88 L 120 82 L 122 88" sw={SW_THIN} />
    <Dot cx={120} cy={96} r={1.1} />
  </g>
);

// 狗 → 黑色大犬（側臉 + 月）
const Sym狗 = () => (
  <g>
    <Frame />
    <C cx={130} cy={70} r={32} sw={SW_THIN} op={0.55} />
    <C cx={130} cy={70} r={32} sw={SW_THIN} op={0.25} dash="1 4" />
    <P d="M 50 130 Q 50 100 70 92 L 72 76 L 86 90 Q 96 86 108 90 L 118 78 L 118 96 Q 138 110 138 130" />
    <L x1={50} y1={130} x2={138} y2={130} />
    <P d="M 60 130 Q 50 152 70 168 Q 90 172 100 168" sw={SW_THIN} op={0.5} />
    <Dot cx={94} cy={108} />
    <P d="M 50 118 L 44 116 L 50 122 Z" />
    <L x1={108} y1={102} x2={120} y2={104} sw={SW_THIN} op={0.5} />
  </g>
);

// 豬 → 檔案精靈（巢狀檔案夾）
const Sym豬 = () => (
  <g>
    <Frame />
    <rect x={48} y={60} width={104} height={80} fill="none" stroke="currentColor" strokeWidth={SW_THIN} opacity={0.5} />
    <rect x={54} y={66} width={104} height={80} fill="none" stroke="currentColor" strokeWidth={SW_THIN} opacity={0.7} />
    <rect x={60} y={72} width={104} height={80} fill="none" stroke="currentColor" strokeWidth={SW} />
    <P d="M 78 72 L 78 64 L 110 64 L 114 72" />
    <L x1={72} y1={92}  x2={152} y2={92}  sw={SW_THIN} op={0.6} />
    <L x1={72} y1={108} x2={152} y2={108} sw={SW_THIN} op={0.6} />
    <L x1={72} y1={124} x2={152} y2={124} sw={SW_THIN} op={0.6} />
    <L x1={72} y1={140} x2={152} y2={140} sw={SW_THIN} op={0.6} />
    <C cx={112} cy={132} r={4} sw={SW_THIN} />
    <L x1={112} y1={136} x2={112} y2={144} sw={SW_THIN} />
    <C cx={142} cy={80} r={3} sw={SW_THIN} />
  </g>
);


const SYMBOLS: Record<string, () => React.ReactElement> = {
  "鼠": Sym鼠, "牛": Sym牛, "虎": Sym虎, "兔": Sym兔,
  "龍": Sym龍, "蛇": Sym蛇, "馬": Sym馬, "羊": Sym羊,
  "猴": Sym猴, "雞": Sym雞, "狗": Sym狗, "豬": Sym豬,
};


export default function PatronusSymbol({
  zodiac,
  size = 200,
  color,
  style,
  className,
}: {
  zodiac: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}){
  const Sym = SYMBOLS[zodiac] || Sym鼠;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size} height={size}
      className={className}
      style={{ color: color || "currentColor", display: "block", ...style }}
    >
      <Sym />
    </svg>
  );
}
