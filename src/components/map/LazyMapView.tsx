"use client";

import dynamic from "next/dynamic";
import type { Shop } from "@/lib/types";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse" />
  ),
});

interface LazyMapViewProps {
  shops: Shop[];
  selectedShopId?: string;
  onSelectShop?: (id: string) => void;
  height?: string;
}

export default function LazyMapView(props: LazyMapViewProps) {
  return <MapView {...props} />;
}
