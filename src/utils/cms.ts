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
