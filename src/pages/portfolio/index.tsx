import { useRouter } from "next/router";
import HMeta from "../../components/headermeta";
import Link from "next/link";
import Layout from "../../layout/main";
import { MDXRemote } from 'next-mdx-remote'
import { parseMdx } from '../../utils/mdx'
import { useState, useEffect } from 'react'

export default function Portfolio() {
    const router = useRouter();
    const lang = router.query.lang === "ja" ? "ja" : "en";
    return (
        <Layout>
            <HMeta pageTitle="Portfolio" pageDescription="My portfolio page" />
            Portfolio Page
            <QueryPage id={router.query.id as string} lang={lang} />
        </Layout>
    );
}
function QueryPage({ id, lang}: { id?: string | string[]; lang?: string}) {
    const [mdxdata, setMdxdata] = useState(null);
    
    useEffect(() => {
        if (id === "vx3") {
            fetch('/static/vx3' + (lang === "ja" ? "ja" : "en") + '.mdx')
                .then(res => res.text())
                .then(text => parseMdx(text))
                .then(parsedMdx => setMdxdata(parsedMdx));
        }
    }, [id, lang]);
    
    return (
        <div>
            <Link href={lang == "ja" ? "/portfolio?lang=en" : "/portfolio?lang=ja"}>
                <button>
                    {lang == "ja" ? "日本語" : "English"}
                </button>
            </Link>
            {lang == "ja" ? <div>public/static/vx3ja.mdx</div> : <div>public/static/vx3en.mdx</div>}
            {!id ? (
                <div>
                    <Link href={lang == "ja" ? "/portfolio?id=vx3&lang=ja" : "/portfolio?id=vx3&lang=en"} style={{ color: "white", textDecoration: "underline" }}>
                        {lang == "ja" ? "VX3 (日本語)" : "VX3 (English)"}
                    </Link>
                </div>
            ) : (
                <div>
                    {id === "vx3" ? (
                        mdxdata ? <MDXRemote {...mdxdata} /> : "Loading..."
                    ) : "Not Found"}
                </div>
            )}
        </div>
    );
    // ...existing code...
}

/*
export async function getStaticProps(context) {
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    // デフォルトはja
    let lang = 'ja';
    if (context?.params?.lang) {
        const filePath = path.join(process.cwd(), `public/static/vx3ja.mdx`);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(source);
        const mdxSource = await parseMdx(source);
        return { props: { source: mdxSource, frontMatter: data, lang } };
    } else {
        const filePath = path.join(process.cwd(), `public/static/vx3en.mdx`);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(source);
        const mdxSource = await parseMdx(source);
        return { props: { source: mdxSource, frontMatter: data, lang } };
    } 
}

*/