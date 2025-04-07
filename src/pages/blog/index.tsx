import client from '../../utils/cms';
//BlogLayout
import HMeta from '../../components/headermeta';
import Layout from '../../layout/main';
import { css } from '../../../styled-system/css';
import Link from 'next/link';
import Image from 'next/image';

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: 'blogs' });
    //console.log(data.contents[2]);
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
            <div className={css({ 
                 p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '14px',})}>
                {blog.map((blog, index) => (
                    <div key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>
                        <Image
                            src={blog.eyecatch == null ? "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=fill&fill-color=000021&w=500&h=300": blog.eyecatch.url + "?fit=fill&fill-color=000021&w=500&h=300"}
                            alt="blog"
                            width={
                                500
                            }
                            height={
                                300
                            }
                            className={css({
                                objectFit: 'cover',
                                objectPosition: 'center', 
                                h: '300px',
                                borderRadius: '10px',
                                marginBottom: '20px',
                                transition: 'transform 0.3s ease-in-out',   
                                height: 'auto',
                            })}
                            />
                            <h1>{blog.title}</h1>
                            <p>{`${blog.publishedAt.slice(0, 10)} - ${blog.publishedAt.slice(11, 16)}`}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Blog;