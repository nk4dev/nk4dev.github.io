import { css } from "../../styled-system/css"
import Link from "next/link";

export default function BlogLayout({ children }) {
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

            <div className={css({
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                borderBottom: "1px solid #f0d0ff",
            })}>
                <Link href={"/blog"} className={css({
                    textShadow: "0 10px 30px #aa00ff",
                    borderRadius: "5px",
                    color: "#f0d0ff",
                    margin: "0 5px"
                })}>
                    Blog
                </Link>
            </div>
            <main>
                {children}
            </main>
            <footer>
                <div className={css({
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "7vh",
                    borderTop: "1px solid #f0d0ff",
                    background: "#000",
                })}>
                    <div>
                        (c) Nknight AMAMIYA 2021
                    </div>
                    <Link href={"https://varius.technology/"} className={css({
                        borderRadius: "5px",
                        padding: "10px 40px",
                        color: "#f0d0ff",
                    })}>
                        varius.technology
                    </Link>
                    
                    <Link href={"https://nknighta.github.io"} className={css({
                        borderRadius: "5px",                        
                        padding: "10px 40px",
                        color: "#f0d0ff",
                    })}>
                        nknighta.github.io
                    </Link>
                </div>
            </footer>
        </div>
    )
}