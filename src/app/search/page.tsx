import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllShops } from "@/lib/microcms";
import SearchPageClient from "@/components/search/SearchPageClient";

export const metadata: Metadata = {
  title: "マップから探す",
  description: "板橋区周辺の愛犬と入れるカフェ・サロン・ドッグラン・病院をカテゴリやこだわり条件で絞り込んで検索できます。",
};

export default async function SearchPage() {
  const shops = await getAllShops();

  return (
    <Suspense>
      <SearchPageClient shops={shops} />
    </Suspense>
  );
}
