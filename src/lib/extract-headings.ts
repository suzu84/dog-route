import type { ArticleContentBlock } from "./types";

/** 記事本文のテキストブロックからh2見出しを抜き出し、サイドバー目次に使う */
export function extractHeadings(content: ArticleContentBlock[]): string[] {
  const headings: string[] = [];
  for (const block of content) {
    if (block.fieldId !== "text") continue;
    const matches = block.text.matchAll(/<h2[^>]*>(.*?)<\/h2>/g);
    for (const match of matches) {
      headings.push(match[1].replace(/<[^>]+>/g, ""));
    }
  }
  return headings;
}
