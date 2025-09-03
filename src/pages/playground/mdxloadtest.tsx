import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

import Layout from '../../layout/main'

import { css } from '../../../styled-system/css'
// imported code ./src/utils/mdx.ts
import { parseMdx } from '../../utils/mdx'
import HMeta from '../../components/headermeta'

export default function MyProfile({ source, frontMatter }) {
    return (
        <Layout>
            <HMeta pageTitle={"MDX TEST"} pageDescription={"mdx test page"} />
            <article className={css({ maxWidth: "60vh", margin: '0 auto' })}>
                {frontMatter?.title && <div className={css({ fontSize: '2rem', fontWeight: 'bold' })}>{frontMatter.title}</div>}
                {frontMatter?.img && <Image src={frontMatter.img} alt={frontMatter.title} width={200} height={200} className={css({ width: '100%', height: 'auto' })} />}
                <MDXRemote {...source} />
            </article>
        </Layout>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'public/static/myprofile.mdx')
    const source = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(source)
    // import the mdx helper dynamically to avoid ESM import errors during build
    const mdxSource = await parseMdx(source)
    return { props: { source: mdxSource, frontMatter: data } }
}
