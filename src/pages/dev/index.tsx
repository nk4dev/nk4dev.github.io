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
        <h1
          className={css({
            fontSize: "36px",
            fontWeight: "bold",
            color: "#7856ff",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            "&:hover": { color: "#007bff" },
          })}
        >
          Dev Projects
        </h1>
        {blog.map((blog, category) => (
          <div key={blog.id}>
            <Link href={`/dev/${blog.id}`}>
              <h1
                className={css({
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "7856ff",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#007bff",
                  },
                })}
              >
                {blog.name}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
