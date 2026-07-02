export type ShopCategory = "カフェ・レストラン" | "トリミングサロン" | "ドッグラン" | "病院";

export const SHOP_CATEGORIES: ShopCategory[] = [
  "カフェ・レストラン",
  "トリミングサロン",
  "ドッグラン",
  "病院",
];

/** microCMS側でタグを追加した場合、このファイルの変更は不要。
 *  フィルターバーに表示したい場合は constants.ts の SHOP_TAGS に追記する。
 *  アイコンを付けたい場合は constants.ts の TAG_ICONS に追記する。 */
export type ShopTag = string;

export const SHOP_TAGS: ShopTag[] = [
  "駐車場あり",
  "大型犬OK",
  "屋内可",
  "小型犬専用エリアあり",
  "現金のみ",
  "現金以外可",
  "ネット予約可",
  "わんこメニューあり",
];

export interface MicroCMSImage {
  url: string;
  height?: number;
  width?: number;
}

export interface MicroCMSListContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

export interface Shop extends MicroCMSListContent {
  name: string;
  /** microCMS側で複数選択可のセレクトフィールドのため配列 */
  category: ShopCategory[];
  mainImage: MicroCMSImage;
  tags?: ShopTag[];
  appeal: string;
  rules: string;
  priceMenu?: string;
  address: string;
  lat: number;
  lng: number;
  placeId?: string;
  phone?: string;
  businessHours: string;
  payment?: string;
  /** 検索結果カードに表示する最寄駅などの補足（要件にはないが表示用に任意で利用） */
  access?: string;
  rating?: number;
  websiteUrl?: string;
  instagramUrl?: string;
  /** トップページ「おすすめスポット」枠への掲載フラグ（将来、新着と分離する際に使用） */
  isRecommended?: boolean;
}

export type ArticleCategory = "まとめ" | "インタビュー" | "お役立ち";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "まとめ",
  "インタビュー",
  "お役立ち",
];

export interface ArticleTextBlock {
  fieldId: "text";
  text: string;
}

export interface ArticleShopBlock {
  fieldId: "shop";
  shop: Shop[];
}

export type ArticleContentBlock = ArticleTextBlock | ArticleShopBlock;

export interface Article extends MicroCMSListContent {
  title: string;
  mainImage: MicroCMSImage;
  category: ArticleCategory;
  content: ArticleContentBlock[];
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
