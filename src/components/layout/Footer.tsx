import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const NAV_LINKS = [
  { label: "スポット検索", href: "/search" },
  { label: "特集記事", href: "/articles" },
  { label: "お気に入り", href: "/bookmarks" },
];

const SUPPORT_LINKS = [
  { label: "お問い合わせ", href: "/contact" },
  { label: "掲載のご依頼", href: "/contact?type=listing" },
  { label: "個人情報保護方針", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      {/* PC: 3カラム */}
      <div className="hidden lg:block max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-white font-black text-xl mb-3">
              <FontAwesomeIcon icon={faPaw} className="text-brand" />
              DOG ROUTE
            </Link>
            <p className="text-sm leading-relaxed">
              板橋区の愛犬家のための<br />スポット情報メディア
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">メニュー</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">サポート</p>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-xs text-center">
          © {new Date().getFullYear()} DOG ROUTE. All rights reserved.
        </div>
      </div>

      {/* モバイル: BottomNavがあるため最小限 */}
      <div className="lg:hidden px-5 py-6 flex flex-col items-center gap-4 text-xs">
        <div className="flex gap-5">
          {SUPPORT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition">
              {link.label}
            </Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} DOG ROUTE</p>
      </div>
    </footer>
  );
}
