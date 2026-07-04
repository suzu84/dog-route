import type { Metadata } from "next";
import { getAllArticles } from "@/lib/microcms";
import { PAGE_SIZE } from "@/lib/constants";
import ArticleCard from "@/components/article/ArticleCard";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "特集記事一覧",
  description: "板橋区の愛犬家に向けた、おすすめスポットまとめやサロン取材などの特集記事一覧。",
};

interface ArticlesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { page } = await searchParams;
  const articles = await getAllArticles();

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pagedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">特集記事一覧</h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray-400 py-20">現在、記事はありません</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {pagedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} showCategory={false} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        getHref={(p) => (p > 1 ? `/articles?page=${p}` : "/articles")}
      />
    </div>
  );
}
