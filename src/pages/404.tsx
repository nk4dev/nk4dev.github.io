import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../layout/main";
import HMeta from "../components/headermeta";
import { css } from "../../styled-system/css";

export default function Custom404() {
  const router = useRouter();
  const [appsUrl, setAppsUrl] = useState("");

  // apps.nknighta.me に同じパスのページがあるかもしれないので候補として出す
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.notfoundfallback) return;
    setAppsUrl("https://apps.nknighta.me" + router.asPath);
  }, [router.isReady, router.asPath, router.query.notfoundfallback]);

  const link = css({ color: "portfolioAccentHover", textDecoration: "underline" });

  return (
    <Layout>
      <HMeta pageTitle="ページが見つかりません" noindex />
      <div
        className={css({
          maxWidth: "640px",
          margin: "0 auto",
          padding: { base: "72px 20px 100px", md: "100px 32px 120px" },
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        })}
      >
        <p className={css({ margin: 0, fontSize: "12px", letterSpacing: ".14em", color: "portfolioMutedDark" })}>
          // 404 Not Found
        </p>
        <h1 className={css({ margin: 0, fontFamily: "portfolioSerif", fontWeight: "500", fontSize: { base: "26px", md: "32px" } })}>
          ページが見つかりませんでした
        </h1>
        <p className={css({ margin: 0, lineHeight: 1.7, color: "portfolioMuted" })}>
          URLが変わった可能性があります。記事は{" "}
          <Link href="/blog" className={link}>ブログ一覧</Link>
          {" "}から探せます。
        </p>
        <ul className={css({ margin: 0, paddingLeft: "1.2em", lineHeight: 2 })}>
          <li><Link href="/" className={link}>トップへ戻る</Link></li>
          <li><Link href="/blog" className={link}>ブログ一覧</Link></li>
          <li><Link href="/dev" className={link}>つくったもの</Link></li>
          {appsUrl && (
            <li>
              アプリをお探しの場合:{" "}
              <a href={appsUrl} className={link}>{appsUrl}</a>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
}
