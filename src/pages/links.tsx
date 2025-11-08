import { useEffect } from "react";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";

export default function Links() {
    return (
        <Layout>
            <HMeta pageTitle="Create a New Link page, Stay Tuned!" />
            <div style={{ textAlign: "center", margin: "5rem", height: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1>Links Page Coming Soon!</h1>
                <p>We're working hard to bring you a new Links page. Stay tuned for updates!</p>
            </div>
        </Layout>
    )
}