import { css } from "../../styled-system/css";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Index() {
  const router = useRouter();
  const availablequery = router.query.im ? true : false;

  return (
    <Layout>
      {availablequery && (
        <div className={css({ paddingY: "2vh", textAlign: "center", background: "linear-gradient(to top,#00000000, #050071)", color: "#f0d0ff" })}>
          thanks for visit <Link className={css({_hover: { textDecoration: "underline" }})} href="https://mastodon.social/@nknighta">my social network profile</Link> <br />
        </div>
      )}
      <HMeta pageTitle="Who are you?" pageDescription="who ami I?"/>
      <div className={css({ paddingY: "5vh" })}>
        <div>
          <h1 className={css({ fontSize: "25px", textAlign: "center" })}>
            Who are you?
          </h1>
          <button
            className={css({ padding: "20px" })}
            onClick={() => alert("You clicked my name! lol")}
          >
            Nknight AMAMIYA. lol
          </button>
        </div>
        <div className={css({ padding: "20px 20px" })}>
          <h2 className={css({ fontSize: "22px", textAlign: "center" })}>
            What's this website?
          </h2>
          <p>my blog and playground</p>
          <h2 className={css({ fontSize: "20px", textAlign: "center" })}>
            Using Tech Stack
          </h2>
          <p>
            <span
              className={css({
                bgColor: "#a0a0a065",
                paddingX: "2px",
                borderRadius: "3px",
              })}
            >
              - Next.js <br />
              - TypeScript <br />
              - React <br />
              - Panda CSS <br />
              - GitHub Pages <br />
              - MicroCMS <br />
            </span>
          </p>
        </div>
        <div className={css({ padding: "20px 20px" })}>
          <h2 className={css({ fontSize: "22px", textAlign: "center" })}>
            My Development History
          </h2>
          <p>
            - Start Play video games at 18 yo<br />
            - Start Development at 19 yo<br />
            - Start Web Development at 20 yo<br />
            - Start Development on GitHub at 20 yo<br />
            - Publish my Website at 21 yo<br />
          </p>
        </div>
      </div>
    </Layout>
  );
}
