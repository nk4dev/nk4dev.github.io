import client from "../../../utils/cms";
//BlogLayout
import HMeta from "../../../components/headermeta";
import Layout from "../../../layout/main";
import { css } from "../../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Category = ({ categories, currentId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      {!isMenuOpen ? (
        <div>
          <button 
          onClick={() => setIsMenuOpen(true)}
          className={css({
            background: "transparent",
            border: "1px solid #f0d0ff",
            padding: "10px 20px",
            color: "#f0d0ff",
          })}
          >Categories List</button>
        </div>
      ) : (
        <div>
          <div className={
            css(
              {
                position: "relative",
                padding: "10px 20vw",
                border: "2px solid #aa00ff",
                borderRadius: "5px",
                flexWrap: "wrap",
                justifyContent: "center",
                "& > div": {
                  flex: "0 1 calc(33.333% - 20px)",
                },
                backgroundColor: "#000014",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }
            )}>
            <>
              <button onClick={() => setIsMenuOpen(false)} className={css({
                background: "transparent",
                border: "1px solid #f0d0ff",
                padding: "10px 20px",
                color: "#f0d0ff",
              })}>Close</button>
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    className={css({
                      textShadow: "0 10px 30px #aa00ff",
                      borderRadius: "5px",
                      color: "#f0d0ff",
                      padding: "5px 10px",
                      backgroundColor: category.id === currentId ? "#aa00ff" : "transparent",
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#aa00ff",
                        color: "#050021",
                      },
                    })}
                    href={`/blog/category/${category.id}`}
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  );
};


const Blog = ({ blog, categories, currentId }) => {
  const router = useRouter();
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
        <Category categories={categories} currentId={currentId} />
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
      currentId: id,
    },
  };
};
export default Blog;
