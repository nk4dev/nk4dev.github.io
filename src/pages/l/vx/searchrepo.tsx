import Layout from "../../../layout/main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LinkPage() {
  const router = useRouter();
  const url = `https://github.com/nk4dev?tab=repositories&q=vx`;
  useEffect(() => {
      router.push(url);
  }, []);
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px", height: "100vh" }}>
        <h1>Redirect to {url}</h1>
        <p>
          If you are not redirected automatically, please click the link below.
        </p>
        <Link
          href={url}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Go to VX Repositories
        </Link>
      </div>
    </Layout>
  );
}
