import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: 'nknighta-github',
  apiKey: process.env.CMS_API_KEY!,
});

export default client;

// ブログ一覧を取得（ドラフトキー対応）
export async function getBlogs(options?: { draftKey?: string; limit?: number; offset?: number }) {
  return client.get({
    endpoint: 'blogs',
    queries: {
      limit: options?.limit ?? 10,
      offset: options?.offset ?? 0,
      ...(options?.draftKey ? { draftKey: options.draftKey } : {}),
    },
  });
}

// ブログ単体を取得（ドラフトキー対応）
export async function getBlog(id: string, options?: { draftKey?: string }) {
  return client.get({
    endpoint: 'blogs',
    contentId: id,
    queries: {
      ...(options?.draftKey ? { draftKey: options.draftKey } : {}),
    },
  });
}

// カテゴリ一覧を取得
export async function getCategories() {
  return client.get({ endpoint: 'categories' });
}

// サイトマップ用: 公開済みコンテンツを全件取得（100件ずつページングして集約）
async function getAllPublishedContents(endpoint: string) {
  const limit = 100;
  let offset = 0;
  const all: { id: string; publishedAt?: string; updatedAt?: string }[] = [];

  for (;;) {
    const data = await client.get({
      endpoint,
      queries: {
        limit,
        offset,
        fields: "id,publishedAt,updatedAt",
        orders: "-publishedAt",
      },
    });
    all.push(...data.contents);
    if (all.length >= data.totalCount || data.contents.length === 0) break;
    offset += limit;
  }

  return all.filter((content) => content.publishedAt);
}

export async function getAllBlogsForSitemap() {
  return getAllPublishedContents("blogs");
}

export async function getAllProjectsForSitemap() {
  return getAllPublishedContents("projects");
}

export async function getAllScrapsForSitemap() {
  return getAllPublishedContents("scraps");
}
