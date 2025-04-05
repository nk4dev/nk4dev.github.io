import client from "../../utils/cms";
import Layout from "../../layout/main";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";

export default function BlogId({ blog }) {
    // get blog published date
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
                    minHeight: "90vh",
                    p: 4,
                })}>
                <div
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