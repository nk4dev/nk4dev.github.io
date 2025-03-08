import client from '../../utils/cms';
//BlogLayout

import BlogLayout from '../../layout/bloglayout';
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
    const router = useRouter();
    return (
        <BlogLayout>
            <div className={css({ minHeight: '100vh', p: 4 })}>
                {blog.map((blog) => (
                    <div key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>
                            <h1>{blog.title}</h1>
                        </Link>
                    </div>
                ))}
            </div>
        </BlogLayout>
    );
};

export default Blog;