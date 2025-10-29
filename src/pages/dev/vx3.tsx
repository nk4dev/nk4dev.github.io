import Link from "next/link";
import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";
import Image from "next/image";
import HMeta from "../../components/headermeta";

export default function VX3() {
  return (
    <Layout>
      VX3 | Web3 Development Platform
      <HMeta pageTitle="VX3" pageDescription="VX3 is a web3 development platform that simplifies the process of building and deploying decentralized applications." />
      <div className={css({ display: "flex", flexDirection: "column", gap: "12px", margin: "auto", maxWidth: "800px", padding: "20px" })}>
        <div>
          <Image src="https://ogp-img-gen.vercel.app/api/img-gen?text=VX%20SDK%20|%20VX" alt="VX3 Logo" width={1920} height={1080} />
        </div>
        docs
        <Link target="_blank" href="https://nk4dev.github.io/vx3?sdk">
          Repository (nk4dev/vx3)
        </Link>
        <Link target="_blank" href="/l/vx/docs">
          VX3 SDK Docs
        </Link>
      </div>
    </Layout>
  );
}