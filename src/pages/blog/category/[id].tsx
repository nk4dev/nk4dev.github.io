import client from "../../../utils/cms";
//BlogLayout
import HMeta from "../../../components/headermeta";
import Layout from "../../../layout/main";
import { css } from "../../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";

const Blog = ({ blog, categories }) => {
  return (
    <Layout>
      <HMeta
        pageTitle="Blog"
        pageDescription="Nknight AMAMIYA'S Blog"
        pagePath="/blog"
      />
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        })}
      >
        The blog is now open for testing.
      </div>
      <div
        className={css({
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "14px",
        })}
      >
        {blog.map((blog) => (
          <div key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <Image
                alt="blog eyecatch image"
                src={
                  blog.eyecatch == null
                    ? "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=crop&w=200&h=200"
                    : blog.eyecatch.url
                }
                width={500}
                height={300}
              />
              <h1>{blog.title}</h1>
              <p>{`${blog.publishedAt.slice(0, 10)} - ${blog.publishedAt.slice(
                11,
                16
              )}`}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content) => `/blog/category/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const blog = await client.get({ endpoint: "blogs" });
  const categories = await client.get({ endpoint: "categories" });
  const data = blog.contents.filter((item) => item.category && item.category.id === id );

  return {
    props: {
      blog: data,
    },
  };
};
export default Blog;
