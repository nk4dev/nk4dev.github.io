import Layout from "../../layout/main";
import { useRouter } from "next/router";

export default function Link() {
  const router = useRouter();
  const { linkid } = router.query;

  if (!linkid) {
    return <div>Loading...</div>; // Handle loading state
  }

    linkid === "vx" && router.push("https://github.com/nknighta/vx/pkgs/npm/vx");
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" , height: "100vh"}}>
        <h1>Redirect to {linkid}</h1>
      </div>
    </Layout>
  );
}
