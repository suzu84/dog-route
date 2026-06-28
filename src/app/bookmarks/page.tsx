import type { Metadata } from "next";
import { getAllShops } from "@/lib/microcms";
import BookmarksPageClient from "@/components/bookmarks/BookmarksPageClient";

export const metadata: Metadata = {
  title: "保存リスト",
  description: "保存した店舗の一覧。お出かけ前にまとめてチェックできます。",
};

export default async function BookmarksPage() {
  const shops = await getAllShops();

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">保存リスト</h1>
      <BookmarksPageClient shops={shops} />
    </div>
  );
}
