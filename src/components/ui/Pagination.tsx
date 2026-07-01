import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** ページ番号からリンク先URLを生成する */
  getHref: (page: number) => string;
}

export default function Pagination({ currentPage, totalPages, getHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-1.5 mt-8 lg:mt-12">
      <Link
        href={getHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border ${
          currentPage === 1
            ? "border-gray-200 text-gray-300 pointer-events-none"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={getHref(page)}
          aria-current={page === currentPage}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border ${
            page === currentPage
              ? "bg-brand text-white border-brand"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={getHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-300 pointer-events-none"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </nav>
  );
}
