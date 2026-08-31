import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllShops } from "@/lib/microcms";
import SearchPageClient from "@/components/search/SearchPageClient";
import { CATEGORY_SLUG_MAP, SLUG_CATEGORY_MAP } from "@/lib/constants";
import type { ShopCategory } from "@/lib/types";

interface Props {
  params: Promise<{ area: string; category: string }>;
}

export async function generateStaticParams() {
  return Object.entries(CATEGORY_SLUG_MAP).map(([, slug]) => ({
    area: "itabashi",
    category: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const shopCategory = SLUG_CATEGORY_MAP[category];
  if (!shopCategory) return {};
  return {
    title: `板橋区の${shopCategory}`,
    description: `板橋区周辺の${shopCategory}を、大型犬OK・屋内可などのリアルな条件で絞り込んで検索できます。`,
  };
}

export default async function SearchCategoryPage({ params }: Props) {
  const { category } = await params;
  const shopCategory = SLUG_CATEGORY_MAP[category] as ShopCategory | undefined;
  if (!shopCategory) notFound();

  const shops = await getAllShops();

  return (
    <Suspense>
      <SearchPageClient shops={shops} initialCategory={shopCategory} />
    </Suspense>
  );
}
