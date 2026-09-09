import BlogListPage from "../../components/blog/bloglistpage";
import { getBlogListPage } from "../../utils/blogList";

export const getStaticProps = async () => {
  const { blog, categories, totalPages } = await getBlogListPage(1);

  return {
    props: { blog, categories, currentPage: 1, totalPages },
    // ISR: 一覧・件数を 60 秒ごとに再生成する
    revalidate: 60,
  };
};

export default function Blog({ blog, categories, currentPage, totalPages }) {
  return (
    <BlogListPage
      blog={blog}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
