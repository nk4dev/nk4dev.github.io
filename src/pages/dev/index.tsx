import client from "../../utils/cms";
//BlogLayout
import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "projects" });
  //console.log(data.contents[2]);
  return {
    props: {
      blog: data.contents,
    },
  };
};

const Blog = ({ blog, categories }) => {
  return (
    <Layout>
      <HMeta
        pageTitle="Blog"
        pageDescription="Nknight AMAMIYA'S Blog"
        pagePath="/blog"
      />
      {categories && (
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            gap: "10px",
          })}
        ></div>
      )}
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
        {blog.map((blog, category) => (
          <div key={blog.id}>
            <pre
              className={css({
                width: "100%",
                maxWidth: "600px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "monospace",
              })}
            >
              {JSON.stringify(blog, null, 2)}
            </pre>
            <Link href={`/dev/${blog.id}`}>
              <h1>{blog.name}</h1>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
