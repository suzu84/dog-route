import type { ArticleContentBlock } from "./types";

export interface HeadingItem {
  text: string;
  id: string;
}

/** 記事本文のテキストブロックからh2見出しを抜き出し、サイドバー目次に使う */
export function extractHeadings(content: ArticleContentBlock[]): HeadingItem[] {
  const headings: HeadingItem[] = [];
  let counter = 0;
  for (const block of content) {
    if (block.fieldId !== "text") continue;
    const matches = block.text.matchAll(/<h2[^>]*>(.*?)<\/h2>/g);
    for (const match of matches) {
      headings.push({
        text: match[1].replace(/<[^>]+>/g, ""),
        id: `heading-${counter++}`,
      });
    }
  }
  return headings;
}
