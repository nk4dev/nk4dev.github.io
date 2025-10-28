import Layout from '../../layout/main'
import { css } from '../../../styled-system/css'
import Link from 'next/link'
import HMeta from '../../components/headermeta'

export default function DevProject() {
    return (
        <Layout>
            <HMeta pageTitle="My dev Projects" pageDescription="Development log for my projects." />
            <div className={css({ textAlign: "center" })}>
                <h1 className={css({
                    fontSize: "40px",
                    margin: "4vh 0",
                })}>
                    Development <br />Projects
                </h1>
                <p>Welcome to the development projects page.</p>
            </div>
            <div className={css({
                padding: "20px",
                borderTop: "1px solid #f0d0ff",
                textAlign: "center",
            })}>
                <h2 className={css({ fontSize: "30px", margin: "4vh 0" })}>Ongoing Projects</h2>
                <ul>
                    <Devlinks href="/dev/google-img-hosts" text="Google Img Hosts" isNew />
                    <Devlinks href="/dev/my-clicker-game" text="My Clicker Game" isNew />
                    <Devlinks href="/dev/make-a-os" text="Make OS with Rust" isNew/>
                    <Devlinks target="_blank" href="/dev/vx3-mcp" text="VX3 MCP (Open Gitmcp website)" />
                </ul>
            </div>
        </Layout>
    )
}

function Devlinks({ text, href, target, isNew }: { text: string, href: string, target?: string, isNew?: boolean }) {
    return (
        <Link href={href} target={target} className={css({ display: "block", margin: "10px 0", fontSize: "23px", _hover: { color: "#aa00ff" } })}>
            {isNew && <div className={css({ width: "20vw", background: "#f0d0ff", color: "#000",margin: "0 auto", _hover: { background: "#aa00ff", color: "#fff" } })}>⚡new</div>}
            <li>{text}</li>
        </Link>
    )
}