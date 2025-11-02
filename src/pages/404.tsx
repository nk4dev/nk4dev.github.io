import HMeta from "../components/headermeta";
import Link from "next/link";

export default function Custom404() {
    return (
        <>
            <HMeta pageTitle="404 - Page Not Found" pageDescription="The page you are looking for does not exist." />
            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                <h1>Sorry!</h1>
            </div>

            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link href="/" style={{textDecoration: "underline"}}>Go to Home</Link>
            </div>
            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                &copy; 2021 - {new Date().getFullYear()} Nknight AMAMIYA@nk4dev
            </div>
        </>
    )
}