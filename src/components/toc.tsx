import { useEffect, useRef, useState } from "react";
import type { TOCItemType } from "fumadocs-core/toc";
import { css } from "../../styled-system/css";

// 現在ビューポートで読んでいる見出しを推定する。
// fumadocs の AnchorProvider は IntersectionObserver 依存で、CMS 本文のように
// 見出し間の余白が大きいと追従が甘くなるため、スクロール位置ベースで自前計算する。
function useActiveHeading(toc: TOCItemType[]): string {
  const [activeId, setActiveId] = useState<string>(
    () => toc[0]?.url.replace(/^#/, "") ?? ""
  );

  useEffect(() => {
    if (toc.length === 0) return;
    const ids = toc.map((item) => item.url.replace(/^#/, ""));

    const compute = () => {
      // ビューポート上端から 120px の位置を「読んでいる行」とみなす
      const readingLine = 120;
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - readingLine <= 0) {
          current = id;
        } else {
          break;
        }
      }

      // ページ最下部まで来たら最後の見出しを強調する
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [toc]);

  return activeId;
}

const itemStyle = css({
  display: "block",
  fontSize: "13px",
  lineHeight: "1.5",
  paddingY: "5px",
  paddingRight: "10px",
  color: "#b98fd6",
  borderLeft: "2px solid rgba(240, 208, 255, 0.15)",
  transition: "color 0.15s ease, border-color 0.15s ease",
  _hover: {
    color: "#f0d0ff",
  },
  "&[data-active='true']": {
    color: "#f0d0ff",
    borderColor: "#aa00ff",
    fontWeight: "bold",
  },
});

export default function TableOfContents({
  toc,
  showTitle = true,
}: {
  toc: TOCItemType[];
  showTitle?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeId = useActiveHeading(toc);

  // 長い目次のとき、強調中の項目をコンテナ内に収める
  useEffect(() => {
    const active = containerRef.current?.querySelector<HTMLElement>(
      "a[data-active='true']"
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  if (!toc || toc.length === 0) return null;

  return (
    <nav aria-label="目次">
      {showTitle && (
        <p
          className={css({
            fontSize: "13px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#f0d0ff",
            marginBottom: "8px",
          })}
        >
          目次
        </p>
      )}
      <div
        ref={containerRef}
        className={css({
          display: "flex",
          flexDirection: "column",
          maxHeight: "70vh",
          overflowY: "auto",
        })}
      >
        {toc.map((item) => {
          const id = item.url.replace(/^#/, "");
          return (
            <a
              key={item.url}
              href={item.url}
              data-active={activeId === id}
              className={itemStyle}
              style={{
                paddingLeft: `${Math.max(0, item.depth - 2) * 12 + 10}px`,
              }}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
