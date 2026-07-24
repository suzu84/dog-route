import ShopEmbedBlock from "./ShopEmbedBlock";
import type { ArticleContentBlock } from "@/lib/types";

export default function ArticleContent({ content }: { content: ArticleContentBlock[] }) {
  return (
    <div>
      {content.map((block, index) => {
        if (block.fieldId === "text") {
          return (
            <div
              key={index}
              className="prose prose-sm lg:prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: block.text }}
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
