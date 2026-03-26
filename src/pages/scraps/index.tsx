import client from "../../utils/cms";
//BlogLayout
import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";
import Link from "next/link";
import Image from "next/image";
import CustomLink from "../../components/clink";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "scraps" });
  //console.log(data.contents[2]);
  if (!data.contents) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      scraps: data.contents,
    },
  };
};

const Blog = ({ scraps, categories }) => {
  return (
    <Layout>
      <HMeta
        pageTitle="Scraps"
        pageDescription="Nknight AMAMIYA'S Scraps"
        pagePath="/scraps"
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
          })}
        >
          Scraps
        </h1>
        <div className={css({ display: "grid", gap: "5vh" })}>
          {scraps.map((scrap) => (
            <CustomLink
              key={scrap.id}
              href={`/scraps/${scrap.id}`}
            >
              <h2 className={css({ fontSize: "24px", fontWeight: "bold" })}>
                {scrap.title}
              </h2>
              <p>ID: {scrap.id}</p>
              <div className={css({ display: "flex", gap: "10px" })}>
                <p>Created: {scrap.createdAt}</p>
                <p>Updated: {scrap.updatedAt}</p>
              </div>
            </CustomLink>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
