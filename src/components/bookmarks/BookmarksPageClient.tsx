"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useBookmarkStore } from "@/store/bookmarkStore";
import ShopCard from "@/components/shop/ShopCard";
import type { Shop } from "@/lib/types";

export default function BookmarksPageClient({ shops }: { shops: Shop[] }) {
  const [mounted, setMounted] = useState(false);
  const ids = useBookmarkStore((state) => state.ids);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bookmarkedShops = shops.filter((shop) => ids.includes(shop.id));

  if (bookmarkedShops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 text-gray-400 gap-3">
        <FontAwesomeIcon icon={faBookmark} className="text-4xl" />
        <p className="text-sm font-bold">まだ保存したスポットがありません</p>
        <p className="text-xs">気になるお店の保存アイコンをタップして、お出かけリストを作りましょう。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {bookmarkedShops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} detailed />
      ))}
    </div>
  );
}
