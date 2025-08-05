import Layout from "../layout/main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LinkPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("https://instagram.com/nk4dev");
  }, []);
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px", height: "100vh" }}>
        <h1>Redirect to Instagram...</h1>
        <p>
          If you are not redirected automatically, please click the link below.
        </p>
        <Link
          href="https://instagram.com/nk4dev"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Go to VX
        </Link>
      </div>
    </Layout>
  );
}
