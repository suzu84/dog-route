import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { getAllArticles, getAllShops } from "@/lib/microcms";
import { SHOP_CATEGORIES } from "@/lib/types";
import CategoryLink from "@/components/filters/CategoryLink";
import TagsSection from "@/components/filters/TagsSection";
import ShopCard from "@/components/shop/ShopCard";
import ArticleCard from "@/components/article/ArticleCard";
import IntroAnimation from "@/components/intro/IntroAnimation";

// お知らせを追加する場合はここに追記する（新しいものを先頭に）
const NOTICES = [
  {
    date: "2026.07.19",
    body: "店舗の掲載依頼や掲載内容の変更やご要望は",
    linkLabel: "お問い合わせ",
    linkHref: "/contact?type=listing",
    bodySuffix: "よりお願いします。",
  },
  {
    date: "2026.07.02",
    body: "板橋区を中心とした情報メディア「DOG ROUTE」を開設しました！店舗や施設の掲載依頼・HP制作依頼等は",
    linkLabel: "お問い合わせ",
    linkHref: "/contact",
    bodySuffix: "よりご連絡ください。",
  },
];

export default async function HomePage() {
  const [shops, articles] = await Promise.all([getAllShops(), getAllArticles()]);
  const newShops = shops.slice(0, 6);
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="bg-gray-50">
      <IntroAnimation />
      <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-6 lg:pt-10 pb-10">
        {/* 検索パネル */}
        <div className="bg-white p-5 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 mb-8 lg:mb-12">
          <h2 className="text-base lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">
            なにをお探しですか？
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center">
            <div className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar">
              {SHOP_CATEGORIES.map((category) => (
                <CategoryLink key={category} category={category} />
              ))}
            </div>
            <div className="hidden lg:block w-px h-20 bg-gray-200" />
            <TagsSection />
          </div>
        </div>

        {/* お知らせ */}
        {NOTICES.length > 0 && (
          <div className="mb-8 lg:mb-10 space-y-2">
            {NOTICES.map((notice, i) => (
              <div
                key={i}
                className="bg-brand-light border border-brand/20 rounded-xl px-4 py-3 flex items-start gap-3 text-sm text-gray-700"
              >
                <FontAwesomeIcon icon={faBullhorn} className="text-brand mt-0.5 shrink-0" />
                <p>
                  <span className="text-xs font-bold text-brand mr-2">{notice.date}</span>
                  {notice.body}
                  <Link href={notice.linkHref} className="underline font-bold hover:text-brand">
                    {notice.linkLabel}
                  </Link>
                  {notice.bodySuffix}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* メインカラム: 新着スポット */}
          <div className="flex-1 order-2 lg:order-1">
            <h2 className="text-base lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6 flex justify-between items-end">
              新着・おすすめスポット
              <Link href="/search" className="text-sm text-brand font-medium hover:underline">
                すべて見る
              </Link>
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {newShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>

          {/* サイドカラム: 注目の特集 */}
          <div className="lg:w-[300px] order-1 lg:order-2">
            <h2 className="text-base lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6 flex justify-between items-end">
              注目の特集
              <Link href="/articles" className="text-sm text-brand font-medium hover:underline lg:hidden">
                すべて見る
              </Link>
            </h2>
            {featuredArticles.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">
                現在、特集記事はありません
              </p>
            ) : (
              <>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 lg:hidden">
                  {featuredArticles.map((article) => (
                    <div key={article.id} className="min-w-[220px]">
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
                <div className="hidden lg:flex lg:flex-col gap-5">
                  {featuredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
