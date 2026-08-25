import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://dogroute.jp";
const DEFAULT_DESCRIPTION =
  "DOG ROUTE（ドッグルート）は板橋区周辺で愛犬と暮らす飼い主のための店舗検索メディア。カート入店OK・大型犬OKなどリアルな条件で探せます。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DOG ROUTE（ドッグルート）| 板橋区の愛犬家のためのお出かけ・生活インフラ",
    template: "%s | DOG ROUTE（ドッグルート）",
  },
  description: DEFAULT_DESCRIPTION,
  robots: process.env.VERCEL_ENV === "preview"
    ? { index: false, follow: false }
    : { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    siteName: "DOG ROUTE",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "DOG ROUTE" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DOG ROUTE",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: DEFAULT_DESCRIPTION,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DOG ROUTE",
    url: SITE_URL,
    inLanguage: "ja-JP",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* TOPイントロ：表示済みセッションでは描画前に無効化しちらつきを防ぐ */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('dogroute_intro_shown'))document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W82NRLR8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W82NRLR8');`}
      </Script>
    </html>
  );
}
