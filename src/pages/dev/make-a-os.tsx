import Layout from "../../layout/main";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";

function MakeAOS() {
  return (
    <Layout>
      <HMeta pageTitle="Make My OS" pageDescription="Development log for making my own operating system using Rust." />
      <div className={css({ display: "flex", flexDirection: "column", gap: "12px", margin: "auto", maxWidth: "800px", padding: "20px" })}>
        <h1 className={css({ fontSize: "32px", fontWeight: "bold" })}>Make My OS</h1>
        <h2 className={css({ fontSize: "25px" })}>Language</h2>
        <p className={css({ fontSize: "16px" })}>
          Rust (Nightly)
        </p>
        <h2 className={css({ fontSize: "25px" })}>Links</h2>
        <Link target="_blank" href="https://zenn.dev/nknight_amamiya/scraps/8fc44914bd6ed1">
          Open on zenn.dev
        </Link>
        <Link target="_blank" href="#">
          Repository (Coming soon)
        </Link>
        <h2 className={css({ fontSize: "25px" })}>References</h2>
        <Link target="_blank" href="https://os.phil-opp.com/">
          Writing a OS in Rust (phil-opp.com)
        </Link>
      </div>
    </Layout>
  );
}

export default MakeAOS;
