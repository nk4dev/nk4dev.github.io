import client from "./cms";
import { excerptFromHtml } from "./excerpt";

export const POSTS_PER_PAGE = 8;

// 1-indexed page number, matching the /blog and /blog/page/[p] routes.
export async function getBlogListPage(page: number) {
  const offset = (page - 1) * POSTS_PER_PAGE;
  const [data, categoriesData] = await Promise.all([
    client.get({
      endpoint: "blogs",
      queries: { offset, limit: POSTS_PER_PAGE, orders: "-publishedAt" },
      customRequestInit: { next: { revalidate: 60 } },
    }),
    client.get({ endpoint: "categories" }),
  ]);

  return {
    blog: data.contents.map((post) => ({
      ...post,
      excerpt: excerptFromHtml(post.content ?? ""),
    })),
    categories: categoriesData.contents,
    totalCount: data.totalCount as number,
    totalPages: Math.max(1, Math.ceil((data.totalCount as number) / POSTS_PER_PAGE)),
  };
}
