import { css } from "../../styled-system/css";
import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div
      className={css({
        background: "#050021",
        color: "#f0d0ff",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
          padding: "40px",
          borderBottom: "1px solid #f0d0ff",
        })}
      >
        <Link
          href={"/"}
          className={css({
            textShadow: "0 10px 30px #aa00ff",
            borderRadius: "5px",
            padding: "10px",
            color: "#f0d0ff",
          })}
        >
          Nknight AMAMIYA
        </Link>
      </div>

      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          borderBottom: "1px solid #f0d0ff",
        })}
      >
        <Link
          href={"/blog"}
          className={css({
            textShadow: "0 10px 30px #aa00ff",
            borderRadius: "5px",
            color: "#f0d0ff",
          })}
        >
          Blog
        </Link>
        
        <Link
          href={"/apps"}
          className={css({
            textShadow: "0 10px 30px #aa00ff",
            borderRadius: "5px",
            color: "#f0d0ff",
            margin: "0 5px",
          })}
        >
          Apps
        </Link>
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        })}
      >
        The blog is now open for testing.
      </div>
      <main>{children}</main>
      <footer>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            borderTop: "1px solid #f0d0ff",
          })}
        >
          (c)nknighta 2021
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "5px",
            padding: "10px 40px",
            color: "#f0d0ff",
          })}
        >
          - Mail -
          <Link
            href={"mailto:nknighta@varius.technology"}
            aria-label="Open email app"
            className={css({
              borderRadius: "5px",
              padding: "10px 40px",
              color: "#f0d0ff",
            })}
          >
            nknighta@varius.technology
          </Link>
        </div>
      </footer>
    </div>
  );
}
