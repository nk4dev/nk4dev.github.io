import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// UI-only ja/en toggle. This only swaps hardcoded UI copy (nav, chrome, hero
// text) — microCMS blog/project content is not translated and stays Japanese.
export type Lang = "ja" | "en";

const STORAGE_KEY = "nk4dev-ui-lang";

export type UiText = {
  navHome: string;
  navBlog: string;
  navDev: string;
  navApps: string;
  navScraps: string;
  navAbout: string;
  langToggle: string;
  shareOnX: string;
  copyLink: string;
  footerLine: string;
  viewAll: string;
  backToBlog: string;
};

const dict: Record<Lang, UiText> = {
  ja: {
    navHome: "ホーム",
    navBlog: "ブログ",
    navDev: "Dev Projects",
    navApps: "Apps",
    navScraps: "Scraps",
    navAbout: "プロフィール",
    langToggle: "EN",
    shareOnX: "Xでシェア",
    copyLink: "リンクをコピー",
    footerLine: "© 2026 Nknight AMAMIYA",
    viewAll: "すべて見る →",
    backToBlog: "← ブログへ戻る",
  },
  en: {
    navHome: "Home",
    navBlog: "Blog",
    navDev: "Dev Projects",
    navApps: "Apps",
    navScraps: "Scraps",
    navAbout: "About",
    langToggle: "JA",
    shareOnX: "Share on X",
    copyLink: "Copy link",
    footerLine: "© 2026 Nknight AMAMIYA",
    viewAll: "View all →",
    backToBlog: "← Back to blog",
  },
};

type LangContextValue = {
  lang: Lang;
  toggleLang: () => void;
  ui: UiText;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ja");

  // Restore the visitor's last choice. Runs client-side only so the
  // server-rendered markup always starts in Japanese (avoids hydration
  // mismatches).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ja" || stored === "en") setLang(stored);
    } catch {
      // localStorage unavailable (private mode, etc.) — ignore.
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === "ja" ? "en" : "ja";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const value = useMemo(() => ({ lang, toggleLang, ui: dict[lang] }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}
