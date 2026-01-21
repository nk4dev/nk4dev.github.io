import Layout from "../layout/main";
import LinkPage from "../components/redirect";
import HMeta from "../components/headermeta";

export default function VRCRedirect() {
  return (
    <Layout>
      <HMeta
        pageTitle="Nknight AMAMIYA | VRChat"
        pageDescription="Nknight AMAMIYA's VRChat Profile"
        pageImg="https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/d17eaece880442c78ebf7fbad2773041/VRChat_2026-01-21_14-24-23.727_2560x1440.png"
        pageImgHeight={1440}
        pageImgWidth={2560}
        pagePath="/vrchat"
      />
      <LinkPage url="https://vrchat.com/home/user/usr_3c0e5ebc-16db-4f61-bdfb-88ff8385a7d4" text="VRChat" />
    </Layout>
  );
}
