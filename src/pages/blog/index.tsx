import client from '../../utils/cms';
//BlogLayout
import HMeta from '../../components/headermeta';
import Layout from '../../layout/main';
import { css } from '../../../styled-system/css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: 'blogs' });

    return {
        props: {
            blog: data.contents,
        },
    };
};

const Blog = ({ blog }) => {
    return (
        <Layout>
            
            <HMeta
                pageTitle="Blog"
                pageDescription="Nknight AMAMIYA'S Blog"
                pagePath="/blog"
            />
            <div className={css({
                display: "flex",
                justifyContent: "center",
                padding: "10px",
            })}>
                The blog is now open for testing.
            </div>
            <div className={css({ minHeight: '100vh', p: 4 })}>
                {blog.map((blog) => (
                    <div key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>
                            <h1>{blog.title}</h1>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Blog;