import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import type { Shop } from "@/lib/types";

function buildDirectionsUrl(shop: Shop) {
  if (shop.placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}&destination_place_id=${shop.placeId}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;
}

export default function ShopDetailMobileCta({ shop }: { shop: Shop }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-20 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <a
        href={buildDirectionsUrl(shop)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-brand text-white font-bold py-3 rounded-xl shadow-md text-sm flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
        経路案内
      </a>
    </div>
  );
}
