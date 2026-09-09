import { css } from "../../styled-system/css";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import Image from "next/image";
import Link from "next/link";
import client from "../utils/cms";
import { useLang } from "../libs/lang";
import { skills, repos, contacts } from "../data/profile";

const DEFAULT_EYECATCH =
  "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=fill&fill-color=000021&w=500&h=300";

const homeText = {
  ja: {
    kicker: "Nknight AMAMIYA / @nk4dev",
    prefix: "こんにちは、",
    suffix: "です",
    body: "個人開発とVRChatについて、ゆるく書いているブログ兼プレイグラウンドです。普段はJavaScript・TypeScript・C#・Next.js・React あたりを触っています。",
    recentTitle: "最近書いた記事",
    projectsTitle: "つくったもの",
    connectTitle: "Connect",
  },
  en: {
    kicker: "Nknight AMAMIYA / @nk4dev",
    prefix: "Hi, I'm ",
    suffix: "",
    body: "A personal blog and playground about indie projects and VRChat. I mostly work with JavaScript, TypeScript, C#, Next.js and React.",
    recentTitle: "Recent posts",
    projectsTitle: "Things I built",
    connectTitle: "Connect",
  },
};

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blogs",
    queries: { limit: 3, offset: 0, orders: "-publishedAt" },
    customRequestInit: { next: { revalidate: 60 } },
  });

  return {
    props: { recentPosts: data.contents },
    revalidate: 60,
  };
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={css({
        margin: "0 0 24px",
        fontFamily: "portfolioSerif",
        fontWeight: "500",
        fontSize: "26px",
      })}
    >
      <span className={css({ color: "portfolioAccent", marginRight: "10px" })}>
        ›
      </span>
      {children}
    </h2>
  );
}

export default function Index({ recentPosts }) {
  const { lang } = useLang();
  const t = homeText[lang];

  return (
    <Layout>
      <HMeta
        pageTitle="Profile"
        pageDescription="Profile of Nknight AMAMIYA(nk4dev)"
      />
      <Link
        href="/vrchat"
        target="_blank"
        rel="noopener noreferrer"
        className={css({
          display: "block",
          textAlign: "center",
          padding: "10px 20px",
          fontFamily: "portfolioSans",
          fontSize: "13.5px",
          color: "portfolioAccentHover",
          background: "portfolioPillBg",
          borderBottom: "1px solid {colors.portfolioPillBorder}",
        })}
      >
        I started VRChat! Profile is here. Go to Profile (third-party website)
      </Link>

      <div
        className={css({
          maxWidth: "920px",
          margin: "0 auto",
          padding: { base: "0 20px 80px", md: "0 32px 100px" },
        })}
      >
        {/* Hero */}
        <section
          className={css({
            padding: { base: "48px 0 8px", md: "72px 0 8px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "22px",
          })}
        >
          <Image
            src="https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?w=170&h=170&q=50&fm=webp"
            width={96}
            height={96}
            alt="icon"
            className={css({ borderRadius: "50%", background: "#c1d0ff" })}
          />
          <div
            className={css({
              fontFamily: "portfolioSerif",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "portfolioMutedDark",
            })}
          >
            // {t.kicker}
          </div>
          <h1
            className={css({
              margin: 0,
              fontFamily: "portfolioSerif",
              fontWeight: "500",
              fontSize: { base: "30px", md: "clamp(32px, 5vw, 46px)" },
              lineHeight: 1.22,
            })}
          >
            {t.prefix}
            <span
              className={css({
                fontStyle: "italic",
                borderBottom: "3px solid {colors.portfolioAccent}",
              })}
            >
              Nknight AMAMIYA
            </span>
            {t.suffix}
          </h1>
          <p
            className={css({
              margin: 0,
              maxWidth: "560px",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "portfolioBody",
            })}
          >
            {t.body}
          </p>
          <div
            className={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className={css({
                  fontFamily: "portfolioSans",
                  fontSize: "12.5px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  background: "portfolioPillBg",
                  color: "portfolioAccentHover",
                  border: "1px solid {colors.portfolioPillBorder}",
                  whiteSpace: "nowrap",
                })}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Recent posts */}
        <section className={css({ padding: "56px 0 8px" })}>
          <div
            className={css({
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "24px",
              gap: "12px",
            })}
          >
            <SectionTitle>{t.recentTitle}</SectionTitle>
            <Link
              href="/blog"
              className={css({
                cursor: "pointer",
                fontSize: "13px",
                color: "portfolioMuted",
                whiteSpace: "nowrap",
              })}
            >
              {lang === "ja" ? "すべて見る →" : "View all →"}
            </Link>
          </div>
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(auto-fit, minmax(240px, 1fr))",
              },
              gap: "22px",
            })}
          >
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className={css({
                  background: "portfolioCard",
                  border: "1px dashed {colors.portfolioBorder}",
                  borderRadius: "12px",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <div
                  className={css({
                    position: "relative",
                    width: "100%",
                    height: "130px",
                  })}
                >
                  <Image
                    src={post.eyecatch ? post.eyecatch.url : DEFAULT_EYECATCH}
                    alt={post.eyecatch?.alt ?? post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className={css({
                    padding: "16px 18px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  })}
                >
                  <span
                    className={css({
                      fontSize: "11px",
                      letterSpacing: ".05em",
                      color: "portfolioMutedDark",
                    })}
                  >
                    <span
                      className={css({
                        color: "portfolioAccent2",
                        textTransform: "lowercase",
                      })}
                    >
                      #{post.category ? post.category.name : "blog"}
                    </span>{" "}
                    · {formatDate(post.publishedAt)}
                  </span>
                  <h3
                    className={css({
                      margin: 0,
                      fontFamily: "portfolioSerif",
                      fontWeight: "500",
                      fontSize: "16.5px",
                      lineHeight: 1.4,
                      color: "portfolioText",
                    })}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Things I built */}
        <section className={css({ padding: "56px 0 8px" })}>
          <SectionTitle>{t.projectsTitle}</SectionTitle>
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(auto-fit, minmax(260px, 1fr))",
              },
              gap: "18px",
            })}
          >
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  background: "portfolioCard",
                  border: "1px dashed {colors.portfolioBorder}",
                  borderRadius: "12px",
                  textDecoration: "none",
                  display: "block",
                  padding: "20px 22px",
                })}
              >
                <div
                  className={css({
                    fontFamily: "portfolioSerif",
                    fontWeight: "500",
                    fontSize: "17px",
                    color: "portfolioText",
                    marginBottom: "6px",
                  })}
                >
                  {repo.name}
                </div>
                <div
                  className={css({
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    color: "portfolioMuted",
                  })}
                >
                  {repo.desc[lang]}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section className={css({ padding: "56px 0 72px" })}>
          <SectionTitle>{t.connectTitle}</SectionTitle>
          <div
            className={css({ display: "flex", gap: "12px", flexWrap: "wrap" })}
          >
            {contacts.map((contact) => (
              <Link
                key={contact.label}
                href={contact.url}
                target={
                  contact.url.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  contact.url.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={css({
                  textDecoration: "none",
                  fontSize: "13.5px",
                  padding: "9px 16px",
                  borderRadius: "999px",
                  background: "portfolioPillBg",
                  border: "1px solid {colors.portfolioPillBorder}",
                  color: "portfolioText",
                })}
              >
                {contact.label}{" "}
                <span className={css({ color: "portfolioMutedDark" })}>
                  {contact.handle}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
