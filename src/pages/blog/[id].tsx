import client from "../../utils/cms";
import Layout from "../../layout/main";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";
import TableOfContents from "../../components/toc";
import { buildTableOfContents } from "../../utils/toc";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLang } from "../../libs/lang";
//const { scrollYProgress } = useScroll();

interface BlogDate {
  publishedAt: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  updatedAt: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
}

// Add a function to process blog.content and apply styles to <code> tags
export default function BlogId({ blog, toc }) {
  // Process blog.content to style <code> tags
  const cmsstyle = `
    <style>
    html {
        scroll-behavior: smooth;
    }
    h1, h2, h3, h4 {
        scroll-margin-top: 80px;
        color: #fff;
    }
   
    h2 {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }
    h3 {
        font-size: 1.3rem;
        margin-top: 1.2rem;
        margin-bottom: 0.7rem;
    }

    pre {
      background-color: #000;
      line-height: 1.4;
      overflow-x: auto;
      max-width: 100%;
      overscroll-behavior: contain;
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
    }

    code {
      font-family: 'Courier New', Courier, monospace;
    }
    article a {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      pre, pre code {
        white-space: pre-wrap !important;
        word-break: break-word;
        overflow-wrap: anywhere;
      }
      pre {
        overflow: visible !important;
      }
      pre::before {
        display: none;
      }
    }
    </style>
    `;

  const { ui } = useLang();

  // only for devmode CMS data view
  const [isDevmodeOpen, setIsDevmodeOpen] = useState(false);

  // motion scroll progress bar script start
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [articleDate, setArticleDate] = useState<BlogDate>({} as BlogDate);

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY?.getPrevious() ?? 0);
    setScrollDirection(diff > 0 ? "down" : "up");
  });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () =>
      setScrollY(window.scrollY ?? window.pageYOffset ?? 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // motion scroll progress bar script end

  // get formatted date
  const persedIsoDate = new Date(blog.publishedAt);
  const updatedIsoDate = new Date(blog.updatedAt);

  useEffect(() => {
    setArticleDate({
      publishedAt: {
        year: persedIsoDate.getFullYear(),
        month: persedIsoDate.getMonth() + 1,
        day: persedIsoDate.getDate(),
        hour: persedIsoDate.getHours(),
        minute: persedIsoDate.getMinutes(),
      },
      updatedAt: {
        year: updatedIsoDate.getFullYear(),
        month: updatedIsoDate.getMonth() + 1,
        day: updatedIsoDate.getDate(),
        hour: updatedIsoDate.getHours(),
        minute: updatedIsoDate.getMinutes(),
      },
    });
  }, []);

  return (
    <Layout>
      <HMeta
        pageTitle={blog.title}
        pageDescription="Nknight AMAMIYA'S Blog"
        pagePath={`/blog/${blog.id}`}
        pageImg={blog.eyecatch ? blog.eyecatch.url : undefined}
      />

      <motion.div
        className={css({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          backgroundColor: "portfolioAccent",
          transformOrigin: scrollDirection === "down" ? "0% 100%" : "0% 0%",
          zIndex: 9999,
        })}
        style={{ scaleX: scrollYProgress }}
      />
      <div
        className={css({
          width: "100%",
          height: "300px",
          position: "relative",
          overflow: "hidden",
        })}
      >
        <Image
          alt={blog.eyecatch ? blog.eyecatch.alt : "eyecatch image"}
          src={
            blog.eyecatch == null
              ? "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=crop&w=200&h=200"
              : blog.eyecatch.url
          }
          layout="fill"
          objectFit="cover"
        />
        <div
          className={css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          })}
        />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div
          className={css({
            position: "fixed",
            top: 0,
            left: 0,
            color: "#ff0000",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "scroll",
            zIndex: 0,
            padding: "20px",
          })}
        >
          {isDevmodeOpen ? (
            <div>
              dev CMS Data
              <code>
                <pre>{JSON.stringify(blog, null, 2)}</pre>
              </code>
              <button onClick={() => setIsDevmodeOpen(false)}>Close</button>
            </div>
          ) : (
            <button onClick={() => setIsDevmodeOpen(true)}>
              Open Devmode CMS Data
            </button>
          )}
        </div>
      )}
      <div
        className={css({
          padding: { base: "24px 20px", md: "40px" },
          borderBottom: "1px solid {colors.portfolioFooterBorder}",
          overflowWrap: "break-word",
        })}
      >
        <div className={css({ fontSize: "11px", letterSpacing: ".05em", color: "portfolioAccent2", marginBottom: "10px" })}>
          <span className={css({ textTransform: "lowercase" })}>
            #{blog.category ? blog.category.name : "blog"}
          </span>
          {" · "}
          {articleDate.publishedAt === undefined
            ? "…"
            : `${articleDate.publishedAt.year}.${String(articleDate.publishedAt.month).padStart(2, "0")}.${String(articleDate.publishedAt.day).padStart(2, "0")}`}
        </div>
        <h1
          className={css({
            margin: 0,
            fontFamily: "portfolioSerif",
            fontWeight: "500",
            fontSize: { base: "22px", md: "30px" },
            lineHeight: 1.3,
          })}
        >
          {blog.title}
        </h1>
        {articleDate.updatedAt !== undefined &&
          `${articleDate.updatedAt.year}-${articleDate.updatedAt.month}-${articleDate.updatedAt.day}` !==
            `${articleDate.publishedAt?.year}-${articleDate.publishedAt?.month}-${articleDate.publishedAt?.day}` && (
            <p className={css({ margin: "10px 0 0", fontSize: "12.5px", color: "portfolioMutedDark" })}>
              updated: {articleDate.updatedAt.year}.{String(articleDate.updatedAt.month).padStart(2, "0")}.
              {String(articleDate.updatedAt.day).padStart(2, "0")}
            </p>
          )}
      </div>
      <div
        className={css({
          p: 4,
        })}
      >
        <div
          className={css({
            display: "flex",
            gap: "48px",
            alignItems: "flex-start",
            maxWidth: "1120px",
            margin: "0 auto",
          })}
        >
          <article
            className={css({
              gap: "14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingY: "10px",
              flex: "1",
              minWidth: 0,
              maxWidth: "800px",
              lineHeight: "1.6",
            })}
          >
            {toc.length > 0 && (
              <details
                className={css({
                  display: { base: "block", lg: "none" },
                  border: "1px solid {colors.portfolioPillBorder}",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  marginBottom: "8px",
                })}
              >
                <summary
                  className={css({
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "portfolioAccentHover",
                  })}
                >
                  目次
                </summary>
                <div className={css({ marginTop: "10px" })}>
                  <TableOfContents toc={toc} showTitle={false} />
                </div>
              </details>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: `${blog.content}${cmsstyle}`,
              }}
            />
            <Link
              href="/blog"
              className={css({
                display: "inline-block",
                marginTop: "16px",
                fontSize: "13px",
                color: "portfolioMuted",
                width: "fit-content",
              })}
            >
              {ui.backToBlog}
            </Link>
          </article>

          {toc.length > 0 && (
            <aside
              className={css({
                display: { base: "none", lg: "block" },
                width: "260px",
                flexShrink: 0,
                position: "sticky",
                top: "24px",
                alignSelf: "flex-start",
              })}
            >
              <TableOfContents toc={toc} />
            </aside>
          )}
        </div>
      </div>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs", queries: { limit: 100 } });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  // fallback: "blocking" -> ビルド後に公開された記事も、初回アクセス時に
  // Worker 上でオンデマンド生成する（直リンク 404 を防ぐ）
  return { paths, fallback: "blocking" };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;

  // 存在しない contentId では microCMS が例外を投げるため 404 に変換する
  try {
    const data = await client.get({ endpoint: "blogs", contentId: id });

    if (!data || !data.publishedAt) {
      return { notFound: true };
    }

    // 見出しに id を付与し、目次データを生成する
    const { content, toc } = buildTableOfContents(data.content ?? "");

    return {
      props: {
        blog: { ...data, content },
        toc,
      },
      // ISR: 既存記事の更新も 60 秒ごとに反映する
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
};
