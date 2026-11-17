import type { ArticleContentBlock } from "./types";

export interface HeadingItem {
  text: string;
  id: string;
}

/**
 * 記事内のテーブルを横スクロール可能なラッパーで包む。
 * スマホ幅でテーブルがコンテンツ幅を超える場合にスクロールできることを示すため、
 * 案内テキスト（スマホ幅のみ表示。CSSは globals.css の .table-scroll を参照）も添える。
 */
function wrapTables(html: string): string {
  return html.replace(
    /<table\b[\s\S]*?<\/table>/g,
    (table) =>
      `<div class="table-scroll-hint" aria-hidden="true">← 横にスクロールできます →</div><div class="table-scroll" tabindex="0" role="region" aria-label="横スクロールできる表">${table}</div>`
  );
}

/**
 * コンテンツを1回だけ走査し、h2/h3にIDを付与した blocks と headings リストを同時に生成する。
 * extractHeadings と ArticleContent でカウンターを別々に持つとズレるため、ここで一元管理する。
 */
export function processContent(content: ArticleContentBlock[]): {
  headings: HeadingItem[];
  blocks: ArticleContentBlock[];
} {
  const headings: HeadingItem[] = [];
  let counter = 0;
  let subCounter = 0;

  const blocks = content.map((block) => {
    // 下書きや空のリッチエディタは text キー自体が返らないことがある
    if (block.fieldId !== "text" || !block.text) return block;

    const processedText = block.text.replace(
      /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
      (_match, attrs: string, inner: string) => {
        const id = `heading-${counter++}`;
        const text = inner.replace(/<[^>]+>/g, "").trim();
        headings.push({ text, id });
        // microCMSが既存のidを付与している場合は上書きする
        const cleanAttrs = attrs.replace(/\s*id="[^"]*"/, "");
        return `<h2${cleanAttrs} id="${id}">${inner}</h2>`;
      }
    );

    // h3 は目次には載せないが、microCMSが見出し文言から生成するidは同文言で重複するため連番で上書きする
    const withSubIds = processedText.replace(
      /<h3([^>]*)>([\s\S]*?)<\/h3>/g,
      (_match, attrs: string, inner: string) => {
        const id = `heading-sub-${subCounter++}`;
        const cleanAttrs = attrs.replace(/\s*id="[^"]*"/, "");
        return `<h3${cleanAttrs} id="${id}">${inner}</h3>`;
      }
    );

    return { ...block, text: wrapTables(withSubIds) };
  });

  return { headings, blocks };
}
