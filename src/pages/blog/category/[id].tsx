import client from "../../../utils/cms";
//BlogLayout
import HMeta from "../../../components/headermeta";
import Layout from "../../../layout/main";
import { css } from "../../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Blog = ({ blog, categories, context }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <HMeta
        pageTitle="Blog"
        pageDescription="Nknight AMAMIYA'S Blog"
        pagePath="/blog"
      />
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
        {categories && (
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              gap: "10px",
            })}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.id}`}
                className={css({
                  textShadow: "0 10px 30px #aa00ff",
                  borderRadius: "5px",
                  color: "#f0d0ff",
                  padding: "5px 10px",
                  backgroundColor: category.id === id ? "#aa00ff" : "#050021",
                  transition: "background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#aa00ff",
                    color: "#050021",
                  },
                })}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
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
  const data = blog.contents.filter(
    (item) => item.category && item.category.id === id
  );

  return {
    props: {
      blog: data,
      categories: categories.contents,
    },
  };
};
export default Blog;
