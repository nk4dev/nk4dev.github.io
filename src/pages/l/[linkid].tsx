import { useEffect } from "react";
import Layout from "../../layout/main";
import { useRouter } from "next/router";

export default function Link() {
  const router = useRouter();
  const { linkid } = router.query;

  if (!linkid) {
    return <div>Loading...</div>;
  }

  const redirecthandler = () => {
    if (linkid === "vx") {
      useEffect(() => {
        window.location.href = "https://github.com/nknighta/vx/pkgs/npm/vx";
      }, []);
    }
  };

  redirecthandler();
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Redirecting...</h1>
        <p>You are being redirected to the VX package page.</p>
      </div>
    </Layout>
  );
}
