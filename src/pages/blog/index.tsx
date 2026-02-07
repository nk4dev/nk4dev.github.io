import client from "../../utils/cms";
//BlogLayout
import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const getServerSideProps = async ({ context }) => {
  const data = await client.get({
    endpoint: "blogs",
    queries:
    {
      offset: 0,
      limit: 100
    },
    customRequestInit: {
      next: {
        revalidate: 60,
      },
    },
  });
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
          <button
            className={css({
              padding: "10px",
              border: "1px solid #f0d0ff",
            })}
            onClick={() => setIsMenuOpen(true)}
          >
            Categories
          </button>
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
              <button
                className={css({
                  padding: "10px",
                  border: "1px solid #f0d0ff",
                })}
                onClick={() => setIsMenuOpen(false)}>
                Close
              </button>
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
                        backgroundColor: "#f0d0ff",
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
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"],
            gap: "24px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            mt: 6,
          })}
        >
          {blog.map((blog, category) => (
            <div key={blog.id}
              className={css({
                background: "#0a001a",
                borderRadius: "12px",
                boxShadow: "0 2px 16px #aa00ff33",
                overflow: "hidden",
                transition: "transform 0.2s",
                '&:hover': { transform: "scale(1.03)" },
                display: "flex",
                flexDirection: "column",
              })}
            >
              <Link href={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
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
                    width: "100%",
                    height: "200px",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  })}
                />
                <div className={css({ p: 4 })}>
                  <h1 className={css({ fontSize: "1.2rem", color: "#f0d0ff", mb: 2 })}>{blog.title}</h1>
                  {blog.category ? (
                    <p className={css({ color: "#aa00ff", fontWeight: "bold" })}>
                      Category: {blog.category.name}
                    </p>
                  ) : (
                    <p className={css({ color: "#f0d0ff" })}>No Category</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;