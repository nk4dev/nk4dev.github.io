import client from "../../../utils/cms";
import Layout from "../../../layout/main";
import Link from "next/link";
import { css } from "../../../../styled-system/css";
import HMeta from "../../../components/headermeta";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/router";

// Add a function to process blog.content and apply styles to <code> tags
export default function BlogId({ project }) {
  // Process blog.content to style <code> tags
  const router = useRouter();
  const cmsstyle = `
    <style>
    h2 {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }
    h3 {
        font-size: 1.3rem;
        margin-top: 1.2rem;
        margin-bottom: 0.7rem;
    }

    pre {
      line-height: 1.4;
      overflow-x: scroll;
    }

    pre::before {
      content: "→ scroll →";
      display: block;
      height: 5vh;
    }

    code {
      font-family: 'Courier New', Courier, monospace;
    }
    </style>
    `;

  // only for devmode CMS data view
  const [isDevmodeOpen, setIsDevmodeOpen] = useState(false);

  // motion scroll progress bar script start
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY?.getPrevious() ?? 0);
    setScrollDirection(diff > 0 ? "down" : "up");
  });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () =>
      setScrollY(window.scrollY ?? window.pageYOffset ?? 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // motion scroll progress bar script end

  // Redirect if project is missing on the client-side
  useEffect(() => {
    if (!project) {
      router.push("/dev");
    }
  }, [project, router]);

  // Prevent rendering content while project is undefined
  if (!project) {
    return (
      <Layout>
        <div
          className={css({
            padding: "40px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          })}
        >
          <h1 className={css({ fontSize: "36px", fontWeight: "bold" })}>
            Not Found
          </h1>
          <p className={css({ fontSize: "18px", marginY: "12px" })}>
            This content is not published.
          </p>
          <Link href="/dev">Back to list</Link>
        </div>
      </Layout>
    );
  }

  // Date parsing helpers (robust, avoids reliance on locale strings)
  const pad = (n, size = 2) => String(n).padStart(size, "0");
  const isValid = (d) => d instanceof Date && !isNaN(d.getTime());

  const getParts = (dateLike) => {
    const d = new Date(dateLike ?? "");
    if (!isValid(d)) {
      return {
        year: "0000",
        month: "00",
        day: "00",
        hour: "00",
        minute: "00",
      };
    }
    return {
      year: String(d.getFullYear()),
      month: pad(d.getMonth() + 1),
      day: pad(d.getDate()),
      hour: pad(d.getHours()),
      minute: pad(d.getMinutes()),
    };
  };

  const { year, month, day, hour, minute } = getParts(project.publishedAt);

  const {
    year: updatedYear,
    month: updatedMonth,
    day: updatedDay,
    hour: updatedHour,
    minute: updatedMinute,
  } = getParts(project.updatedAt);

  return (
    <Layout>
      <HMeta
        pageTitle={project.name || project.title}
        pageDescription="My development projects"
        pagePath={`/dev/${project.id}`}
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
        style={{ scaleX: scrollYProgress }}
      />

      {process.env.NODE_ENV === "development" && (
        <div
          className={css({
            position: "fixed",
            top: 0,
            left: 0,
            color: "#ff0000",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "scroll",
            zIndex: 0,
            padding: "20px",
          })}
        >
          {isDevmodeOpen ? (
            <div>
              dev CMS Data
              <code>
                <pre>{JSON.stringify(project, null, 2)}</pre>
              </code>
              <button onClick={() => setIsDevmodeOpen(false)}>Close</button>
            </div>
          ) : (
            <button onClick={() => setIsDevmodeOpen(true)}>
              Open Devmode CMS Data
            </button>
          )}
        </div>
      )}
      <div>
        <h1
          className={css({
            fontSize: "28px",
            fontWeight: "bold",
            padding: "0px 40px",
          })}
        >
          {project.name}
        </h1>
        <h3
          className={css({
            fontSize: "23px",
            padding: "0 40px",
          })}
        >
          {project.id}
        </h3>
        <div
          className={css({
            fontSize: "18px",
            padding: "10px 40px",
          })}
        >
          URL:
          <Link
            href={project.url === undefined ? "#" : project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.url === undefined ? "N/A" : project.url}
          </Link>
        </div>
      </div>
      <div
        className={css({
          fontSize: "22px",
          padding: "10px 40px",
          borderBottom: "1px solid #f0d0ff",
        })}
      >
        <p>created {`${year}/${month}/${day} - ${hour} : ${minute}`}</p>
        {project.updatedAt !== project.publishedAt ? (
          <p>
            updated{" "}
            {`${updatedYear}/${updatedMonth}/${updatedDay} - ${updatedHour} : ${updatedMinute}`}
          </p>
        ) : (
          <div>no updated</div>
        )}
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
              __html: `${project.content}${cmsstyle}`,
            }}
          />
          <Link href="/dev">Back to list</Link>
        </div>
      </div>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "projects" });

  // Only include published items in the paths (avoid generating pages for unpublished content)
  const paths = data.contents
    .filter((content) => content.publishedAt)
    .map((content) => `/dev/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "projects", contentId: id });

  // If the content is not found or not published (no publishedAt), return 404
  if (!data || !data.publishedAt) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: data,
    },
  };
};
