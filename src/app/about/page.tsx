import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AboutSlider from "@/components/about/AboutSlider";

export const metadata: Metadata = {
  title: "DOG ROUTE（ドッグルート）とは？",
  description:
    "DOG ROUTE（ドッグルート）は、板橋区の犬関連情報に特化した地域密着型ポータルサイトです。立ち上げの経緯や掲載依頼についてご紹介します。",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── MV ── */}
      <section className="relative w-full h-[300px] lg:h-[500px] overflow-hidden">
        <Image
          src="/images/about/about-mv.jpg"
          alt="まだ知らない、板橋のわんこスポットへ。"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* 左から白グラデーション */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="absolute inset-0 flex items-start pt-[50px] lg:pt-[100px]">
          <div className="px-8 lg:px-[183px]">
            <h1
              className="font-bold text-gray-900 text-2xl lg:text-[36px] leading-snug lg:leading-normal"
              style={{
                fontFamily: "'M PLUS 1', sans-serif",
                textShadow: "1px 2px 6px rgba(255,255,255,0.9), 0 1px 4px rgba(255,255,255,0.8)",
              }}
            >
              まだ知らない、
              <br />
              板橋の&#34;わんこスポット&#34;へ。
            </h1>
          </div>
        </div>
      </section>

      {/* ── DOG ROUTEとは？ ── */}
      <section className="py-16 lg:py-20 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 lg:gap-10">
          {/* 見出し */}
          <div className="flex items-center gap-2 justify-center">
            <span className="text-3xl lg:text-[41px]">🐾</span>
            <h2
              className="text-2xl lg:text-[30px] font-bold text-brand"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              DOG ROUTE<span className="lg:hidden"><br /></span>(ドッグルート)とは？
            </h2>
          </div>

          {/* テキスト */}
          <div className="flex flex-col gap-4">
            <p className="text-base text-gray-900 leading-relaxed">
              DOG ROUTE（ドッグルート）は、板橋区の犬関連の情報取得におすすめの地域密着型ポータルサイトです。
              当サイトでは、板橋区内および周辺エリアの愛犬家に向けて、以下の施設情報を網羅・配信しています。
            </p>

            {/* リストボックス */}
            <ul className="bg-[#fde8d9] border border-brand rounded-xl p-4 lg:p-5 text-base text-gray-900 leading-relaxed space-y-2 list-none">
              <li className="flex items-start gap-1">
                <span className="shrink-0">・</span>
                <span>板橋区の動物病院: 日曜診療や救急対応などの頼れるかかりつけ医情報</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="shrink-0">・</span>
                <span>板橋区のトリミングサロン: 大型犬対応やこだわりのケアメニュー</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="shrink-0">・</span>
                <span>板橋区のドッグラン: 屋内・屋外、貸切利用などの施設ルール</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="shrink-0">・</span>
                <span>板橋区のドッグカフェ・レストラン: テラス席や犬用メニューの有無</span>
              </li>
            </ul>

            <p className="text-base text-gray-900 leading-relaxed">
              飼い主目線のリアルな情報を集約し、愛犬とのお出かけをサポートします。
            </p>
          </div>

          {/* スライダー */}
          <AboutSlider />
        </div>
      </section>

      {/* ── 立ち上げの経緯 ── */}
      <section className="py-16 lg:py-20 px-5 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 lg:gap-10">
          {/* 見出し */}
          <div className="flex items-center gap-2 justify-center">
            <span className="text-3xl lg:text-[41px]">🐾</span>
            <h2
              className="text-2xl lg:text-[30px] font-bold text-brand"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              立ち上げの経緯
            </h2>
          </div>

          {/* 2カラム: SP縦積み / PC横並び */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* 左: 画像 */}
            <div className="relative w-full lg:w-[420px] lg:shrink-0 h-[260px] lg:h-[350px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about/image01.jpg"
                alt="立ち上げの経緯"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>

            {/* 右: テキスト */}
            <div className="flex flex-col gap-5 flex-1">
              <h3
                className="text-xl lg:text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                愛犬との暮らしに選択肢を。
              </h3>
              <div
                className="text-base text-gray-900 leading-relaxed space-y-4"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                <p>
                  はじめまして！DOG ROUTE（ドッグルート）運営局です。
                  私自身、板橋区で妻と愛犬ノアと一緒に暮らす一人の飼い主です。
                </p>
                <p>
                  休日にいざ「愛犬と一緒に過ごせる場所」を探そうとしても、ネット上には知りたい情報が散らばっており、お店のリアルなルール（カート入店はOKか？マナーウェアは必須か？駐車場はあるのか？）がわからず、店舗利用に困っていた……そんなもどかしさを抱えていました。
                </p>
                <p>
                  「それなら、自分で板橋区に特化した愛犬家のための情報データベースを作ろう！」
                  そう思い立ち、本業のWeb制作の知識を活かして立ち上げたのが、この『DOG ROUTE（ドッグルート）』です。
                </p>
                <p>
                  ペットの一生は、人よりもずっと短いからこそ、家族で過ごす時間を1秒でも豊かにしたい。
                  有名なお店だけでなく、Googleマップにも載っていないような地元の素敵な隠れ家スポットも、飼い主のリアルな声とともに発信していきたいとおもいます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 掲載依頼 ── */}
      <section className="bg-[#fde8d9] py-16 lg:py-20 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center text-center">
          {/* 見出し */}
          <div className="flex items-center gap-2 justify-center">
            <span className="text-3xl lg:text-[41px]">🐾</span>
            <h2
              className="text-2xl lg:text-[30px] font-bold text-brand"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              掲載依頼をご希望の<span className="lg:hidden"><br /></span>店舗・施設向け
            </h2>
          </div>

          <p
            className="text-base text-gray-900 leading-relaxed max-w-2xl"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            DOG ROUTE（ドッグルート）に掲載されていない店舗や施設がございましたら、お気軽に以下よりお問い合わせください。
            <br />
            掲載料は無料となっておりますので、ご安心ください。
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand text-white font-bold text-base hover:bg-white hover:text-brand border-2 border-brand transition"
          >
            掲載依頼をする
          </Link>
        </div>
      </section>
    </div>
  );
}
