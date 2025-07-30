import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";
export default function Index({ data }) {
  return (
    <Layout>
      <HMeta pageTitle="LLM Assets" />
      <div className={css({ paddingY: "5vh" })}>
        <div>
          <h1 className={css({ fontSize: "25px", textAlign: "center" })}>
            LLM Assets from my WebSite
          </h1>
          <p className={css({ padding: "20px" })}>
            This page is a collection of LLM assets that I have created and
            shared on my website. You can find various resources, including
            models, datasets, and tools that can help you in your LLM projects.
          </p>
        </div>
        <div className={css({ padding: "20px 20px" })}>
          <h2 className={css({ fontSize: "22px", textAlign: "center" })}>
            Available Assets
          </h2>
          <h3 className={css({ fontSize: "20px" })}>llms.txt</h3>
          <p>
            path :{" "}
            <span
              className={css({
                bgColor: "#a0a0a065",
                paddingX: "2px",
                borderRadius: "3px",
              })}
            >
              /llms.txt
            </span>
          </p>

          <h3 className={css({ fontSize: "20px" })}>markdown file</h3>
          <p>
            path :{" "}
            <span
              className={css({
                bgColor: "#a0a0a065",
                paddingX: "2px",
                borderRadius: "3px",
              })}
            >
              /llmassets/{"<MARKDOWN_FILE>.md"}
            </span>
          </p>
        </div>
        <div className={css({ padding: "20px 20px" })}>
          <h2 className={css({ fontSize: "22px", textAlign: "center" })}>
            Use Case
          </h2>
          <p>
            - Notebook lm <br />
            - Gemini <br />
            - ChatGPT <br />
            and more... <br />
          </p>
        </div>
        <div className={css({ padding: "20px 20px" })}>
          <h2 className={css({ fontSize: "22px", textAlign: "center" })}>
            caution
          </h2>
          <p>
            If you use this material externally, please include the credit
            (c)nknighta.
          </p>
        </div>
      </div>
    </Layout>
  );
}
