export type ShopCategory = "カフェ" | "サロン" | "ドッグラン" | "病院";

export const SHOP_CATEGORIES: ShopCategory[] = [
  "カフェ",
  "サロン",
  "ドッグラン",
  "病院",
];

export type ShopTag =
  | "駐車場あり"
  | "大型犬OK"
  | "屋内"
  | "屋外"
  | "小型犬専用エリアあり"
  | "現金のみ"
  | "ネット予約可"
  | "カート入店OK"
  | "ワンコメニューあり";

export const SHOP_TAGS: ShopTag[] = [
  "駐車場あり",
  "大型犬OK",
  "屋内",
  "屋外",
  "小型犬専用エリアあり",
  "現金のみ",
  "ネット予約可",
  "カート入店OK",
  "ワンコメニューあり",
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
  category: ShopCategory;
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
