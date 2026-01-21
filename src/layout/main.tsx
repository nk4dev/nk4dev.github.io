import { css } from "../../styled-system/css";
import Link from "next/link";
import ClickSpark from "../components/ClickSpark/ClickSpark";
import {ShareButton, CopyButton} from "../components/AnimatedContent/shrebtn";

export default function Layout({ children }) {
  return (
    <ClickSpark>
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
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            borderBottom: "1px solid #f0d0ff",
          })}
        >
          <div
            className={css({
              width: "100%",
              display: "flex",
              justifyContent: "center",
            })}
          >
            <Link
              href={"/blog"}
              className={css({
                textShadow: "0 10px 30px #aa00ff",
                borderRadius: "5px",
                color: "#f0d0ff",
                margin: "0 5px",
              })}
            >
              Blog
            </Link>

            <Link
              href={"/dev"}
              className={css({
                textShadow: "0 10px 30px #aa00ff",
                borderRadius: "5px",
                color: "#f0d0ff",
                margin: "0 5px",
              })}
            >
              Dev Projects
            </Link>
          </div>
          <div
            className={css({
              width: "100%",
              display: "flex",
              justifyContent: "center",
            })}
          >
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

            <Link
              href={"/videos"}
              className={css({
                textShadow: "0 10px 30px #aa00ff",
                borderRadius: "5px",
                color: "#f0d0ff",
                margin: "0 5px",
              })}
            >
              Videos
            </Link>
          </div>
        </div>
        <main>{children}</main>
        <footer>
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "7vh",
              borderTop: "1px solid #f0d0ff",
              background: "#000",
              paddingBottom: "15vh",
            })}
          >
            <div className={css({ marginBottom: "20px" })}>
              <p>Share this page:</p>
              <div
                className={css({ display: "flex", justifyContent: "center", flexDirection: "column", gap: "10px" })}
              >
                <ShareButton />
                <CopyButton />
              </div>
            </div>
            <div>(c) Nknight AMAMIYA 2021</div>
            <Link
              href={"https://varius.technology/"}
              className={css({
                borderRadius: "5px",
                padding: "10px 40px",
                color: "#f0d0ff",
              })}
            >
              varius.technology
            </Link>

            <Link
              href={"https://nknighta.me"}
              className={css({
                borderRadius: "5px",
                padding: "10px 40px",
                color: "#f0d0ff",
              })}
            >
              nknighta.me
            </Link>

            <Link
              href={"https://nknighta.me/vrchat"}
              aria-label="Privacy Policy"
              className={css({
                borderRadius: "5px",
                padding: "10px 40px",
                color: "#f0d0ff",
              })}
            >
              VRChat
            </Link>
            <Link
              href={"/llmassets"}
              className={css({
                borderRadius: "5px",
                padding: "10px 40px",
                color: "#f0d0ff",
              })}
            >
              LLM Assets
            </Link>
            <Link
              href={"https://nknighta.me/privacy-policy"}
              aria-label="Privacy Policy"
              className={css({
                borderRadius: "5px",
                padding: "10px 40px",
                color: "#f0d0ff",
              })}
            >
              Privacy Policy
            </Link>
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
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
