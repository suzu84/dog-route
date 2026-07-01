import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";

export default function ArticleCard({
  article,
  layout = "vertical",
  showCategory = true,
}: {
  article: Article;
  layout?: "vertical" | "horizontal";
  showCategory?: boolean;
}) {
  if (layout === "horizontal") {
    return (
      <Link
        href={`/articles/${article.id}`}
        className="flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
      >
        <div className="relative w-24 h-24 shrink-0">
          <Image
            src={article.mainImage.url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div className="p-3 flex-1">
          <h3 className="text-xs font-bold text-gray-800 leading-tight line-clamp-2">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
    >
      <div className="relative w-full h-32 lg:h-32">
        <Image
          src={article.mainImage.url}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="p-3 lg:p-4">
        {showCategory && (
          <span className="text-[10px] font-bold text-brand bg-brand-light px-2 py-1 rounded-full mb-2 inline-block">
            {article.category}
          </span>
        )}
        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}
