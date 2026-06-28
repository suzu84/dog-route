import {
  faMugHot,
  faScissors,
  faTree,
  faHospital,
  faCartShopping,
  faUmbrella,
  faDog,
  faFan,
  faSquareParking,
  faHouse,
  faBone,
  faMoneyBillWave,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ShopCategory, ShopTag } from "./types";

export const SITE_NAME = "DOG ROUTE";
export const SITE_AREA = "板橋区周辺";

export const CATEGORY_ICONS: Record<ShopCategory, IconDefinition> = {
  カフェ: faMugHot,
  サロン: faScissors,
  ドッグラン: faTree,
  病院: faHospital,
};

export const TAG_ICONS: Record<ShopTag, IconDefinition> = {
  駐車場あり: faSquareParking,
  大型犬OK: faDog,
  屋内: faHouse,
  屋外: faTree,
  小型犬専用エリアあり: faDog,
  現金のみ: faMoneyBillWave,
  ネット予約可: faCalendarCheck,
  カート入店OK: faCartShopping,
  ワンコメニューあり: faBone,
};

export const FEATURED_TAGS: ShopTag[] = [
  "カート入店OK",
  "大型犬OK",
  "ネット予約可",
];

export const MOOD_TAG_ICON = faUmbrella;
export const AIRCON_ICON = faFan;

export const BOOKMARK_STORAGE_KEY = "dog_route_bookmarks";
