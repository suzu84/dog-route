import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import type { Shop } from "@/lib/types";

function buildDirectionsUrl(shop: Shop) {
  if (shop.placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}&destination_place_id=${shop.placeId}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;
}

export default function ShopDetailMobileCta({ shop }: { shop: Shop }) {
  const hasLinks = shop.websiteUrl || shop.instagramUrl;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-20 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="flex gap-2">
        {shop.websiteUrl && (
          <a
            href={shop.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-1.5"
          >
            <FontAwesomeIcon icon={faGlobe} />
            HP
          </a>
        )}
        {shop.instagramUrl && (
          <a
            href={shop.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-1.5"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-pink-500" />
            Insta
          </a>
        )}
        <a
          href={buildDirectionsUrl(shop)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-brand text-white font-bold py-3 rounded-xl shadow-md text-sm flex items-center justify-center gap-2 ${hasLinks ? "flex-1" : "w-full"}`}
        >
          <FontAwesomeIcon icon={faLocationArrow} />
          経路案内
        </a>
      </div>
    </div>
  );
}
