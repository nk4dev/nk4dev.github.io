import { css } from "../../styled-system/css";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "../libs/lang";
import { techStack, history, contacts } from "../data/profile";

const aboutText = {
  ja: {
    kicker: "// Profile",
    body: "個人ブログ兼プレイグラウンドの管理人です。ゲームがきっかけでプログラミングを始めて、今はWebを中心にいろいろ作っています。最近はVRChatにも足を踏み入れました。",
    techStackTitle: "使っている技術",
    historyTitle: "これまで",
    connectTitle: "Connect",
  },
  en: {
    kicker: "// Profile",
    body: "I run this personal blog and playground. Games got me into programming, and these days I mostly build things for the web. Lately I've also been getting into VRChat.",
    techStackTitle: "Tech stack",
    historyTitle: "Journey",
    connectTitle: "Connect",
  },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={css({
        margin: "0 0 18px",
        fontFamily: "portfolioSerif",
        fontWeight: "500",
        fontSize: "22px",
      })}
    >
      <span className={css({ color: "portfolioAccent", marginRight: "9px" })}>
        ›
      </span>
      {children}
    </h2>
  );
}

export default function WhoAreYou() {
  const router = useRouter();
  const availablequery = router.query.im ? true : false;
  const { lang } = useLang();
  const t = aboutText[lang];

  return (
    <Layout>
      <HMeta
        pageTitle="Who are you?"
        pageDescription="about Nknight AMAMIYA"
        pagePath="/whoareyou"
      />

      {availablequery && (
        <div
          className={css({
            padding: "16px 20px",
            textAlign: "center",
            fontFamily: "portfolioSans",
            fontSize: "13.5px",
            color: "portfolioAccentHover",
            background: "portfolioPillBg",
            borderBottom: "1px solid {colors.portfolioPillBorder}",
          })}
        >
          thanks for visit{" "}
          <Link
            href="https://mastodon.social/@nknighta"
            className={css({
              textDecoration: "underline",
              color: "portfolioText",
            })}
          >
            my social network profile
          </Link>
        </div>
      )}

      <div
        className={css({
          maxWidth: "920px",
          margin: "0 auto",
          padding: { base: "0 20px 80px", md: "0 32px 100px" },
        })}
      >
        <section
          className={css({
            padding: { base: "40px 0 8px", md: "64px 0 8px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          })}
        >
          <Image
            src="https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?w=190&h=190&q=50&fm=webp"
            width={110}
            height={110}
            alt="profile"
            className={css({ borderRadius: "50%", background: "#c1d0ff" })}
          />
          <div
            className={css({
              fontFamily: "portfolioSerif",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "portfolioMutedDark",
            })}
          >
            {t.kicker}
          </div>
          <h1
            className={css({
              margin: 0,
              fontFamily: "portfolioSerif",
              fontWeight: "500",
              fontSize: { base: "26px", md: "32px" },
              cursor: "pointer",
            })}
            onClick={() => alert("You clicked my name! lol")}
          >
            Nknight AMAMIYA{" "}
            <span
              className={css({
                color: "portfolioMutedDark",
                fontSize: { base: "14px", md: "18px" },
                fontWeight: "400",
              })}
            >
              (@nk4dev)
            </span>
          </h1>
          <p
            className={css({
              margin: 0,
              maxWidth: "600px",
              fontSize: "15.5px",
              lineHeight: 1.8,
              color: "portfolioBody",
            })}
          >
            {t.body}
          </p>
        </section>

        <section className={css({ padding: "40px 0 8px" })}>
          <SectionTitle>{t.techStackTitle}</SectionTitle>
          <div
            className={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className={css({
                  fontFamily: "portfolioSans",
                  fontSize: "12.5px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  background: "portfolioPillBg",
                  color: "portfolioAccentHover",
                  border: "1px solid {colors.portfolioPillBorder}",
                  whiteSpace: "nowrap",
                })}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className={css({ padding: "40px 0 8px" })}>
          <SectionTitle>{t.historyTitle}</SectionTitle>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            })}
          >
            {history.map((step, i) => (
              <div
                key={i}
                className={css({
                  display: "flex",
                  gap: "18px",
                  alignItems: "baseline",
                })}
              >
                <span
                  className={css({
                    fontFamily: "portfolioSerif",
                    fontStyle: "italic",
                    fontSize: "15px",
                    color: "portfolioAccent2",
                    minWidth: "52px",
                    whiteSpace: "nowrap",
                  })}
                >
                  {step.age[lang]}
                </span>
                <span
                  className={css({
                    fontSize: "14.5px",
                    color: "portfolioBodyAlt",
                  })}
                >
                  {step.text[lang]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={css({ padding: "40px 0 72px" })}>
          <SectionTitle>{t.connectTitle}</SectionTitle>
          <div
            className={css({ display: "flex", gap: "12px", flexWrap: "wrap" })}
          >
            {contacts.map((contact) => (
              <Link
                key={contact.label}
                href={contact.url}
                target={
                  contact.url.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  contact.url.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={css({
                  textDecoration: "none",
                  fontSize: "13.5px",
                  padding: "9px 16px",
                  borderRadius: "999px",
                  background: "portfolioPillBg",
                  border: "1px solid {colors.portfolioPillBorder}",
                  color: "portfolioText",
                })}
              >
                {contact.label}{" "}
                <span className={css({ color: "portfolioMutedDark" })}>
                  {contact.handle}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
