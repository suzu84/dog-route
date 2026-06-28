"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function ArticleDetailMobileHeader() {
  const router = useRouter();

  return (
    <div className="lg:hidden absolute top-4 left-5 z-20">
      <button
        onClick={() => router.back()}
        aria-label="戻る"
        className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-800 shadow-sm"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
}
