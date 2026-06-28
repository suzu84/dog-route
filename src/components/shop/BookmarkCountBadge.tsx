"use client";

import { useEffect, useState } from "react";
import { useBookmarkStore } from "@/store/bookmarkStore";

export default function BookmarkCountBadge() {
  const [mounted, setMounted] = useState(false);
  const count = useBookmarkStore((state) => state.ids.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || count === 0) return null;

  return (
    <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center px-1">
      {count}
    </span>
  );
}
