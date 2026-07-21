import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  getHref: (page: number) => string;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

const circleBase = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition";

export default function Pagination({ currentPage, totalPages, getHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex justify-center items-center gap-2 mt-8 lg:mt-12">
      {/* 前へ */}
      {currentPage === 1 ? (
        <span className={`${circleBase} border-gray-200 text-gray-300 cursor-default`}>
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </span>
      ) : (
        <Link href={getHref(currentPage - 1)} className={`${circleBase} border-gray-300 text-gray-500 hover:bg-gray-50`}>
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </Link>
      )}

      {/* ページ番号 */}
      {pageNumbers.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${circleBase} ${
              page === currentPage
                ? "bg-brand border-brand text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* 次へ */}
      {currentPage === totalPages ? (
        <span className={`${circleBase} border-gray-200 text-gray-300 cursor-default`}>
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </span>
      ) : (
        <Link href={getHref(currentPage + 1)} className={`${circleBase} border-gray-300 text-gray-500 hover:bg-gray-50`}>
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </Link>
      )}
    </nav>
  );
}
