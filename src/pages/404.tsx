import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function Custom404() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState("");
    if (!searchParams) {
        // Render fallback UI while search params are not yet available
        return null;
    }

    const fallback = searchParams.get('notfoundfallback');
    useEffect(() => {
        const pathname = router.asPath;
        if (!fallback) {
            router.push("https://apps.nknighta.me/" + pathname);
        }
    }, [fallback, router]);

    return (
        <>
        {redirectUrl}
            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                <h1>Sorry!</h1>
            </div>
            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link href="/" style={{ textDecoration: "underline" }}>Go to Home</Link>
            </div>
            <div style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
                &copy; 2021 - {new Date().getFullYear()} Nknight AMAMIYA@nk4dev
            </div>
        </>
    )
}