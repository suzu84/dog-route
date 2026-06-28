"use client";

import { useRouter } from "next/navigation";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CATEGORY_ICONS } from "@/lib/constants";
import type { Shop } from "@/lib/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

// 板橋区周辺のデフォルト中心地点
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

  return (
    <div style={{ height }} className="w-full">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={GOOGLE_MAPS_MAP_ID}
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={13}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
        >
          {shops.map((shop) => {
            const isSelected = shop.id === selectedShopId;
            return (
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
                <div
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full shadow-lg border-2 border-white text-xs font-bold cursor-pointer hover:scale-110 transition ${
                    isSelected ? "bg-brand text-white" : "bg-gray-900 text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={CATEGORY_ICONS[shop.category]} />
                  {shop.name}
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
}
