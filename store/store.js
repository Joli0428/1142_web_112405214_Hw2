// 護法心理測驗的狀態管理
import { create } from 'zustand'

const ZODIAC_KEYS = ['鼠','牛','虎','兔','龍','蛇','馬','羊','猴','雞','狗','豬'];

const questionData = [
  {
    id: "Q1",
    chapter: "I",
    kicker: "情境想像",
    title: "你獨自走進一片深夜的魔法森林，你最先注意到的是什麼？",
    options: [
      { text: "地上有光點在移動，像螢火蟲，但不是", tags: ["兔","羊"] },
      { text: "腳踩到枯葉的聲音，你停下來，確認四周", tags: ["牛","雞"] },
      { text: "一棵樹中間有一扇小門，微微透著光",       tags: ["鼠","猴"] },
      { text: "什麼都沒注意，你只想找到出口",           tags: ["虎","龍"] },
    ],
  },
  {
    id: "Q2",
    chapter: "II",
    kicker: "日常荒謬",
    title: "魔法郵件系統當機，你的貓頭鷹帶回一封不是你的信。你會怎麼做？",
    options: [
      { text: "完全不打開，原封不動轉交給管理員",         tags: ["牛","雞"] },
      { text: "打開看了，但告訴自己「只是確認收件人」",   tags: ["猴","豬"] },
      { text: "沒打開，但仔細研究信封上的字跡和封蠟",     tags: ["兔","蛇"] },
      { text: "直接找到收件人還給他，順便說你沒看",       tags: ["虎","狗"] },
    ],
  },
  {
    id: "Q3",
    chapter: "III",
    kicker: "象徵選擇",
    title: "你在古靈閣開了一個從未打開過的保險箱，裡面只有一樣東西。那是什麼？",
    options: [
      { text: "一封沒有署名的信，字跡是你自己的",         tags: ["蛇","龍"] },
      { text: "一個會顯示你此刻最需要去的地方的指南針",   tags: ["馬","龍"] },
      { text: "空的，但有一種讓你無法解釋的平靜感",       tags: ["羊","牛"] },
      { text: "另一把鑰匙，沒有標示能開什麼",             tags: ["鼠","猴"] },
    ],
  },
  {
    id: "Q4",
    chapter: "IV",
    kicker: "人際情境",
    title: "你最好的朋友施了一個咒語，把共同認識的人變成了青蛙。你的第一反應是？",
    options: [
      { text: "先幫忙解咒，事後再問為什麼",       tags: ["狗","馬"] },
      { text: "問清楚原因再決定要不要幫",         tags: ["蛇","兔"] },
      { text: "假裝沒看見，讓朋友自己收拾",       tags: ["豬","羊"] },
      { text: "拍下來，這太難得了",               tags: ["猴","雞"] },
    ],
  },
  {
    id: "Q5",
    chapter: "V",
    kicker: "自我投射",
    title: "分院帽坐上你的頭，沉默三分鐘後說：「我從來沒見過這樣的你。」它什麼意思？",
    options: [
      { text: "你同時具備所有學院的特質，它不知道怎麼分", tags: ["龍","蛇"] },
      { text: "你根本沒在認真想，它讀不到你的念頭",       tags: ["虎","豬"] },
      { text: "它看見了你自己都不知道的某個部分",         tags: ["兔","羊"] },
      { text: "它在開玩笑，這頂帽子一定有點問題",         tags: ["鼠","猴"] },
    ],
  },
  {
    id: "Q6",
    chapter: "VI",
    kicker: "壓力下的本能",
    title: "你在魔法部迷路，每條走廊都一樣，魔法指示牌全部故障。你怎麼辦？",
    options: [
      { text: "找第一個看起來還好的人問路",       tags: ["狗","羊"] },
      { text: "往最多人走的方向走，跟著流動",     tags: ["牛","雞"] },
      { text: "在腦中建立地圖，系統性嘗試每條走廊", tags: ["鼠","兔"] },
      { text: "找一個角落坐下來，等有人注意到你", tags: ["龍","蛇"] },
    ],
  },
  {
    id: "Q7",
    chapter: "VII",
    kicker: "玄學直覺",
    title: "呼神護衛術召出的護法沉默看著你，沒有驅走任何東西。牠在等什麼？",
    options: [
      { text: "等你說出你真正害怕的東西",         tags: ["馬","龍"] },
      { text: "等你先動，牠在觀察你的決定",       tags: ["虎","蛇"] },
      { text: "牠不是在等，牠只是在陪著你",       tags: ["狗","羊"] },
      { text: "也許牠也不知道，你們都在搞清楚狀況", tags: ["鼠","猴"] },
    ],
  },
  {
    id: "Q8",
    chapter: "VIII",
    kicker: "靈魂收斂",
    title: "護法的形狀，是你靈魂在最安全時候的樣子。你「最安全」的時刻是？",
    options: [
      { text: "獨處，什麼都不用說，什麼都不用解釋",       tags: ["虎","龍","蛇"] },
      { text: "跟很久沒見的朋友，從傍晚聊到天亮",         tags: ["狗","馬","羊"] },
      { text: "在做一件很細微、很需要專注的事的時候",     tags: ["牛","兔","雞"] },
      { text: "在一個完全陌生的地方，沒有人認識你",       tags: ["鼠","猴","龍"] },
    ],
  },
];

const resultData = {
  "鼠": {
    zodiac: "鼠", patronus: "獾",
    role: "霍格華茲地下密道的靈息", symbol: "機智生存者",
    blurb: "你的護法不是最強的，但永遠是最後活下來的那個。你懂得在縫隙中前進，在別人看不見的地方佈局。你的魔法，是讓危機變成通道。",
    incantation: "In angusto, via.", translation: "縫隙之中，自有去處。",
  },
  "牛": {
    zodiac: "牛", patronus: "犀牛",
    role: "古靈閣最深層金庫的守衛", symbol: "沉默承載者",
    blurb: "你不說話，但你在。你的護法是那種讓敵人看一眼就後退的存在。你不需要咆哮——你的存在本身就是警告。",
    incantation: "Stat, et silet.", translation: "佇立，並沉默。",
  },
  "虎": {
    zodiac: "虎", patronus: "格里芬",
    role: "禁忌森林的天空霸主", symbol: "孤傲王者",
    blurb: "你的護法是神話中才有的生物。你活在別人的傳說裡，但你自己從不覺得自己是傳說。你只是在做你覺得理所當然的事。",
    incantation: "Solus, non solitarius.", translation: "獨自，但並不孤獨。",
  },
  "兔": {
    zodiac: "兔", patronus: "貓頭鷹",
    role: "霍格華茲信使系統的核心", symbol: "靜默見證者",
    blurb: "你看見的，比任何人都多。你的護法在夜裡最清醒，在別人睡著的時候守望。你不是旁觀者，你是記錄者。",
    incantation: "Video, taceo, servo.", translation: "我看見、我沉默、我守候。",
  },
  "龍": {
    zodiac: "龍", patronus: "鳳凰",
    role: "鄧不利多辦公室的不死之火", symbol: "涅槃重生者",
    blurb: "你的護法是最稀有的——因為牠選擇的主人，必須懂得在灰燼中重新站起來。你不是沒有受過傷，你只是每次都回來了。",
    incantation: "Ex cinere, iterum.", translation: "自灰燼中，再一次。",
  },
  "蛇": {
    zodiac: "蛇", patronus: "蛇怪",
    role: "霍格華茲密室的終極守密者", symbol: "被誤解的深淵",
    blurb: "你的護法讓人懼怕，但懼怕來自不理解。你的內心比任何人都複雜，你說的每一句話都有第二層意思。懂你的人，會愛你一生。",
    incantation: "Sub verbo, abyssus.", translation: "言語之下，是深淵。",
  },
  "馬": {
    zodiac: "馬", patronus: "獨角獸",
    role: "禁忌森林中最純粹的魔法生物", symbol: "不被馴服的純粹",
    blurb: "你的護法只對真心的人顯現。你有一種讓人無法偽裝的能力——在你面前，所有虛假都會現形。你的存在本身就是一種試煉。",
    incantation: "Coram me, nuda veritas.", translation: "在我面前，真實無處遁形。",
  },
  "羊": {
    zodiac: "羊", patronus: "水中仙",
    role: "霍格華茲湖底的霧中歌聲", symbol: "滲透一切的溫柔",
    blurb: "你的護法是那種讓人不知不覺就走近的存在。你不強迫任何人，但最後所有人都在你身邊。你的溫柔是一種無聲的重力。",
    incantation: "Sine voce, attrahit.", translation: "無聲，卻牽引。",
  },
  "猴": {
    zodiac: "猴", patronus: "玻瓦特",
    role: "衣櫃裡的混亂製造師", symbol: "混亂中的智慧",
    blurb: "你的護法是讓對手笑到沒力氣反擊的那種。你用幽默解除危機，用荒謬打敗恐懼。沒有人能完全看穿你，因為你自己也不確定下一步。",
    incantation: "Ridendo, vincit.", translation: "以笑，勝之。",
  },
  "雞": {
    zodiac: "雞", patronus: "鳳凰鳴禽",
    role: "黎明前唯一的報時者", symbol: "孤獨哨兵",
    blurb: "你的護法在最黑暗的時刻叫醒世界。你不是最受矚目的，但沒有你，太陽不知道什麼時候升起。你的存在是一種節奏，是一種秩序。",
    incantation: "Ante lucem, voco.", translation: "在天亮之前，我先呼喊。",
  },
  "狗": {
    zodiac: "狗", patronus: "黑色大犬",
    role: "小天狼星跨越生死的守護形態", symbol: "忠誠至死的靈魂",
    blurb: "你的護法是那種會跟著你穿過阿茲卡班也不離開的存在。你的愛沒有條件，你的忠誠沒有期限。這是你最強的魔法，也是你最深的脆弱。",
    incantation: "Ad mortem, mecum.", translation: "直到死亡，與我同行。",
  },
  "豬": {
    zodiac: "豬", patronus: "檔案精靈",
    role: "魔法部地下室的秘密守護者", symbol: "藏在平凡裡的深度",
    blurb: "你的護法住在沒人注意的地方，但掌握著所有人的秘密。你比看起來複雜太多，你的平靜是一種選擇，不是一種缺乏。",
    incantation: "In silentio, scio.", translation: "在寂靜中，我知曉。",
  },
};

function computeWinner(scoreMap, lastAnswerTags) {
  let max = -1;
  for (const k of ZODIAC_KEYS) {
    if (scoreMap[k] > max) max = scoreMap[k];
  }
  const tied = ZODIAC_KEYS.filter((k) => scoreMap[k] === max);
  if (tied.length === 1) return tied[0];
  if (lastAnswerTags) {
    for (const t of lastAnswerTags) {
      if (tied.includes(t)) return t;
    }
  }
  return tied[0];
}

const usePsyStore = create((set) => ({
  psyData: {
    scoreMap: Object.fromEntries(ZODIAC_KEYS.map((k) => [k, 0])),
    answers: [],
    winner: null,
    quizData: questionData,
    resultData: resultData,
    zodiacKeys: ZODIAC_KEYS,
  },

  addScore: (tags) =>
    set((state) => {
      const newScoreMap = { ...state.psyData.scoreMap };
      const weight = state.psyData.answers.length === 7 ? 1.25 : 1;
      tags.forEach((t) => {
        if (newScoreMap[t] != null) newScoreMap[t] += weight;
      });
      return {
        psyData: {
          ...state.psyData,
          scoreMap: newScoreMap,
          answers: [...state.psyData.answers, tags],
        },
      };
    }),

  computeWinner: () =>
    set((state) => {
      const last = state.psyData.answers[state.psyData.answers.length - 1];
      const w = computeWinner(state.psyData.scoreMap, last);
      return { psyData: { ...state.psyData, winner: w } };
    }),

  reset: () =>
    set((state) => ({
      psyData: {
        ...state.psyData,
        scoreMap: Object.fromEntries(ZODIAC_KEYS.map((k) => [k, 0])),
        answers: [],
        winner: null,
      },
    })),
}));

export { usePsyStore };
