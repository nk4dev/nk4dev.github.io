import Link from "next/link";
import { css } from "../../styled-system/css";

export function ProfileHead({ children }) {
    return (
        <h1 className={css({ fontSize: "26px" })}>{children}</h1>
    )
}

export function ProfileBody({ children }) {
    return (
        <div className={css({
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        })}>
            {children}
        </div>
    )
}

export function ProfileLink({ href, target, children } : { href: string; target?: string; children: React.ReactNode }) {
    return (
        <Link href={href} target={target} className={css({
            fontSize: "20px",
            p: 2,
            width: "100%",
            m: 2,
            color: "#f0d0ff",
            borderRadius: "5px",
            textShadow: "0 10px 30px #aa00ff",
        })}>
            {children}
        </Link>
    )
}

export function ProfileCenter({ children }) { 
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        })}>
            {children}
        </div>
    )
}