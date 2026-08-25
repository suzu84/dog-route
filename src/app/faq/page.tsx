import type { Metadata } from "next";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import FaqCategorySection from "@/components/faq/FaqCategorySection";

export const metadata: Metadata = {
  title: "よくあるご質問",
  description:
    "DOG ROUTE（ドッグルート）に寄せられる、板橋区のトリミングサロン・動物病院・ドッグラン・ペットホテル・カフェ/レストランに関するよくあるご質問をまとめました。",
};

export default function FaqPage() {
  return (
    <div className="bg-white">
      {/* ── h1 + アンカーリンク ── */}
      <section className="py-16 lg:py-20 px-5 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-10 lg:gap-14">
          <div className="flex flex-col items-center gap-2.5">
            <h1 className="text-2xl lg:text-[36px] font-bold text-brand">よくあるご質問</h1>
            <div className="w-[100px] h-[5px] bg-brand" />
          </div>

          <nav
            aria-label="カテゴリへ移動"
            className="w-full flex flex-wrap justify-center gap-x-5 gap-y-3 lg:gap-x-6"
          >
            {FAQ_CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 pb-1 border-b border-black text-sm lg:text-base text-black hover:text-brand hover:border-brand transition"
              >
                {category.label}
                <span aria-hidden className="text-xs">▾</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── カテゴリ別アコーディオン ── */}
      {FAQ_CATEGORIES.map((category) => (
        <FaqCategorySection key={category.id} {...category} />
      ))}

      {/* ── 掲載依頼 ── */}
      <section className="bg-white py-16 lg:py-20 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center text-center">
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
            DOG ROUTE（ドッグルート）に掲載されていない店舗や施設がございましたら、<br />
            お気軽に以下よりお問い合わせください。
            <br />
            ※掲載料は無料となっておりますので、ご安心ください。
          </p>

          <a
            href={`mailto:info@dogroute.jp?subject=${encodeURIComponent("[DOG ROUTE] 掲載のご依頼")}&body=${encodeURIComponent("お店の名前：\nご担当者名：\nメールアドレス：\n電話番号：\n住所：\n\nその他ご要望・ご質問：\n")}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand text-white font-bold text-base hover:bg-white hover:text-brand border-2 border-brand transition"
          >
            掲載依頼をする
          </a>
        </div>
      </section>
    </div>
  );
}
