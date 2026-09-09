import HMeta from "../headermeta";
import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";
import CustomLink from "../clink";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "../../libs/lang";
import Pagination from "./pagination";

const DEFAULT_EYECATCH =
  "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=fill&fill-color=000021&w=500&h=300";

const blogText = {
  ja: { kicker: "Blog", title: "ブログ", subtitle: "開発やVRChatについて書いた記事の一覧です。", categories: "カテゴリー", close: "閉じる" },
  en: { kicker: "Blog", title: "Blog", subtitle: "Posts about development and VRChat.", categories: "Categories", close: "Close" },
};

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

const Category = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang } = useLang();
  const t = blogText[lang];
  return (
    <div className={css({ width: "100%", display: "flex", justifyContent: "center" })}>
      {!isMenuOpen ? (
        <button
          onClick={() => setIsMenuOpen(true)}
          className={css({
            fontFamily: "portfolioSans",
            fontSize: "13px",
            padding: "8px 18px",
            borderRadius: "999px",
            background: "portfolioPillBg",
            border: "1px solid {colors.portfolioPillBorder}",
            color: "portfolioAccentHover",
            cursor: "pointer",
          })}
        >
          {t.categories}
        </button>
      ) : (
        <div
          className={css({
            position: "relative",
            width: "100%",
            maxWidth: "560px",
            padding: "18px 20px",
            borderRadius: "12px",
            background: "portfolioCard",
            border: "1px dashed {colors.portfolioBorder}",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className={css({
              alignSelf: "flex-end",
              fontFamily: "portfolioSans",
              fontSize: "12px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "transparent",
              border: "1px solid {colors.portfolioPillBorder}",
              color: "portfolioAccentHover",
              cursor: "pointer",
            })}
          >
            {t.close}
          </button>
          <div className={css({ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" })}>
            {categories.map((category) => (
              <CustomLink key={category.id} href={`/blog/category/${category.id}`} size="small">
                {category.name}
              </CustomLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export type BlogListPost = {
  id: string;
  title: string;
  publishedAt: string;
  category?: { name: string } | null;
  eyecatch?: { url: string; alt?: string } | null;
  excerpt?: string;
};

export default function BlogListPage({
  blog,
  categories,
  currentPage,
  totalPages,
}: {
  blog: BlogListPost[];
  categories: { id: string; name: string }[];
  currentPage: number;
  totalPages: number;
}) {
  const { lang } = useLang();
  const t = blogText[lang];
  const pagePath = currentPage <= 1 ? "/blog" : `/blog/page/${currentPage}`;

  return (
    <Layout>
      <HMeta
        pageTitle={currentPage > 1 ? `Blog - Page ${currentPage}` : "Blog"}
        pageDescription="Nknight AMAMIYA'S Blog"
        pagePath={pagePath}
      />
      <div className={css({ maxWidth: "1200px", margin: "0 auto", padding: { base: "0 20px 80px", md: "0 32px 100px" } })}>
        <section className={css({ padding: { base: "48px 0 32px", md: "64px 0 40px" } })}>
          <div
            className={css({
              fontFamily: "portfolioSerif",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "portfolioMutedDark",
              marginBottom: "12px",
            })}
          >
            // {t.kicker}
          </div>
          <h1 className={css({ margin: "0 0 12px", fontFamily: "portfolioSerif", fontWeight: "500", fontSize: { base: "28px", md: "36px" } })}>
            {t.title}
          </h1>
          <p className={css({ margin: "0 0 20px", fontSize: "15px", color: "portfolioMuted" })}>{t.subtitle}</p>
          <Category categories={categories} />
        </section>

        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", sm: "1fr 1fr", lg: "repeat(auto-fit, minmax(260px, 1fr))" },
            gap: "24px",
            paddingBottom: "40px",
          })}
        >
          {blog.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className={css({
                background: "portfolioCard",
                border: "1px dashed {colors.portfolioBorder}",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              })}
            >
              <div className={css({ position: "relative", width: "100%", height: "150px" })}>
                <Image
                  src={post.eyecatch ? `${post.eyecatch.url}?fit=fill&fill-color=000021&w=500&h=300` : DEFAULT_EYECATCH}
                  alt={post.eyecatch ? post.eyecatch.alt ?? post.title : "blog"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={css({ padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: "9px" })}>
                <span className={css({ fontSize: "11px", letterSpacing: ".05em", color: "portfolioAccent2" })}>
                  <span className={css({ textTransform: "lowercase" })}>#{post.category ? post.category.name : "blog"}</span>
                  {" · "}
                  {formatDate(post.publishedAt)}
                </span>
                <h3 className={css({ margin: 0, fontFamily: "portfolioSerif", fontWeight: "500", fontSize: "17.5px", lineHeight: 1.4, color: "portfolioText" })}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className={css({ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "portfolioMuted" })}>{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Layout>
  );
}
