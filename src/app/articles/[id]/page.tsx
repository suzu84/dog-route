import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticle } from "@/lib/microcms";
import { extractHeadings } from "@/lib/extract-headings";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleCard from "@/components/article/ArticleCard";
import ArticleDetailMobileHeader from "@/components/article/ArticleDetailMobileHeader";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return {};

  return {
    title: article.title,
    description: article.title,
  };
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export default async function ArticleDetailPage({ params, searchParams }: ArticlePageProps) {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const article = await getArticle(id, draftKey);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  const headings = extractHeadings(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.mainImage.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleDetailMobileHeader />

      <div className="w-full bg-white border-b border-gray-100 pt-6 lg:pt-12 pb-8 lg:pb-16 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            <span className="bg-brand text-white px-2.5 lg:px-3 py-1 rounded text-[10px] lg:text-xs font-bold">
              {article.category}
            </span>
            <span className="text-xs lg:text-sm font-medium text-gray-500">
              {formatDate(article.publishedAt)} 更新
            </span>
          </div>
          <h1 className="text-xl lg:text-4xl font-bold text-gray-900 leading-snug lg:leading-tight mb-6 lg:mb-8">
            {article.title}
          </h1>
          <div className="relative w-full h-56 lg:h-[450px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={article.mainImage.url}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 lg:max-w-[700px]">
          <ArticleContent content={article.content} />
        </div>

        {(headings.length > 0 || relatedArticles.length > 0) && (
          <div className="lg:w-[300px]">
            <div className="lg:sticky lg:top-24">
              {headings.length > 0 && (
                <div className="bg-white border border-gray-200 p-5 lg:p-6 rounded-2xl shadow-sm mb-6">
                  <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    目次
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-3">
                    {headings.map((heading, index) => (
                      <li key={index}>{heading}</li>
                    ))}
                  </ul>
                </div>
              )}

              {relatedArticles.length > 0 && (
                <div>
                  <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-4">関連記事</h3>
                  <div className="flex flex-col gap-4">
                    {relatedArticles.map((related) => (
                      <ArticleCard key={related.id} article={related} layout="horizontal" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
