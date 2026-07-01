import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "DOG ROUTEへのお問い合わせ・掲載のご依頼はこちらからどうぞ。",
};

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@dogroute.jp";

const INQUIRY_TYPES = [
  {
    label: "一般的なお問い合わせ",
    subject: "[DOG ROUTE] お問い合わせ",
    body: `お名前：
メールアドレス：

お問い合わせ内容：
`,
  },
  {
    label: "お店の掲載依頼",
    subject: "[DOG ROUTE] 掲載のご依頼",
    body: `お店の名前：
ご担当者名：
メールアドレス：
電話番号：
住所：

その他ご要望・ご質問：
`,
  },
  {
    label: "取材・メディア関連",
    subject: "[DOG ROUTE] 取材・メディアに関するお問い合わせ",
    body: `お名前・会社名：
メールアドレス：

お問い合わせ内容：
`,
  },
  {
    label: "その他",
    subject: "[DOG ROUTE] その他のお問い合わせ",
    body: `お名前：
メールアドレス：

お問い合わせ内容：
`,
  },
];

function mailtoHref(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 lg:px-0 py-10 lg:py-16">
      <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">お問い合わせ</h1>
      <p className="text-sm text-gray-500 mb-10">
        ご用件の種別をお選びください。メールアプリが開き、件名・本文のテンプレートが自動入力されます。
        通常3営業日以内にご返信いたします。
      </p>

      <div className="space-y-3">
        {INQUIRY_TYPES.map((item) => (
          <a
            key={item.label}
            href={mailtoHref(item.subject, item.body)}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:border-brand hover:shadow-sm transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faEnvelope} className="text-brand text-sm" />
              </div>
              <span className="font-bold text-gray-800 group-hover:text-brand transition">
                {item.label}
              </span>
            </div>
            <span className="text-gray-400 text-sm group-hover:text-brand transition">→</span>
          </a>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-8">
        送信いただいた内容は
        <a href="/privacy" className="underline hover:text-gray-600">個人情報保護方針</a>
        に基づき適切に管理します。
      </p>
    </div>
  );
}
