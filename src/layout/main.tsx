import { css } from "../../styled-system/css"
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div className={css({
            background: "#050021",
            color: "#f0d0ff",
        })}>
            <div className={css({
                display: "flex",
                justifyContent: "center",
                fontSize: "30px",
                padding: "40px",
                borderBottom: "1px solid #f0d0ff",
            })}>
                <Link href={"/"} className={css({
                    textShadow: "0 10px 30px #aa00ff",
                    borderRadius: "5px",
                    padding: "10px",
                    color: "#f0d0ff",
                })}>
                    Nknight AMAMIYA
                </Link>
            </div>
            <main>
                {children}
            </main>
            <footer>
                <div className={css({
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                    borderTop: "1px solid #f0d0ff",
                })}>
                    (c)nknighta 2021
                </div>
            </footer>
        </div>
    )
}