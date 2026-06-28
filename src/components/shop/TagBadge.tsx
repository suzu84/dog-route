import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAG_ICONS } from "@/lib/constants";
import type { ShopTag } from "@/lib/types";

interface TagBadgeProps {
  tag: ShopTag;
  size?: "sm" | "md";
}

export default function TagBadge({ tag, size = "sm" }: TagBadgeProps) {
  const icon = TAG_ICONS[tag];
  const sizeClass =
    size === "md"
      ? "text-xs px-3 py-1.5"
      : "text-[10px] px-2 py-1";

  return (
    <span
      className={`bg-gray-100 text-gray-700 rounded font-bold inline-flex items-center ${sizeClass}`}
    >
      <FontAwesomeIcon icon={icon} className="text-brand mr-1" />
      {tag}
    </span>
  );
}
