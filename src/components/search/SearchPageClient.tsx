"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import FilterBar from "./FilterBar";
import ShopCard from "@/components/shop/ShopCard";
import LazyMapView from "@/components/map/LazyMapView";
import Pagination from "@/components/ui/Pagination";
import { PAGE_SIZE } from "@/lib/constants";
import type { Shop, ShopCategory, ShopTag } from "@/lib/types";

function parseTags(value: string | null): ShopTag[] {
  if (!value) return [];
  return value.split(",").filter(Boolean) as ShopTag[];
}

export default function SearchPageClient({ shops }: { shops: Shop[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"list" | "map">("list");
  const [mapLoaded, setMapLoaded] = useState(false);

  // PC幅(lg以上)では地図を分割表示するため最初からロードし、
  // モバイルでは「マップ」タブを押した時だけ遅延ロードする（コスト最適化要件）
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    if (mql.matches) setMapLoaded(true);
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMapLoaded(true);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (view === "map") setMapLoaded(true);
  }, [view]);

  const selectedCategory = (searchParams.get("category") || undefined) as
    | ShopCategory
    | undefined;
  const selectedTags = parseTags(searchParams.get("tags"));
  const [selectedShopId, setSelectedShopId] = useState<string | undefined>(undefined);

  const updateParams = (category?: ShopCategory, tags?: ShopTag[], page = 1) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tags && tags.length > 0) params.set("tags", tags.join(","));
    if (page > 1) params.set("page", String(page));
    router.replace(`/search${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  // フィルタ条件を変えたときは1ページ目に戻す
  const handleToggleCategory = (category: ShopCategory) => {
    updateParams(selectedCategory === category ? undefined : category, selectedTags);
  };

  const handleToggleTag = (tag: ShopTag) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    updateParams(selectedCategory, next);
  };

  const getPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (page > 1) params.set("page", String(page));
    return `/search${params.toString() ? `?${params}` : ""}`;
  };

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      if (selectedCategory && !shop.category.includes(selectedCategory)) return false;
      if (selectedTags.length > 0) {
        const shopTags = shop.tags || [];
        if (!selectedTags.every((tag) => shopTags.includes(tag))) return false;
      }
      return true;
    });
  }, [shops, selectedCategory, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filteredShops.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(searchParams.get("page")) || 1), totalPages);
  const pagedShops = useMemo(
    () => filteredShops.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredShops, currentPage]
  );

  const heading = selectedCategory
    ? `板橋区周辺の${selectedCategory}（${filteredShops.length}件）`
    : `板橋区周辺のスポット（${filteredShops.length}件）`;

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] lg:h-[calc(100vh-73px)]">
      {/* モバイル: リスト/マップ切替タブ */}
      <div className="lg:hidden bg-white px-4 py-2 border-b border-gray-100 flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-bold">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-1.5 rounded flex items-center gap-1 ${
              view === "list" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faList} />
            リスト
          </button>
          <button
            onClick={() => setView("map")}
            className={`px-4 py-1.5 rounded flex items-center gap-1 ${
              view === "map" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faMap} />
            マップ
          </button>
        </div>
      </div>

      <FilterBar
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        onToggleCategory={handleToggleCategory}
        onToggleTag={handleToggleTag}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* リスト */}
        <div
          className={`overflow-y-auto no-scrollbar p-4 lg:p-8 bg-gray-50 w-full lg:w-[55%] ${
            view === "map" ? "hidden lg:block" : "block"
          }`}
        >
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">{heading}</h2>
          {pagedShops.length === 0 ? (
            <p className="text-sm text-gray-500">条件に合うスポットが見つかりませんでした。</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {pagedShops.map((shop) => (
                <div
                  key={shop.id}
                  onMouseEnter={() => setSelectedShopId(shop.id)}
                >
                  <ShopCard shop={shop} detailed />
                </div>
              ))}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} getHref={getPageHref} />
        </div>

        {/* マップ */}
        <div
          className={`relative bg-gray-200 border-l border-gray-300 w-full lg:w-[45%] ${
            view === "list" ? "hidden lg:block" : "block"
          }`}
        >
          {mapLoaded && (
            <LazyMapView
              shops={pagedShops}
              selectedShopId={selectedShopId}
              height="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}
