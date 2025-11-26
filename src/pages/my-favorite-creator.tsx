import { useEffect } from "react";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";

export default function MyFavoriteCreator() {
    return (
        <Layout>
            <HMeta pageTitle="MyFavoriteCreator" />
            <div style={{ textAlign: "center", margin: "5rem", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1>My Favorite Creator</h1>
                <div style={{ maxWidth: "600px", textAlign: "left" }}>
                    notice: The content of this page may change without notice.
                    It will be deleted if the poster requests it.
                </div>
            </div>
        </Layout>
    )
}