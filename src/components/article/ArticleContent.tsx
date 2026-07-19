import ShopEmbedBlock from "./ShopEmbedBlock";
import type { ArticleContentBlock } from "@/lib/types";

export default function ArticleContent({ content }: { content: ArticleContentBlock[] }) {
  let headingCounter = 0;

  return (
    <div>
      {content.map((block, index) => {
        if (block.fieldId === "text") {
          // h2タグに id="heading-N" を付与してアンカーリンクを有効化
          const html = block.text.replace(/<h2([^>]*)>/g, (_match, attrs: string) => {
            return `<h2${attrs} id="heading-${headingCounter++}">`;
          });
          return (
            <div
              key={index}
              className="prose prose-sm lg:prose-lg max-w-none text-gray-700 prose-headings:border-l-4 prose-headings:border-brand prose-headings:pl-3 [&_h2]:my-6"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return (
          <div key={index}>
            {block.shop.map((shop) => (
              <ShopEmbedBlock key={shop.id} shop={shop} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
