import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import client from "../utils/cms";

export default function Links({ content }) {
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
    </style>    
    `;
    return (
        <Layout>
            <HMeta pageImg={content?.image?.url} pageTitle="My SNS Links" pageDescription="My SNS Links" />
            <div
                className="links-content"
                dangerouslySetInnerHTML={{ __html: content?.content + cmsstyle || "" }}
            />
        </Layout>
    )
}

export const getStaticProps = async (context) => {
    const data = await client.get({ endpoint: "links" });

    return {
        props: {
            content: data,
        },
    };
};

