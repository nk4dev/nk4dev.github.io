import Layout from '../../layout/main'
import { css } from '../../../styled-system/css'
import Link from 'next/link'

export default function DevProject() {
    return (
        <Layout>
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
                    <Link target="_blank" href="/dev/vx3-mcp" className={css({ display: "block", margin: "10px 0", fontSize: "23px" })}>
                        <li>VX3 MCP (Open Gitmcp website)</li>
                    </Link>
                    <Link href="/dev/make-a-os" className={css({ display: "block", margin: "10px 0", fontSize: "23px" })}>
                        <li>Make OS with Rust</li>
                    </Link>
                </ul>
            </div>
        </Layout>
    )
}