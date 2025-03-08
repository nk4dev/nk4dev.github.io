import client from "../../utils/cms";
import BlogLayout from "../../layout/bloglayout";
import Link from "next/link";
import { css } from "../../../styled-system/css";

export default function BlogId({ blog }) {
    return (
        <BlogLayout>
            <div className={css({
                fontSize: "30px",
                padding: "40px",
                borderBottom: "1px solid #f0d0ff",
            })}>
                {blog.title}
                <p>{blog.publishedAt}</p>
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
        </BlogLayout>
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