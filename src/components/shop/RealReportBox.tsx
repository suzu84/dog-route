import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function RealReportBox({ html }: { html: string }) {
  return (
    <div>
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 flex items-center">
        <FontAwesomeIcon icon={faPenToSquare} className="text-brand mr-2" />
        飼い主リアルレポート
      </h2>
      <div
        className="bg-brand-light/30 border-l-4 border-brand p-4 lg:p-6 rounded-r-xl prose prose-sm max-w-none prose-p:my-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
