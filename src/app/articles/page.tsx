import type { Metadata } from "next";
import { getAllArticles } from "@/lib/microcms";
import ArticleCard from "@/components/article/ArticleCard";

export const metadata: Metadata = {
  title: "特集記事一覧",
  description: "板橋区の愛犬家に向けた、おすすめスポットまとめやサロン取材などの特集記事一覧。",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">特集記事一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
