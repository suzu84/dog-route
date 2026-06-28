"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "./BookmarkButton";

export default function ShopDetailMobileHeader({ shopId }: { shopId: string }) {
  const router = useRouter();

  return (
    <div className="lg:hidden absolute top-4 left-0 w-full px-5 z-20 flex justify-between items-center">
      <button
        onClick={() => router.back()}
        aria-label="戻る"
        className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-800 shadow-sm"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <BookmarkButton
        shopId={shopId}
        variant="button"
        className="bg-white/90 backdrop-blur shadow-sm"
      />
    </div>
  );
}
