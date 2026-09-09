import client from "../../../utils/cms";
import { getBlogListPage, POSTS_PER_PAGE } from "../../../utils/blogList";
import BlogListPage from "../../../components/blog/bloglistpage";

// 静的生成のためのパスを指定します（1ページ目は /blog 自体が担当するので 2 以降のみ）
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs", queries: { limit: 1 } });
  const totalPages = Math.max(1, Math.ceil(data.totalCount / POSTS_PER_PAGE));

  const paths = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => `/blog/page/${i + 2}`);
  // fallback: "blocking" -> 新しい記事が増えてページ数が増えた場合も初回アクセス時に生成する
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const page = Number(context.params.p);

  if (!Number.isInteger(page) || page < 1) {
    return { notFound: true };
  }
  // 1ページ目は /blog に正規化する（重複コンテンツを避ける）
  if (page === 1) {
    return { redirect: { destination: "/blog", permanent: false } };
  }

  const { blog, categories, totalPages } = await getBlogListPage(page);

  if (page > totalPages) {
    return { notFound: true };
  }

  return {
    props: { blog, categories, currentPage: page, totalPages },
    // ISR: 一覧・件数を 60 秒ごとに再生成する
    revalidate: 60,
  };
};

export default function BlogPage({ blog, categories, currentPage, totalPages }) {
  return (
    <BlogListPage
      blog={blog}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
