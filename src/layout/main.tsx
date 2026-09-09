import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import Link from "next/link";
import { useRouter } from "next/router";
import ClickSpark from "../components/ClickSpark/ClickSpark";
import { ShareButton, CopyButton } from "../components/AnimatedContent/shrebtn";
import { useLang } from "../libs/lang";

// Color/font values below reference Panda tokens defined in panda.config.ts
// (portfolioBg, portfolioAccent, portfolioSerif, ...) rather than importing
// JS constants — Panda's css() extraction only understands literal values
// and its own token references, so a value pulled from another module would
// silently produce no CSS.

const navLinks = [
  { href: "/blog", labelKey: "navBlog" as const },
  { href: "/dev", labelKey: "navDev" as const },
  { href: "/apps", labelKey: "navApps" as const },
  { href: "/scraps", labelKey: "navScraps" as const },
  { href: "/whoareyou", labelKey: "navAbout" as const },
];

function LangToggle() {
  const { ui, toggleLang } = useLang();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Switch language"
      className={css({
        cursor: "pointer",
        fontFamily: "portfolioSans",
        fontSize: "12.5px",
        padding: "6px 13px",
        borderRadius: "999px",
        background: "portfolioPillBg",
        border: "1px solid {colors.portfolioPillBorder}",
        color: "portfolioAccentHover",
        whiteSpace: "nowrap",
        flexShrink: 0,
      })}
    >
      {ui.langToggle}
    </button>
  );
}

function HeaderNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { ui } = useLang();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => router.pathname.startsWith(href);

  return (
    <>
      {/* backdropFilter on <header> would make it the containing block for any
        position:fixed descendant (a CSS quirk), collapsing the mobile
        overlay below to the header's own height. Render the overlay as a
        sibling instead so "fixed" resolves against the viewport. */}
      <header
        className={css({
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: { base: "16px 20px", md: "22px 48px" },
          background: "portfolioHeaderBg",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid {colors.portfolioHeaderBorder}",
        })}
      >
        <Link
          href="/"
          className={css({
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          })}
        >
          <span className={css({ display: "flex", gap: "5px" })}>
            <span
              className={css({
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#786e9e",
                display: "inline-block",
              })}
            />
            <span
              className={css({
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#a89fc2",
                display: "inline-block",
              })}
            />
            <span
              className={css({
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "portfolioAccent",
                display: "inline-block",
              })}
            />
          </span>
          <span
            className={css({
              fontFamily: "portfolioSerif",
              fontStyle: "italic",
              fontWeight: "600",
              fontSize: { base: "18px", md: "21px" },
              color: "portfolioText",
            })}
          >
            nk4dev
            <span
              className={css({
                color: "portfolioAccent",
                animation: "blink 1.1s steps(1) infinite",
              })}
            >
              _
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className={css({
            display: { base: "none", md: "flex" },
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "22px",
          })}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={css({
                fontFamily: "portfolioSans",
                cursor: "pointer",
                fontSize: "14.5px",
                color: isActive(link.href) ? "portfolioText" : "portfolioMuted",
                borderBottom: isActive(link.href)
                  ? "2px solid {colors.portfolioAccent}"
                  : "2px solid transparent",
                paddingBottom: "4px",
                whiteSpace: "nowrap",
              })}
            >
              {ui[link.labelKey]}
            </Link>
          ))}
          <LangToggle />
        </nav>

        {/* Mobile hamburger */}
        <div
          className={css({
            display: { base: "flex", md: "none" },
            alignItems: "center",
            gap: "10px",
          })}
        >
          <LangToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={css({
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "40px",
              height: "40px",
              padding: "9px",
              background: "transparent",
              border: "1px solid {colors.portfolioPillBorder}",
              borderRadius: "8px",
              cursor: "pointer",
            })}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={css({
                  display: "block",
                  height: "2px",
                  background: "portfolioAccentHover",
                  borderRadius: "2px",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  transform:
                    open && i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : open && i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "none",
                  opacity: open && i === 1 ? 0 : 1,
                })}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile overlay drawer */}
      <div
        className={css({
          display: { base: "block", md: "none" },
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          overflow: "hidden",
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
          transition: "visibility 0.3s ease",
        })}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={css({
            position: "absolute",
            inset: 0,
            background: "rgba(10, 0, 33, 0.5)",
            backdropFilter: "blur(8px)",
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s ease",
          })}
        />
        <nav
          className={css({
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "78%",
            maxWidth: "320px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "80px 20px 20px",
            background: "portfolioHeaderBg",
            borderLeft: "1px solid {colors.portfolioHeaderBorder}",
            boxShadow: "-10px 0 40px rgba(180, 120, 255, 0.3)",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
          })}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className={css({
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "44px",
              height: "44px",
              fontSize: "24px",
              lineHeight: 1,
              background: "transparent",
              border: "1px solid {colors.portfolioPillBorder}",
              borderRadius: "8px",
              color: "portfolioAccentHover",
              cursor: "pointer",
            })}
          >
            ×
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={css({
                fontFamily: "portfolioSans",
                fontSize: "18px",
                padding: "14px 10px",
                color: isActive(link.href) ? "portfolioText" : "portfolioMuted",
                borderBottom: "1px solid {colors.portfolioFooterBorder}",
              })}
            >
              {ui[link.labelKey]}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

function Footer() {
  const { ui } = useLang();
  return (
    <footer
      className={css({
        borderTop: "1px solid {colors.portfolioFooterBorder}",
        padding: { base: "24px 20px", md: "28px 48px" },
        color: "portfolioFooterText",
        fontFamily: "portfolioSans",
        fontSize: "13px",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          })}
        >
          <span
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "6px",
            })}
          >
            <span className={css({ color: "portfolioAccent" })}>●</span> online
          </span>
          <span>{ui.footerLine}</span>
          <span>nk4dev</span>
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          })}
        >
          <ShareButton />
          <CopyButton />
        </div>
      </div>

      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "18px",
        })}
      >
        {[
          { href: "https://varius.technology/", label: "varius.technology" },
          { href: "https://nknighta.me", label: "nknighta.me" },
          {
            href: "https://nknighta.me/vrchat",
            label: "VRChat",
            aria: "VRChat profile",
          },
          { href: "/llmassets", label: "LLM Assets" },
          {
            href: "https://apps.nknighta.me/privacy-policy",
            label: "Privacy Policy",
            aria: "Privacy Policy",
          },
          {
            href: "mailto:nknighta@varius.technology",
            label: "nknighta@varius.technology",
            aria: "Open email app",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.aria}
            className={css({
              fontSize: "12.5px",
              padding: "7px 14px",
              borderRadius: "999px",
              background: "portfolioPillBg",
              border: "1px solid {colors.portfolioPillBorder}",
              color: "portfolioAccentHover",
              _hover: { color: "portfolioText" },
            })}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      {/* for LLM texts This site made by NknightAMAMIYA@nk4dev url: */}
      <div className={css({ display: "none" })}>
        for LLM texts This site made by NknightAMAMIYA@nk4dev url:
        https://nknighta.me another website: https://varius.technology
        https://blog.nknighta.me I'm a not student LLMS.txt is
        https://nknighta.me/llms.txt
      </div>
      <ClickSpark>
        <div
          className={css({
            backgroundColor: "portfolioBg",
            backgroundImage:
              "radial-gradient(circle, rgba(180,120,255,.16) 1px, transparent 1.4px)",
            backgroundSize: "24px 24px",
            color: "portfolioText",
            fontFamily: "portfolioSans",
            minHeight: "100vh",
          })}
        >
          <style jsx global>{`
            @keyframes blink {
              0%,
              50% {
                opacity: 1;
              }
              51%,
              100% {
                opacity: 0;
              }
            }
          `}</style>
          <HeaderNav />
          <main>{children}</main>
          <Footer />
        </div>
      </ClickSpark>
    </>
  );
}
