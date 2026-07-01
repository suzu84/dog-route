"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FEATURED_TAGS } from "@/lib/constants";
import { SHOP_TAGS } from "@/lib/types";
import TagLink from "./TagLink";

export default function TagsSection() {
  const [expanded, setExpanded] = useState(false);
  const extraTags = SHOP_TAGS.filter((tag) => !FEATURED_TAGS.includes(tag));

  return (
    <div className="flex-1">
      <p className="text-xs font-bold text-gray-500 mb-3">こだわり条件で一発検索</p>
      <div className="flex flex-wrap gap-2 items-center">
        {(expanded ? SHOP_TAGS : FEATURED_TAGS).map((tag) => (
          <TagLink key={tag} tag={tag} />
        ))}
        {extraTags.length > 0 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-xs font-bold text-brand border border-brand/40 bg-brand-light px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 hover:bg-brand hover:text-white transition shrink-0"
          >
            {expanded ? (
              <>閉じる <FontAwesomeIcon icon={faChevronUp} className="text-[10px]" /></>
            ) : (
              <>その他のタグ <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
