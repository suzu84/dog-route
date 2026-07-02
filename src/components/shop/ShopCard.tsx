import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "./BookmarkButton";
import TagBadge from "./TagBadge";
import type { Shop } from "@/lib/types";

interface ShopCardProps {
  shop: Shop;
  /** trueの場合、説明文を表示する大きめのカード(検索結果向け) */
  detailed?: boolean;
}

export default function ShopCard({ shop, detailed = false }: ShopCardProps) {
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
        {shop.tags && shop.tags.length > 0 && (
          <div className="absolute bottom-2 right-2 flex gap-1 z-10">
            <span className="bg-gray-900/80 text-white text-[10px] px-2 py-1 rounded font-bold">
              {shop.tags[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-sm lg:text-base font-bold text-gray-800">{shop.name}</h3>
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
