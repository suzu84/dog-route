import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getAllShops, getArticlesByShopId, getShop } from "@/lib/microcms";
import TagBadge from "@/components/shop/TagBadge";
import BookmarkButton from "@/components/shop/BookmarkButton";
import RealReportBox from "@/components/shop/RealReportBox";
import InstagramSlider from "@/components/shop/InstagramSlider";
import ShopInfoCard from "@/components/shop/ShopInfoCard";
import ShopDetailMobileHeader from "@/components/shop/ShopDetailMobileHeader";
import ShopDetailMobileCta from "@/components/shop/ShopDetailMobileCta";
import ArticleCard from "@/components/article/ArticleCard";

interface ShopPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const shops = await getAllShops();
  return shops.map((shop) => ({ id: shop.id }));
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { id } = await params;
  const shop = await getShop(id);
  if (!shop) return {};

  return {
    title: shop.name,
    description: `${shop.name}（${shop.category.join("・")}・${shop.address}）の飼い主目線のリアルな情報。${(shop.appeal ?? "").replace(/<[^>]+>/g, "").slice(0, 80)}`,
  };
}

export default async function ShopDetailPage({ params }: ShopPageProps) {
  const { id } = await params;
  const shop = await getShop(id);
  if (!shop) notFound();

  const relatedArticles = await getArticlesByShopId(id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shop.name,
    image: shop.mainImage.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address,
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.lat,
      longitude: shop.lng,
    },
    telephone: shop.phone,
    openingHours: shop.businessHours,
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ShopDetailMobileHeader shopId={shop.id} />

      {/* ギャラリー */}
      <div className="relative w-full h-64 lg:h-[400px] lg:max-w-6xl lg:mx-auto lg:mt-8 lg:rounded-2xl overflow-hidden">
        <Image
          src={shop.mainImage.url}
          alt={shop.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 -mt-6 lg:mt-0 relative bg-white rounded-t-3xl lg:rounded-none pt-5 lg:pt-8 pb-28 lg:pb-16">
        {/* タイトルセクション */}
        <div className="flex justify-between items-end mb-6 gap-4">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {shop.tags?.map((tag) => (
                <TagBadge key={tag} tag={tag} size="md" />
              ))}
            </div>
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {shop.name}
            </h1>
            <p className="text-xs lg:text-sm text-gray-500 mt-2 flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
              {shop.address}
              {shop.access && `（${shop.access}）`}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <BookmarkButton shopId={shop.id} variant="button" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 左カラム */}
          <div className="flex-1">
            {shop.appeal && (
              <div className="mb-8 lg:mb-10">
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">
                  お店の魅力
                </h2>
                <div
                  className="prose prose-sm lg:prose-base max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: shop.appeal }}
                ></div>
              </div>
            )}

            <div className="mb-8 lg:mb-10">
              <RealReportBox html={shop.rules ?? ""} />
            </div>

            {shop.priceMenu && (
              <div className="mb-8 lg:mb-10">
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">
                  料金 / メニュー
                </h2>
                <div
                  className="bg-gray-50 p-4 rounded-xl prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: shop.priceMenu }}
                ></div>
              </div>
            )}

            {/* モバイル: 店舗情報（PCサイドバーと同内容） */}
            <div className="lg:hidden mb-8">
              <ShopInfoCard shop={shop} />
            </div>

            {shop.instagramPosts && shop.instagramPosts.length > 0 && (
              <div className="mb-8 lg:mb-10">
                <InstagramSlider posts={shop.instagramPosts} />
              </div>
            )}

            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
                  この記事にも登場しています
                </h2>
                <div className="flex flex-col gap-3 lg:w-[90%]">
                  {relatedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} layout="horizontal" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右サイドバー(PC) */}
          <div className="hidden lg:block w-[320px] shrink-0">
            <div className="sticky top-24">
              <ShopInfoCard shop={shop} />
            </div>
          </div>
        </div>

      </div>

      <ShopDetailMobileCta shop={shop} />
    </div>
  );
}
