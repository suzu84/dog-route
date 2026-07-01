"use client";

import { useRouter } from "next/navigation";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faPaw } from "@fortawesome/free-solid-svg-icons";
import type { Shop } from "@/lib/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

const DEFAULT_CENTER = { lat: 35.7556, lng: 139.7093 };

interface MapViewProps {
  shops: Shop[];
  selectedShopId?: string;
  onSelectShop?: (id: string) => void;
  height?: string;
}

function MapPlaceholder({ height }: { height: string }) {
  return (
    <div
      className="w-full bg-gray-100 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 gap-2 p-6 text-center"
      style={{ height }}
    >
      <FontAwesomeIcon icon={faMapLocationDot} className="text-3xl" />
      <p className="text-sm font-bold">地図機能は準備中です</p>
      <p className="text-xs">
        Google Maps APIキーを設定すると、店舗ピンが表示されます。
      </p>
    </div>
  );
}

function PawMarker({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
      <div
        className={`w-10 h-10 rounded-full shadow-lg border-2 border-white flex items-center justify-center ${
          isSelected ? "bg-brand" : "bg-gray-800"
        }`}
      >
        <FontAwesomeIcon icon={faPaw} className="text-white text-base" />
      </div>
      {/* ピンの尾 */}
      <div
        className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent ${
          isSelected ? "border-t-brand" : "border-t-gray-800"
        }`}
      />
    </div>
  );
}

export default function MapView({
  shops,
  selectedShopId,
  onSelectShop,
  height = "100%",
}: MapViewProps) {
  const router = useRouter();

  if (!GOOGLE_MAPS_API_KEY) {
    return <MapPlaceholder height={height} />;
  }

  // 店舗詳細など1件表示の場合はその座標を中心に
  const isSingle = shops.length === 1;
  const center = isSingle
    ? { lat: shops[0].lat, lng: shops[0].lng }
    : DEFAULT_CENTER;
  const zoom = isSingle ? 17 : 13;

  return (
    <div style={{ height }} className="w-full">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={GOOGLE_MAPS_MAP_ID}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
        >
          {shops.map((shop) => (
            <AdvancedMarker
              key={shop.id}
              position={{ lat: shop.lat, lng: shop.lng }}
              onClick={() => {
                if (onSelectShop) {
                  onSelectShop(shop.id);
                } else {
                  router.push(`/shop/${shop.id}`);
                }
              }}
            >
              <PawMarker isSelected={shop.id === selectedShopId} />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
