import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav
      aria-label="パンくずリスト"
      className={`flex items-center flex-wrap gap-1 text-xs text-gray-500 px-5 lg:px-8 py-2.5 bg-white border-b border-gray-100 ${className ?? ""}`}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <FontAwesomeIcon icon={faChevronRight} className="text-[9px] text-gray-300 mx-0.5" />
          )}
          {item.href ? (
            <Link href={item.href} className="hover:text-brand transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium truncate max-w-[180px] lg:max-w-[320px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
