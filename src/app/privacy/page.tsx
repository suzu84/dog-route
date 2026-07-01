import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "個人情報保護方針",
  description: "DOG ROUTEの個人情報の取り扱いに関する方針を説明します。",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 lg:px-0 py-10 lg:py-16">
      <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">個人情報保護方針</h1>
      <p className="text-sm text-gray-400 mb-10">最終更新日：2026年7月1日</p>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-8">
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">1. 運営者情報</h2>
          <p>
            本サービス「DOG ROUTE」（以下「当サービス」）は、板橋区の愛犬家向けスポット情報メディアです。
            お問い合わせは<a href="/contact" className="text-brand underline">お問い合わせフォーム</a>よりお願いいたします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">2. 収集する個人情報</h2>
          <p>当サービスでは、以下の場合に個人情報を収集することがあります。</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>お問い合わせフォームをご利用の際（お名前・メールアドレス・お問い合わせ内容）</li>
            <li>アクセス解析のためのCookieおよびログ情報（IPアドレス、ブラウザ種別、閲覧ページ等）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">3. 利用目的</h2>
          <p>収集した個人情報は、以下の目的にのみ使用します。</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>お問い合わせへの返信・対応</li>
            <li>サービスの改善・品質向上のための統計分析</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">4. 第三者提供</h2>
          <p>
            法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">5. 外部サービスの利用</h2>
          <p>当サービスでは以下の外部サービスを利用しています。各社のプライバシーポリシーをご確認ください。</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Google Maps Platform（地図表示）</li>
            <li>Cloudflare（CDN・セキュリティ）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">6. Cookieについて</h2>
          <p>
            当サービスはお気に入り機能のためにブラウザのlocalStorageを使用します。
            これはサーバーへの送信は行わず、お使いの端末にのみ保存されます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">7. 個人情報の管理・削除</h2>
          <p>
            収集した個人情報は適切なセキュリティ対策を講じて管理します。
            ご自身の個人情報の開示・訂正・削除をご希望の場合は、
            <a href="/contact" className="text-brand underline">お問い合わせフォーム</a>よりお申し付けください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">8. SSL（Secure Socket Layer）について</h2>
          <p>
            当サービスはSSLに対応しており、WebブラウザとWebサーバーとの通信を暗号化しています。
            ユーザーが入力する氏名や住所、電話番号などの個人情報は自動的に暗号化されます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">9. 免責事項</h2>
          <p>
            当サービスWebサイト上の情報の正確性には万全を期していますが、利用者が当サービスWebサイトの情報を用いて行う一切の行為に関して、一切の責任を負わないものとします。
            当サービスは、利用者が当サービスWebサイトを利用したことにより生じた利用者の損害及び利用者が第三者に与えた損害に関して、一切の責任を負わないものとします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">10. 方針の変更</h2>
          <p>
            本方針は予告なく変更されることがあります。変更後の方針は本ページに掲載した時点で効力を生じます。
          </p>
        </section>
      </div>
    </div>
  );
}
