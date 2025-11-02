import Layout from "../layout/main";

export default function Custom404() {
    return (
        <Layout>
            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </Layout>
    )
}