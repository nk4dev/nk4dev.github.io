import Layout from "../../../layout/main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LinkPage() {
  const router = useRouter();
  useEffect(() => {
      const url = `https://nknighta.me/vx`;
      router.push(url);
  }, []);
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px", height: "100vh" }}>
        <h1>Redirect to https://nknighta.me/vx</h1>
        <p>
          If you are not redirected automatically, please click the link below.
        </p>
        <Link
          href="https://nknighta.me/vx"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Go to VX docs
        </Link>
      </div>
    </Layout>
  );
}
