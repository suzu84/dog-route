import type { Article, Shop } from "./types";

function img(seed: string, w = 800, h = 600) {
  // .png拡張子を付けるとSVGではなくPNGが返る（next/imageのSVG非許可設定と相性が良いため）
  return {
    url: `https://placehold.co/${w}x${h}/e5e7eb/9ca3af.png?text=${encodeURIComponent(
      seed
    )}`,
    width: w,
    height: h,
  };
}

export const MOCK_SHOPS: Shop[] = [
  {
    id: "shop_001",
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-01-10T00:00:00.000Z",
    name: "Cafe レオン 大山本店",
    category: ["カフェ・レストラン"],
    mainImage: img("Cafe Leon"),
    tags: ["屋内可", "わんこメニューあり", "現金以外可"],
    appeal:
      "こだわりのコーヒーと手作りワンコメニューが自慢の、アットホームなドッグカフェです。休日は多くの愛犬家で賑わいます。テラス席だけでなく、店内奥のソファ席もワンちゃん同伴可能です。",
    rules:
      "入り口に3段の階段があります。大型のバギーは持ち上げるのが少し大変かもしれません。マナーウェアの着用は必須です（店内で100円で購入も可能）。リードフックは全席の足元に完備されています。",
    priceMenu: "ワンコ用ハンバーグプレート 800円 / 本日のコーヒー 500円",
    address: "東京都板橋区大山町〇-〇",
    lat: 35.7512,
    lng: 139.7092,
    placeId: "",
    phone: "03-1234-5678",
    businessHours: "10:00〜18:00（火・水定休）",
    payment: "現金、PayPay、クレジットカード可",
    access: "大山駅 徒歩5分",
    rating: 4.8,
    isRecommended: true,
  },
  {
    id: "shop_002",
    createdAt: "2026-01-12T00:00:00.000Z",
    updatedAt: "2026-01-12T00:00:00.000Z",
    name: "Dog Dining Pochi",
    category: ["カフェ・レストラン"],
    mainImage: img("Dining Pochi"),
    tags: ["大型犬OK", "駐車場あり"],
    appeal:
      "開放的なテラス席が魅力。大型犬もゆったり過ごせます。週末は予約をおすすめします。",
    rules: "テラス席は段差なしでバギーもそのまま入店できます。",
    priceMenu: "ワンプレートランチ 1200円〜",
    address: "東京都板橋区小竹町〇-〇",
    lat: 35.7459,
    lng: 139.6841,
    placeId: "",
    phone: "03-2345-6789",
    businessHours: "11:00〜20:00（月曜定休）",
    payment: "現金のみ",
    access: "小竹向原駅 徒歩8分",
    rating: 4.5,
  },
  {
    id: "shop_003",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
    name: "Cafe NOA 常盤台店",
    category: ["カフェ・レストラン"],
    mainImage: img("Cafe NOA"),
    tags: ["わんこメニューあり", "ネット予約可"],
    appeal:
      "落ち着いた住宅街にある隠れ家的カフェ。常連の飼い主さんが多く、犬同士の交流も自然に生まれます。",
    rules: "店内は静かに過ごせる方優先。多頭飼いの場合は事前にご相談ください。",
    priceMenu: "本日のスイーツセット 950円",
    address: "東京都板橋区常盤台〇-〇",
    lat: 35.7565,
    lng: 139.6797,
    placeId: "",
    phone: "03-3456-7890",
    businessHours: "9:30〜18:00（不定休）",
    payment: "現金、PayPay",
    access: "ときわ台駅 徒歩3分",
    rating: 4.6,
  },
  {
    id: "shop_004",
    createdAt: "2026-01-18T00:00:00.000Z",
    updatedAt: "2026-01-18T00:00:00.000Z",
    name: "城北中央公園 ドッグラン",
    category: ["ドッグラン"],
    mainImage: img("Dog Run"),
    tags: ["大型犬OK", "駐車場あり"],
    appeal:
      "板橋区を代表する広大なドッグラン。大型犬専用エリアと小型犬専用エリアが分かれており、安心して遊ばせられます。",
    rules: "ワクチン接種証明書の提示が必要な場合があります。利用は無料です。",
    address: "東京都板橋区赤塚〇-〇",
    lat: 35.7766,
    lng: 139.6489,
    placeId: "",
    businessHours: "9:00〜17:00（年末年始休み）",
    access: "上板橋駅 徒歩15分",
    rating: 4.7,
  },
  {
    id: "shop_005",
    createdAt: "2026-01-20T00:00:00.000Z",
    updatedAt: "2026-01-20T00:00:00.000Z",
    name: "トリミングサロン Wan's",
    category: ["トリミングサロン"],
    mainImage: img("Trimming Salon"),
    tags: ["小型犬専用エリアあり", "ネット予約可"],
    appeal:
      "板橋区で15年続く老舗トリミングサロン。シニア犬や持病のある子にも丁寧に対応します。",
    rules: "完全予約制。当日キャンセルはキャンセル料が発生します。",
    priceMenu: "トリミング（小型犬） 6000円〜",
    address: "東京都板橋区大山東町〇-〇",
    lat: 35.7531,
    lng: 139.7115,
    placeId: "",
    phone: "03-4567-8901",
    businessHours: "10:00〜19:00（木曜定休）",
    payment: "現金、クレジットカード可",
    access: "大山駅 徒歩3分",
    rating: 4.9,
    isRecommended: true,
  },
  {
    id: "shop_006",
    createdAt: "2026-01-22T00:00:00.000Z",
    updatedAt: "2026-01-22T00:00:00.000Z",
    name: "板橋どうぶつ病院",
    category: ["病院"],
    mainImage: img("Animal Hospital"),
    tags: ["駐車場あり", "ネット予約可"],
    appeal: "夜間救急対応も行う地域密着の動物病院。初診の方も相談しやすい雰囲気です。",
    rules: "初診の方は問診票の事前記入をお願いしています。",
    address: "東京都板橋区本町〇-〇",
    lat: 35.7497,
    lng: 139.7031,
    placeId: "",
    phone: "03-5678-9012",
    businessHours: "9:00〜19:00（日祝休診）",
    payment: "現金、クレジットカード可",
    access: "板橋本町駅 徒歩6分",
    rating: 4.4,
  },
];

export function getShopById(id: string): Shop | undefined {
  return MOCK_SHOPS.find((shop) => shop.id === id);
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: "article_001",
    createdAt: "2026-06-20T00:00:00.000Z",
    updatedAt: "2026-06-28T00:00:00.000Z",
    publishedAt: "2026-06-28T00:00:00.000Z",
    title: "板橋区の泥だらけにならない室内ドッグラン＆併設カフェ3選",
    mainImage: img("Article Indoor Dogrun", 1200, 600),
    category: "まとめ",
    content: [
      {
        fieldId: "text",
        text: "<p>雨の日や暑い夏の日、ワンちゃんの運動不足解消に困っていませんか？今回は板橋区内にある、天候に左右されず快適に遊べる室内ドッグランと、そのまま休める併設カフェを厳選してご紹介します！</p>",
      },
      {
        fieldId: "text",
        text: "<h2>1. 小型犬に優しいクッションフロア完備</h2>",
      },
      {
        fieldId: "shop",
        shop: [getShopById("shop_001")!],
      },
      {
        fieldId: "text",
        text: "<p>ここのドッグランは全面クッションフロアになっており、小型犬の足腰にも優しいのが特徴です。遊び終わった後は、併設のカフェスペースで特製ワンバーグを楽しむことができますよ。</p>",
      },
      {
        fieldId: "text",
        text: "<h2>2. 大型犬もゆったり過ごせるテラス完備カフェ</h2>",
      },
      {
        fieldId: "shop",
        shop: [getShopById("shop_002")!],
      },
      {
        fieldId: "text",
        text: "<p>開放的なテラス席があるので、大型犬を連れている方にもおすすめです。週末は混み合うので予約しておくと安心です。</p>",
      },
    ],
  },
  {
    id: "article_002",
    createdAt: "2026-06-10T00:00:00.000Z",
    updatedAt: "2026-06-10T00:00:00.000Z",
    publishedAt: "2026-06-10T00:00:00.000Z",
    title: "大山エリアで絶対外さない！おすすめドッグカフェ5選",
    mainImage: img("Article Oyama Cafe", 1200, 600),
    category: "まとめ",
    content: [
      {
        fieldId: "text",
        text: "<p>大山駅周辺は商店街も近く、お散歩帰りに立ち寄れるドッグカフェが充実しています。今回は飼い主さん目線でリアルにおすすめできる5店舗をご紹介します。</p>",
      },
      {
        fieldId: "shop",
        shop: [getShopById("shop_001")!],
      },
      {
        fieldId: "text",
        text: "<p>大山駅から徒歩5分というアクセスの良さも魅力。買い物帰りにも立ち寄りやすいお店です。</p>",
      },
      {
        fieldId: "shop",
        shop: [getShopById("shop_005")!],
      },
      {
        fieldId: "text",
        text: "<p>カフェのついでにトリミングの予約をしておくのもおすすめの動線です。</p>",
      },
    ],
  },
  {
    id: "article_003",
    createdAt: "2026-05-28T00:00:00.000Z",
    updatedAt: "2026-05-28T00:00:00.000Z",
    publishedAt: "2026-05-28T00:00:00.000Z",
    title: "サロンオーナーに聞く、シニア犬トリミングのこだわり",
    mainImage: img("Article Interview", 1200, 600),
    category: "インタビュー",
    content: [
      {
        fieldId: "text",
        text: "<p>板橋区で15年続くトリミングサロン「Wan's」のオーナーに、シニア犬のトリミングで気をつけていることをお聞きしました。</p>",
      },
      {
        fieldId: "shop",
        shop: [getShopById("shop_005")!],
      },
      {
        fieldId: "text",
        text: "<p>「無理な体勢を取らせないことが一番大切です」と語るオーナー。持病のある子への対応についても詳しく教えていただきました。</p>",
      },
    ],
  },
];

export function getArticleById(id: string): Article | undefined {
  return MOCK_ARTICLES.find((article) => article.id === id);
}
