import { parse } from "node-html-parser";
import GithubSlugger from "github-slugger";
import type { TOCItemType } from "fumadocs-core/toc";

const HEADING_SELECTOR = "h1, h2, h3, h4";

/**
 * microCMS からの HTML 本文を受け取り、各見出しに一意な id を付与したうえで
 * 目次 (Table of Contents) 用のデータを抽出する。
 *
 * getStaticProps 内（Node / Cloudflare Worker ランタイム）で実行される想定。
 */
export function buildTableOfContents(html: string): {
  content: string;
  toc: TOCItemType[];
} {
  if (!html) return { content: "", toc: [] };

  const root = parse(html);
  const slugger = new GithubSlugger();
  const toc: TOCItemType[] = [];

  for (const heading of root.querySelectorAll(HEADING_SELECTOR)) {
    const title = heading.textContent.trim();
    if (!title) continue;

    const existingId = heading.getAttribute("id");
    const slug = existingId ? slugger.slug(existingId) : slugger.slug(title);
    heading.setAttribute("id", slug);

    toc.push({
      title,
      url: `#${slug}`,
      depth: Number(heading.tagName.replace(/^H/i, "")) || 2,
    });
  }

  return { content: root.toString(), toc };
}
