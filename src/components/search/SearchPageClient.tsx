"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import FilterBar from "./FilterBar";
import ShopCard from "@/components/shop/ShopCard";
import LazyMapView from "@/components/map/LazyMapView";
import Pagination from "@/components/ui/Pagination";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CategoryLink from "@/components/filters/CategoryLink";
import { PAGE_SIZE, CATEGORY_SLUG_MAP } from "@/lib/constants";
import { SHOP_CATEGORIES } from "@/lib/types";
import type { Shop, ShopCategory, ShopTag } from "@/lib/types";

function parseTags(value: string | null): ShopTag[] {
  if (!value) return [];
  return value.split(",").filter(Boolean) as ShopTag[];
}

export default function SearchPageClient({
  shops,
  initialCategory,
}: {
  shops: Shop[];
  initialCategory?: ShopCategory;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"list" | "map">(
    () => (searchParams.get("view") === "map" ? "map" : "list")
  );
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

  const selectedCategory = initialCategory;
  const selectedTags = parseTags(searchParams.get("tags"));
  const [selectedShopId, setSelectedShopId] = useState<string | undefined>(undefined);

  const updateParams = (tags?: ShopTag[], page = 1) => {
    const params = new URLSearchParams();
    if (tags && tags.length > 0) params.set("tags", tags.join(","));
    if (page > 1) params.set("page", String(page));
    const query = params.toString() ? `?${params}` : "";
    if (selectedCategory) {
      const slug = CATEGORY_SLUG_MAP[selectedCategory];
      router.replace(`/search/itabashi/${slug}${query}`, { scroll: false });
    } else {
      router.replace(`/search${query}`, { scroll: false });
    }
  };

  const handleToggleTag = (tag: ShopTag) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    updateParams(next);
  };

  const getPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (page > 1) params.set("page", String(page));
    const query = params.toString() ? `?${params}` : "";
    if (selectedCategory) {
      const slug = CATEGORY_SLUG_MAP[selectedCategory];
      return `/search/itabashi/${slug}${query}`;
    }
    return `/search${query}`;
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
    ? `板橋区の${selectedCategory}一覧`
    : "板橋区のスポット一覧";

  const breadcrumbItems = selectedCategory
    ? [
        { label: "ホーム", href: "/" },
        { label: "スポット検索", href: "/search" },
        { label: selectedCategory },
      ]
    : [{ label: "ホーム", href: "/" }, { label: "スポット検索" }];

  return (
    // モバイルリスト表示: 高さ制約なし（通常ページフロー、フッターまでスクロール可）
    // モバイルマップ表示: ビューポート固定（マップが画面を埋める）
    // デスクトップ: 常にビューポート固定・左右分割
    <div className={`flex flex-col lg:h-[calc(100dvh-73px)] ${
      view === "map" ? "h-[calc(100dvh-57px)]" : ""
    }`}>
      {/* パンくず: モバイルマップ表示時は非表示 */}
      <div className={view === "map" ? "hidden lg:block" : "block"}>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

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

      {/* カテゴリパネル: /search/ のみ表示、モバイルマップ時は非表示 */}
      {!initialCategory && (
        <div className={`bg-white border-b border-gray-100 px-5 lg:px-8 py-4 ${
          view === "map" ? "hidden lg:block" : "block"
        }`}>
          <p className="text-sm font-bold text-gray-700 mb-3">カテゴリから探す</p>
          <div className="flex gap-5 lg:gap-8 overflow-x-auto no-scrollbar">
            {SHOP_CATEGORIES.map((cat) => (
              <CategoryLink key={cat} category={cat} />
            ))}
          </div>
        </div>
      )}

      <FilterBar
        selectedTags={selectedTags}
        onToggleTag={handleToggleTag}
      />

      {/* モバイルリスト: block（通常フロー）、モバイルマップ: flex flex-1、デスクトップ: flex flex-1 */}
      <div className={`lg:flex lg:flex-1 lg:overflow-hidden ${
        view === "map" ? "flex flex-1 overflow-hidden" : "block"
      }`}>
        {/* リスト */}
        <div
          className={`bg-gray-50 w-full lg:w-[55%] lg:overflow-y-auto lg:overscroll-contain lg:no-scrollbar lg:p-8 ${
            view === "map" ? "hidden" : "block p-4"
          }`}
        >
          <h1 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">{heading}</h1>
          <p className="text-xs text-gray-400 mb-4 lg:mb-6">{filteredShops.length}件</p>
          {pagedShops.length === 0 ? (
            <p className="text-sm text-gray-500">条件に合うスポットが見つかりませんでした。</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {pagedShops.map((shop) => (
                <div
                  key={shop.id}
                  onMouseEnter={() => setSelectedShopId(shop.id)}
                >
                  <ShopCard shop={shop} detailed headingLevel={2} />
                </div>
              ))}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} getHref={getPageHref} />
        </div>

        {/* マップ */}
        <div
          className={`relative bg-gray-200 lg:border-l lg:border-gray-300 lg:w-[45%] ${
            view === "list" ? "hidden lg:block" : "flex-1"
          }`}
        >
          {mapLoaded && (
            <LazyMapView
              shops={filteredShops}
              selectedShopId={selectedShopId}
              height="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}
