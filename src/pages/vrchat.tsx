import Layout from "../layout/main";
import LinkPage from "../components/redirect";
import HMeta from "../components/headermeta";

export default function VRCRedirect() {
  return (
    <Layout>
      <HMeta
        pageTitle="Nknight AMAMIYA | VRChat"
        pageDescription="Nknight AMAMIYA's VRChat Profile"
        pagePath="/vrchat"
      />
      <LinkPage url="https://vrchat.com/home/user/usr_3c0e5ebc-16db-4f61-bdfb-88ff8385a7d4" text="VRChat" />
    </Layout>
  );
}
