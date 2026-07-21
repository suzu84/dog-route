import type { ArticleContentBlock } from "./types";

export interface HeadingItem {
  text: string;
  id: string;
}

/**
 * コンテンツを1回だけ走査し、h2にIDを付与した blocks と headings リストを同時に生成する。
 * extractHeadings と ArticleContent でカウンターを別々に持つとズレるため、ここで一元管理する。
 */
export function processContent(content: ArticleContentBlock[]): {
  headings: HeadingItem[];
  blocks: ArticleContentBlock[];
} {
  const headings: HeadingItem[] = [];
  let counter = 0;

  const blocks = content.map((block) => {
    if (block.fieldId !== "text") return block;

    const processedText = block.text.replace(
      /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
      (_match, attrs: string, inner: string) => {
        const id = `heading-${counter++}`;
        const text = inner.replace(/<[^>]+>/g, "").trim();
        headings.push({ text, id });
        return `<h2${attrs} id="${id}">${inner}</h2>`;
      }
    );

    return { ...block, text: processedText };
  });

  return { headings, blocks };
}
