"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { SITE_NAME } from "@/lib/constants";
import BookmarkCountBadge from "@/components/shop/BookmarkCountBadge";

const NAV_LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "スポット検索" },
  { href: "/articles", label: "特集記事" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <Link
            href="/"
            className="text-lg lg:text-2xl font-bold text-gray-800 tracking-tight whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faPaw} className="text-brand mr-2" />
            {SITE_NAME}
          </Link>
          {pathname === "/" ? (
            <h1 className="border-l border-gray-200 pl-3 text-[10px] lg:text-[11px] text-gray-800 leading-snug">
              板橋区周辺の愛犬向け<br />総合情報メディアサイト
            </h1>
          ) : (
            <p className="border-l border-gray-200 pl-3 text-[10px] lg:text-[11px] text-gray-800 leading-snug">
              板橋区周辺の愛犬向け<br />総合情報メディアサイト
            </p>
          )}
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-brand"
                  : "hover:text-brand transition"
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/bookmarks"
            className={`relative flex items-center gap-2 ${
              pathname === "/bookmarks" ? "text-brand" : "text-gray-400 hover:text-brand"
            } transition`}
          >
            <span className="relative">
              <FontAwesomeIcon icon={faBookmark} className="text-lg" />
              <BookmarkCountBadge />
            </span>
            保存リスト
          </Link>
        </nav>
      </div>
    </header>
  );
}
