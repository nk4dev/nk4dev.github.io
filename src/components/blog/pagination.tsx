import Link from "next/link";
import { css } from "../../../styled-system/css";
import { useLang } from "../../libs/lang";

const text = {
  ja: { prev: "← 前へ", next: "次へ →" },
  en: { prev: "← Prev", next: "Next →" },
};

function pageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

const pillBase = {
  fontFamily: "portfolioSans",
  fontSize: "13px",
  padding: "8px 16px",
  borderRadius: "999px",
  border: "1px solid {colors.portfolioPillBorder}",
} as const;

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { lang } = useLang();
  const t = text[lang];

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Blog pagination"
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "8px",
        paddingBottom: "80px",
      })}
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className={css({ ...pillBase, background: "portfolioPillBg", color: "portfolioAccentHover" })}
        >
          {t.prev}
        </Link>
      ) : (
        <span className={css({ ...pillBase, background: "transparent", color: "portfolioMutedDark", opacity: 0.5 })}>
          {t.prev}
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={css({
            ...pillBase,
            minWidth: "36px",
            textAlign: "center",
            background: page === currentPage ? "portfolioAccent" : "portfolioPillBg",
            color: page === currentPage ? "portfolioBg" : "portfolioAccentHover",
            fontWeight: page === currentPage ? "700" : "400",
          })}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className={css({ ...pillBase, background: "portfolioPillBg", color: "portfolioAccentHover" })}
        >
          {t.next}
        </Link>
      ) : (
        <span className={css({ ...pillBase, background: "transparent", color: "portfolioMutedDark", opacity: 0.5 })}>
          {t.next}
        </span>
      )}
    </nav>
  );
}
