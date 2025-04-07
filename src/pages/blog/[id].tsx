import client from "../../utils/cms";
import Layout from "../../layout/main";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";
import Image from "next/image";

export default function BlogId({ blog }) {
    // get blog published date
    //blog.content = blog.content.replace(/<img[^>]*>/g, (match) => {
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
                pagePath={`blog/${blog.id}`}

            />
            <div className={css({
                display: "flex",
                justifyContent: "center",
                padding: "10px",
            })}>
                The blog is now open for testing.
            </div>
            <Image alt="blog eyecatch image" src={blog.eyecatch == null ? "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=crop&w=200&h=200" : blog.eyecatch.url} width={500} height={300}/>
            <div className={css({
                fontSize: "30px",
                padding: "40px",
                borderBottom: "1px solid #f0d0ff",
            })}>
                {blog.title}
                <p>{`${year} / ${month} / ${day} - ${hour} : ${milute}`}</p>
            </div>
            <div
                className={css({
                    p: 4,
                })}>
                <div className={css({
                    gap: "14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingY: "10px",
                })}
                    dangerouslySetInnerHTML={{
                        __html: `${blog.content}`,
                    }}
                />
                <Link href="/blog">Back to blog</Link>
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