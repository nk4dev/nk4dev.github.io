import Link from "next/link";
import { css } from "../../styled-system/css";

interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
    target?: string;
}

export default function CustomLink({ href, children, size, target }: CustomLinkProps) {
    target = target || "_self"; // default to opening in the same tab if target is not provided
    return (
        <Link href={href} target={target} className={css({
            fontSize: size === "small" ? "12px" : size === "large" ? "18px" : "14px",
            textShadow: "0 10px 30px #aa00ff",
            color: "#f0d0ff",
            borderRadius: "5px",
        })}>
            {children}
        </Link>
    );
}