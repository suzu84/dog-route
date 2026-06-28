import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "@/components/shop/BookmarkButton";
import TagBadge from "@/components/shop/TagBadge";
import type { Shop } from "@/lib/types";

export default function ShopEmbedBlock({ shop }: { shop: Shop }) {
  return (
    <div className="my-6 lg:my-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row sm:h-48 hover:shadow-md transition">
        <div className="relative w-full h-40 sm:w-2/5 sm:h-full shrink-0">
          <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
            紹介店舗
          </span>
          <Image
            src={shop.mainImage.url}
            alt={shop.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 300px"
          />
        </div>
        <div className="w-full sm:w-3/5 p-4 lg:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">{shop.name}</h3>
            {shop.access && (
              <p className="text-sm text-gray-500 mb-3 flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                {shop.access}
              </p>
            )}
            <div className="flex gap-1.5 flex-wrap">
              {shop.tags?.slice(0, 2).map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Link
              href={`/shop/${shop.id}`}
              className="text-sm font-bold text-brand hover:underline"
            >
              店舗詳細を見る
              <FontAwesomeIcon icon={faChevronRight} className="text-xs ml-1" />
            </Link>
            <BookmarkButton shopId={shop.id} variant="button" />
          </div>
        </div>
      </div>
    </div>
  );
}
