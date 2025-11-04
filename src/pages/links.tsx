import { useEffect } from "react";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import { useRouter } from "next/router";

export default function Links() {
    const router = useRouter();
    useEffect(() => {
        const url = `/?oldlinkpageredirect=1`;
        router.push(url);
    }, []);
    return (
        <Layout>
            <HMeta pageTitle="Redirecting..." />
            redirecting...
        </Layout>
    )
}