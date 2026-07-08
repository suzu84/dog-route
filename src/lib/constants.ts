import {
  faMugHot,
  faScissors,
  faTree,
  faHospital,
  faUmbrella,
  faDog,
  faFan,
  faSquareParking,
  faHouse,
  faBone,
  faMoneyBillWave,
  faCreditCard,
  faCalendarCheck,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ShopCategory, ShopTag } from "./types";

export const SITE_NAME = "DOG ROUTE";
export const SITE_AREA = "板橋区周辺";

export const CATEGORY_ICONS: Record<ShopCategory, IconDefinition> = {
  "カフェ・レストラン": faMugHot,
  トリミングサロン: faScissors,
  ドッグラン: faTree,
  動物病院: faHospital,
  ペットホテル: faBed,
};

/** タグ名→アイコンのマッピング。CMS側で新しいタグを追加した場合、
 *  アイコンを付けたい時だけここに追記する（追記しなくてもタグは表示される）。 */
export const TAG_ICONS: Partial<Record<string, IconDefinition>> = {
  駐車場あり: faSquareParking,
  大型犬OK: faDog,
  屋内可: faHouse,
  小型犬専用エリアあり: faDog,
  現金のみ: faMoneyBillWave,
  現金以外可: faCreditCard,
  ネット予約可: faCalendarCheck,
  わんこメニューあり: faBone,
};

export const FEATURED_TAGS: ShopTag[] = [
  "大型犬OK",
  "屋内可",
  "ネット予約可",
];

export const MOOD_TAG_ICON = faUmbrella;
export const AIRCON_ICON = faFan;

export const BOOKMARK_STORAGE_KEY = "dog_route_bookmarks";

/** 検索結果・記事一覧の1ページあたりの表示件数 */
export const PAGE_SIZE = 20;
