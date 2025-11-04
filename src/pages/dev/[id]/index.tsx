import client from "../../../utils/cms";
import Layout from "../../../layout/main";
import Link from "next/link";
import { css } from "../../../../styled-system/css";
import HMeta from "../../../components/headermeta";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import blog from "../../blog";
//const { scrollYProgress } = useScroll();

// Add a function to process blog.content and apply styles to <code> tags
export default function BlogId({ project }) {
    // Process blog.content to style <code> tags
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
    const persedIsoDate = new Date(project.publishedAt);
    const updatedDate = new Date(project.updatedAt);

    const fomattedDate = persedIsoDate.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    const [year, month, day, hour, minute] = fomattedDate.match(/\d+/g);

    const updatedFomattedDate = updatedDate.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    const [updatedYear, updatedMonth, updatedDay, updatedHour, updatedMinute] = updatedFomattedDate.match(/\d+/g);

    return (
        <Layout>
            <HMeta
                pageTitle={project.title}
                pageDescription="My development projects"
                pagePath={`/blog/${project.id}`}
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
                            dev
                            CMS Data
                            <code>
                                <pre>{JSON.stringify(project, null, 2)}</pre>
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
            <div>
                <h1 className={css({
                    fontSize: "28px",
                    fontWeight: "bold",
                    padding: "0px 40px",
                })}>
                    {project.name}
                </h1>
                <h3 className={css({
                    fontSize: "23px",
                    padding: "0 40px",
                })}>
                    {project.id}
                </h3>
                <div className={css({
                    fontSize: "18px",
                    padding: "10px 40px",
                })}>
                    URL:
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.url}
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
                    <p>updated {`${updatedYear}/${updatedMonth}/${updatedDay} - ${updatedHour} : ${updatedMinute}`}</p>
                ) : (<div>no updated</div>)}
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

    const paths = data.contents.map((content) => `/dev/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "projects", contentId: id });

    return {
        props: {
            project: data,
        },
    };
};
