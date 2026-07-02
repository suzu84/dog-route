"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMapLocationDot, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import BookmarkCountBadge from "@/components/shop/BookmarkCountBadge";

const ITEMS = [
  { href: "/", label: "ホーム", icon: faHouse },
  { href: "/search", label: "マップ", icon: faMapLocationDot },
  { href: "/articles", label: "特集記事", icon: faNewspaper },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-2 z-30">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center ${
            pathname === item.href ? "text-brand" : "text-gray-400"
          }`}
        >
          <FontAwesomeIcon icon={item.icon} className="text-lg mb-1" />
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}
      <Link
        href="/bookmarks"
        className={`flex flex-col items-center relative ${
          pathname === "/bookmarks" ? "text-brand" : "text-gray-400"
        }`}
      >
        <span className="relative">
          <FontAwesomeIcon icon={faBookmark} className="text-lg mb-1" />
          <BookmarkCountBadge />
        </span>
        <span className="text-[10px] font-bold">保存</span>
      </Link>
    </nav>
  );
}
