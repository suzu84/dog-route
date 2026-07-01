import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAG_ICONS } from "@/lib/constants";
import type { ShopTag } from "@/lib/types";

export default function TagLink({ tag }: { tag: ShopTag }) {
  const icon = TAG_ICONS[tag];

  return (
    <Link
      href={`/search?tags=${encodeURIComponent(tag)}`}
      className="bg-gray-100 lg:bg-gray-100 border border-gray-200 text-gray-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs font-bold inline-flex items-center hover:bg-brand hover:text-white hover:border-brand transition"
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-1" />}
      {tag}
    </Link>
  );
}
