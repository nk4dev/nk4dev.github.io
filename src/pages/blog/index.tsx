import client from "../../utils/cms";
//BlogLayout
import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const categories = await client.get({ endpoint: "categories" });
  //console.log(data.contents[2]);
  return {
    props: {
      blog: data.contents,
      categories: categories.contents,
    },
  };
};

const Category = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      {!isMenuOpen ? (
        <div>
          <button onClick={() => setIsMenuOpen(true)}>Categories</button>
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
              <button onClick={() => setIsMenuOpen(false)}>Categories</button>
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    className={css({
                      textShadow: "0 10px 30px #aa00ff",
                      borderRadius: "5px",
                      color: "#f0d0ff",
                      padding: "5px 10px",
                      backgroundColor: "#050021",
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

const Blog = ({ blog, categories }) => {
  const [page, setPage] = useState(1);
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
        <Category categories={categories} />
        {blog.map((blog, category) => (
          <div key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <Image
                src={
                  blog.eyecatch == null
                    ? "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=fill&fill-color=000021&w=500&h=300"
                    : blog.eyecatch.url +
                    "?fit=fill&fill-color=000021&w=500&h=300"
                }
                alt="blog"
                width={500}
                height={300}
                className={css({
                  objectFit: "cover",
                  objectPosition: "center",
                  h: "300px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  transition: "transform 0.3s ease-in-out",
                  height: "auto",
                })}
              />
              <h1>{blog.title}</h1>
              {blog.category ? (
                <p className={css({ color: "#f0d0ff" })}>
                  Category: {blog.category.name}
                </p>
              ) : (
                <p className={css({ color: "#f0d0ff" })}>No Category</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
