import Head from "next/head";

interface MetaProps {
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageImg?: any;
  pageImgWidth?: number;
  pageImgHeight?: number;
  defaultfavicon?: string;
  /** "article" にすると og:type と article:* を出す */
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** 構造化データ(schema.org)。オブジェクトか配列 */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export const SITE_NAME = "Nknight AMAMIYA@nk4dev";
export const DEFAULT_DESCRIPTION =
  "Nknight AMAMIYA(@nk4dev)のブログ兼プレイグラウンド。Next.js・TypeScript・C#での個人開発やVRChatについて書いています。";

// JSON-LD を <script> に埋め込むときに "</script>" で抜けられないようにする
const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const HMeta: React.FC<MetaProps> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight,
  defaultfavicon,
  ogType = "website",
  publishedTime,
  modifiedTime,
  jsonLd,
  noindex,
}) => {
  const defaultTitle = "nknighta";
  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription ? pageDescription : DEFAULT_DESCRIPTION;
  const url = `https://nknighta.me${pagePath == undefined ? "/" : pagePath}`;
  const imgWidth = pageImgWidth ? pageImgWidth : 1280;
  const imgHeight = pageImgHeight ? pageImgHeight : 640;
  const favicon = defaultfavicon ? defaultfavicon : "/favicon.ico";
  const img_alt = pageImg
    ? pageImg.replace(/.*\//, "").replace(/\.\w+$/, "")
    : title;
  const defaultPageImg =
    pageImg === undefined || pageImg === null
      ? `https://ogp-img-gen.vercel.app/api/img-gen?text=${encodeURIComponent(title)}`
      : pageImg;
  return (
    <Head>
      <title>{title}</title>
      <meta name="google-site-verification" content="FadhJDiAEFAdginv7Ttd1S3Ord4FWPtK3dnlKRAKeJo" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`${defaultPageImg}`} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <meta property="og:image:alt" content={img_alt} />
      <meta property="og:locale" content="ja_JP" />
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nk4dev" />
      <meta name="twitter:creator" content="@nk4dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${defaultPageImg}`} />
      <link rel="icon" href={favicon} sizes="any" />
      {!noindex && <link rel="canonical" href={url} />}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default HMeta;
