import { createClient } from "microcms-js-sdk";
import { MOCK_ARTICLES, MOCK_SHOPS } from "./mock-data";
import type { Article, MicroCMSListResponse, Shop } from "./types";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const isMicroCMSConfigured = Boolean(serviceDomain && apiKey);

const client = isMicroCMSConfigured
  ? createClient({ serviceDomain: serviceDomain!, apiKey: apiKey! })
  : null;

const SHOP_ENDPOINT = "shop";
const ARTICLE_ENDPOINT = "article";

/**
 * 店舗・記事は件数が少ない前提のMVPのため、一覧は毎回全件取得してクライアント側で
 * 絞り込む（ページ遷移なしの爆速フィルタUXを優先するための設計判断）。
 */
export async function getAllShops(): Promise<Shop[]> {
  if (!client) return MOCK_SHOPS;

  const res = await client.getList<Shop>({
    endpoint: SHOP_ENDPOINT,
    queries: { limit: 100, orders: "-publishedAt" },
  });
  return (res as MicroCMSListResponse<Shop>).contents;
}

export async function getShop(id: string, draftKey?: string): Promise<Shop | undefined> {
  if (!client) return MOCK_SHOPS.find((shop) => shop.id === id);

  try {
    return await client.getListDetail<Shop>({
      endpoint: SHOP_ENDPOINT,
      contentId: id,
      queries: draftKey ? { draftKey } : {},
    });
  } catch {
    return undefined;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  if (!client) return MOCK_ARTICLES;

  const res = await client.getList<Article>({
    endpoint: ARTICLE_ENDPOINT,
    queries: { limit: 100, orders: "-publishedAt" },
  });
  return (res as MicroCMSListResponse<Article>).contents;
}

export async function getArticle(id: string, draftKey?: string): Promise<Article | undefined> {
  if (!client) return MOCK_ARTICLES.find((article) => article.id === id);

  try {
    return await client.getListDetail<Article>({
      endpoint: ARTICLE_ENDPOINT,
      contentId: id,
      queries: draftKey ? { draftKey } : {},
    });
  } catch {
    return undefined;
  }
}

export async function getShopsByIds(ids: string[]): Promise<Shop[]> {
  const all = await getAllShops();
  const idSet = new Set(ids);
  return all.filter((shop) => idSet.has(shop.id));
}

/** 店舗参照ブロックでその店舗を紹介している記事を逆引きする（店舗詳細ページの関連記事用） */
export async function getArticlesByShopId(shopId: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) =>
    article.content.some(
      (block) => block.fieldId === "shop" && block.shop.some((shop) => shop.id === shopId)
    )
  );
}
