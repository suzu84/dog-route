import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "./BookmarkButton";
import TagBadge from "./TagBadge";
import { CATEGORY_ICONS } from "@/lib/constants";
import type { Shop } from "@/lib/types";

interface ShopCardProps {
  shop: Shop;
  /** trueの場合、説明文を表示する大きめのカード(検索結果向け) */
  detailed?: boolean;
  /** 見出しレベル。ページのh1直下ならh2、h2セクション配下ならh3 */
  headingLevel?: 2 | 3;
}

export default function ShopCard({ shop, detailed = false, headingLevel = 3 }: ShopCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link
      href={`/shop/${shop.id}`}
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
    >
      <div className={`relative w-full overflow-hidden ${detailed ? "h-48" : "h-40"}`}>
        <Image
          src={shop.mainImage.url}
          alt={shop.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <BookmarkButton shopId={shop.id} className="absolute top-3 right-3 z-10" />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-1.5">
          {shop.category.map((cat) => (
            <span key={cat} className="inline-flex items-center gap-1 bg-brand text-white text-xs font-bold px-2 py-0.5 rounded">
              {CATEGORY_ICONS[cat] && <FontAwesomeIcon icon={CATEGORY_ICONS[cat]} className="text-[10px]" />}
              {cat}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-start mb-1 gap-2">
          <Heading className="text-sm lg:text-base font-bold text-gray-800">{shop.name}</Heading>
          {shop.rating && (
            <span className="text-xs font-bold text-gray-800 flex items-center shrink-0">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
              {shop.rating}
            </span>
          )}
        </div>
        {shop.access && (
          <p className="text-xs text-gray-500 mb-2 flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
            {shop.access}
          </p>
        )}
        {shop.tags && (
          <div className="flex gap-1 flex-wrap">
            {shop.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
