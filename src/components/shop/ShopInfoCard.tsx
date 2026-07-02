import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSquareParking,
  faPhone,
  faLocationArrow,
  faCreditCard,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import LazyMapView from "@/components/map/LazyMapView";
import type { Shop } from "@/lib/types";

function buildDirectionsUrl(shop: Shop) {
  if (shop.placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}&destination_place_id=${shop.placeId}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;
}

export default function ShopInfoCard({ shop }: { shop: Shop }) {
  return (
    <div className="bg-white border border-gray-200 p-5 lg:p-6 rounded-2xl shadow-sm">
      <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
        店舗情報
      </h3>

      <div className="space-y-4 text-sm text-gray-700 mb-6">
        <div className="flex items-start">
          <FontAwesomeIcon icon={faClock} className="w-6 text-gray-400 mt-0.5 text-center" />
          <p className="font-bold text-gray-900">{shop.businessHours}</p>
        </div>
        <div className="flex items-start">
          <FontAwesomeIcon icon={faPhone} className="w-6 text-gray-400 mt-0.5 text-center" />
          {shop.phone ? (
            <a href={`tel:${shop.phone}`} className="hover:text-brand">
              {shop.phone}
            </a>
          ) : (
            <p>非公開</p>
          )}
        </div>
        {shop.tags?.includes("駐車場あり") && (
          <div className="flex items-start">
            <FontAwesomeIcon
              icon={faSquareParking}
              className="w-6 text-gray-400 mt-0.5 text-center"
            />
            <p>駐車場あり</p>
          </div>
        )}
        {shop.payment && (
          <div className="flex items-start">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="w-6 text-gray-400 mt-0.5 text-center"
            />
            <p>{shop.payment}</p>
          </div>
        )}
      </div>

      <div className="w-full h-32 rounded-lg mb-3 overflow-hidden border border-gray-200">
        <LazyMapView shops={[shop]} height="100%" />
      </div>
      <p className="text-xs text-gray-500 mb-6 flex">
        <FontAwesomeIcon icon={faLocationArrow} className="mr-1.5 mt-0.5 text-brand" />
        <span>{shop.address}</span>
      </p>

      <a
        href={buildDirectionsUrl(shop)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-brand text-white font-bold py-3 rounded-xl shadow-md text-sm flex items-center justify-center hover:bg-brand/90 transition"
      >
        <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
        Googleマップで経路案内
      </a>

      {(shop.websiteUrl || shop.instagramUrl) && (
        <div className="flex gap-2 mt-3">
          {shop.websiteUrl && (
            <a
              href={shop.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faGlobe} />
              公式HP
            </a>
          )}
          {shop.instagramUrl && (
            <a
              href={shop.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-pink-500" />
              Instagram
            </a>
          )}
        </div>
      )}
    </div>
  );
}
