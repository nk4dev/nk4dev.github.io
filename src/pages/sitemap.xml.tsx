import type { GetServerSideProps } from "next";
import {
  getAllBlogsForSitemap,
  getAllProjectsForSitemap,
  getAllScrapsForSitemap,
  getCategories,
} from "../utils/cms";
import { POSTS_PER_PAGE } from "../utils/blogList";
import { SITE_URL, buildSitemapXml, SitemapEntry } from "../utils/sitemap";

const STATIC_PAGES: Array<Pick<SitemapEntry, "loc" | "changefreq" | "priority">> = [
  { loc: "/", changefreq: "weekly", priority: 1 },
  { loc: "/blog", changefreq: "daily", priority: 0.9 },
  { loc: "/dev", changefreq: "weekly", priority: 0.6 },
  { loc: "/scraps", changefreq: "daily", priority: 0.6 },
  { loc: "/apps", changefreq: "monthly", priority: 0.6 },
  { loc: "/whoareyou", changefreq: "monthly", priority: 0.4 },
  { loc: "/llmassets", changefreq: "monthly", priority: 0.2 },
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [blogs, projects, scraps, categoriesData] = await Promise.all([
    getAllBlogsForSitemap(),
    getAllProjectsForSitemap(),
    getAllScrapsForSitemap(),
    getCategories(),
  ]);

  const now = new Date().toISOString();
  const lastmodOf = (content: { publishedAt?: string; updatedAt?: string }) =>
    new Date(content.updatedAt ?? content.publishedAt ?? now).toISOString();

  const entries: SitemapEntry[] = [
    ...STATIC_PAGES.map((page) => ({ ...page, loc: `${SITE_URL}${page.loc}`, lastmod: now })),
    ...blogs.map((post) => ({
      loc: `${SITE_URL}/blog/${post.id}`,
      lastmod: lastmodOf(post),
      changefreq: "weekly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      loc: `${SITE_URL}/dev/${project.id}`,
      lastmod: lastmodOf(project),
      changefreq: "monthly" as const,
      priority: 0.6,
    })),
    ...scraps.map((scrap) => ({
      loc: `${SITE_URL}/scraps/${scrap.id}`,
      lastmod: lastmodOf(scrap),
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
    ...categoriesData.contents.map((category) => ({
      loc: `${SITE_URL}/blog/category/${category.id}`,
      lastmod: now,
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
  ];

  // ブログ一覧のページネーション（2ページ目以降。1ページ目は /blog 自体が担当）
  const totalPages = Math.max(1, Math.ceil(blogs.length / POSTS_PER_PAGE));
  for (let page = 2; page <= totalPages; page++) {
    entries.push({
      loc: `${SITE_URL}/blog/page/${page}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.4,
    });
  }

  const xml = buildSitemapXml(entries);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // Cloudflare のエッジで1時間キャッシュしつつ、裏側では常に最新のCMSデータで再生成する
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
