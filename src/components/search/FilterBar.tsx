"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TAG_ICONS } from "@/lib/constants";
import { SHOP_TAGS } from "@/lib/types";
import type { ShopTag } from "@/lib/types";

interface FilterBarProps {
  selectedTags: ShopTag[];
  onToggleTag: (tag: ShopTag) => void;
}

export default function FilterBar({ selectedTags, onToggleTag }: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3">
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-2">
          <span className="text-sm font-bold text-gray-700 shrink-0">絞り込み：</span>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className="bg-brand-light text-brand-dark px-3 py-1.5 rounded-full text-xs font-bold flex items-center border border-brand/20 shrink-0"
            >
              {TAG_ICONS[tag] && <FontAwesomeIcon icon={TAG_ICONS[tag]!} className="mr-1.5" />}
              {tag}
              <FontAwesomeIcon icon={faXmark} className="ml-2" />
            </button>
          ))}
        </div>
      )}
      <p className="text-sm font-bold text-gray-700 mb-2">こだわり条件で探す</p>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {SHOP_TAGS.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center border shrink-0 transition ${
                active
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {TAG_ICONS[tag] && <FontAwesomeIcon icon={TAG_ICONS[tag]!} className="mr-1.5" />}
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
