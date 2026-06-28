import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CATEGORY_ICONS } from "@/lib/constants";
import type { ShopCategory } from "@/lib/types";

export default function CategoryLink({ category }: { category: ShopCategory }) {
  const icon = CATEGORY_ICONS[category];

  return (
    <Link
      href={`/search?category=${encodeURIComponent(category)}`}
      className="flex flex-col items-center gap-1 lg:gap-2 min-w-[60px] group"
    >
      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 lg:bg-white lg:border lg:border-gray-200 rounded-full lg:rounded-2xl flex items-center justify-center text-gray-500 text-lg lg:text-2xl group-hover:bg-brand group-hover:text-white transition">
        <FontAwesomeIcon icon={icon} />
      </div>
      <span className="text-xs lg:text-sm font-bold text-gray-700">{category}</span>
    </Link>
  );
}
