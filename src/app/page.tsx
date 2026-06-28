import Link from "next/link";
import { getAllArticles, getAllShops } from "@/lib/microcms";
import { FEATURED_TAGS } from "@/lib/constants";
import { SHOP_CATEGORIES } from "@/lib/types";
import CategoryLink from "@/components/filters/CategoryLink";
import TagLink from "@/components/filters/TagLink";
import ShopCard from "@/components/shop/ShopCard";
import ArticleCard from "@/components/article/ArticleCard";

export default async function HomePage() {
  const [shops, articles] = await Promise.all([getAllShops(), getAllArticles()]);
  const newShops = shops.slice(0, 6);
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="bg-gray-50">
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
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 mb-3">こだわり条件で一発検索</p>
              <div className="flex flex-wrap gap-2">
                {FEATURED_TAGS.map((tag) => (
                  <TagLink key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* メインカラム: 新着スポット */}
          <div className="flex-1 order-2 lg:order-1">
            <h2 className="text-base lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6 flex justify-between items-end">
              新着・おすすめスポット
              <Link href="/search" className="text-sm text-brand font-medium hover:underline">
                すべて見る
              </Link>
            </h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 lg:hidden">
              {newShops.map((shop) => (
                <div key={shop.id} className="min-w-[220px]">
                  <ShopCard shop={shop} />
                </div>
              ))}
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-6">
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
            <div className="flex flex-col gap-4 lg:gap-5">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
