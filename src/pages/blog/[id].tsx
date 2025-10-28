import client from "../../utils/cms";
import Layout from "../../layout/main";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
//const { scrollYProgress } = useScroll();

// Add a function to process blog.content and apply styles to <code> tags
function styleCodeTags(content) {
  return content.replace(
    /<pre(.*?)>/g,
    '<p>code<p><pre$1 style="overflow: scroll; background: #000; padding: 10px; border-radius: 5px; color: #fff; border: 1px solid #ccc;">'
  );
}
export default function BlogId({ blog }) {
  // Process blog.content to style <code> tags
  const styledContent = styleCodeTags(blog.content);

  // only for devmode CMS data view
  const [isDevmodeOpen, setIsDevmodeOpen] = useState(false);

  // motion scroll progress bar script start
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down")

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY?.getPrevious() ?? 0)
    setScrollDirection(diff > 0 ? "down" : "up")
  })
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY ?? window.pageYOffset ?? 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // motion scroll progress bar script end


  // get formatted date 
  const persedIsoDate = new Date(blog.publishedAt);
  const year = persedIsoDate.getFullYear();
  const month = persedIsoDate.getMonth() + 1;
  const day = persedIsoDate.getDate();
  const hour = persedIsoDate.getHours();
  const milute = persedIsoDate.getMinutes();

  return (
    <Layout>
      <HMeta
        pageTitle={blog.title}
        pageDescription="Nknight AMAMIYA'S Blog"
        pagePath={`/blog/${blog.id}`}
      />

      <motion.div
        className={css({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          backgroundColor: "#aa00ff",
          transformOrigin: scrollDirection === "down" ? "0% 100%" : "0% 0%",
          zIndex: 9999,
        })}
        style={{ scaleX: scrollYProgress }} />
      <div
        className={css({
          width: "100%",
          height: "300px",
          position: "relative",
          overflow: "hidden",
        })}
      >
        <Image
          alt={blog.eyecatch ? blog.eyecatch.alt : "eyecatch image"}
          src={
            blog.eyecatch == null
              ? "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=crop&w=200&h=200"
              : blog.eyecatch.url
          }
          layout="fill"
          objectFit="cover"
        />
        <div
          className={css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          })}
        />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div
          className={css({
            position: "fixed",
            top: 0,
            left: 0,
            color: "#ff0000",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "auto",
            zIndex: 0,
            padding: "20px",
          })}
        >
          {isDevmodeOpen ? (
            <div>
              dev
              CMS Data
              <code>
                <pre>{JSON.stringify(blog, null, 2)}</pre>
              </code>
              <button onClick={() => setIsDevmodeOpen(false)}>
                Close
              </button>
            </div>
          ) : (
            <button onClick={() => setIsDevmodeOpen(true)}>
              Open Devmode CMS Data
            </button>
          )}
        </div>
      )}
      <div
        className={css({
          fontSize: "30px",
          padding: "40px",
          borderBottom: "1px solid #f0d0ff",
        })}
      >
        {blog.title}
        <p>{`${year}/${month}/${day} - ${hour} : ${milute}`}</p>
      </div>
      <div
        className={css({
          p: 4,
        })}
      >
        <div
          className={css({
            gap: "14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingY: "10px",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.6",
          })}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `${styledContent}`,
            }}
          />
          <Link href="/blog">Back to blog</Link>
        </div>
      </div>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
