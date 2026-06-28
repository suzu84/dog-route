"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useBookmarkStore } from "@/store/bookmarkStore";

interface BookmarkButtonProps {
  shopId: string;
  variant?: "icon" | "button";
  className?: string;
}

export default function BookmarkButton({
  shopId,
  variant = "icon",
  className = "",
}: BookmarkButtonProps) {
  const [mounted, setMounted] = useState(false);
  const isBookmarked = useBookmarkStore((state) => state.isBookmarked(shopId));
  const toggle = useBookmarkStore((state) => state.toggle);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bookmarked = mounted && isBookmarked;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(shopId);
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        aria-pressed={bookmarked}
        className={`px-4 py-2 border rounded-lg text-sm font-bold flex items-center transition ${
          bookmarked
            ? "border-brand text-brand bg-brand-light"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        } ${className}`}
      >
        <FontAwesomeIcon
          icon={bookmarked ? faBookmarkSolid : faBookmarkRegular}
          className="mr-2"
        />
        保存
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label="保存"
      className={`w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition ${
        bookmarked ? "text-brand" : "text-gray-400 hover:text-brand"
      } ${className}`}
    >
      <FontAwesomeIcon icon={bookmarked ? faBookmarkSolid : faBookmarkRegular} />
    </button>
  );
}
