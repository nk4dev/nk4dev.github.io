// Shared profile content used by the Home and About pages. Kept separate
// from CMS data (blogs/projects) since this is hand-authored bio copy, not
// microCMS content — translated for the UI-only ja/en toggle.

export const skills = ["JavaScript", "TypeScript", "C#", "Next.js", "React"];

export const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Panda CSS",
  "Cloudflare",
  "MicroCMS",
];

export const repos = [
  {
    name: "VX3",
    url: "https://github.com/nk4dev/vx3",
    desc: {
      ja: "Web3を触る開発者向けのツールキット。ウォレット接続やコントラクト操作をまとめて手軽に。",
      en: "A toolkit for developers working with Web3 — wallet connections and contract calls, made easy.",
    },
  },
  {
    name: "OSS-WEATHER",
    url: "https://nknighta.me/oss-map-weather/",
    desc: {
      ja: "地図の上に天気を重ねて見られる小さなOSSツール。",
      en: "A small OSS tool that overlays weather info on a map.",
    },
  },
  {
    name: "Grove Player",
    url: "https://github.com/nk4dev/grove-player",
    desc: {
      ja: "個人開発の動画/音楽プレイヤーアプリ。",
      en: "A personal video/music player app.",
    },
  },
  {
    name: "IndexLanguage",
    url: "https://github.com/nk4dev/IndexLanguage",
    desc: {
      ja: "趣味で作っている自作プログラミング言語。",
      en: "A programming language I'm building for fun.",
    },
  },
];

export const contacts = [
  { label: "X (Twitter)", handle: "@nk4dev", url: "/x" },
  { label: "GitHub", handle: "@nk4dev", url: "/g" },
  { label: "Instagram", handle: "@ama_p0627", url: "/i" },
  { label: "Qiita", handle: "@amamiya_dev", url: "/q" },
  { label: "VRChat", handle: "Nknight AMAMIYA", url: "/vrchat" },
  {
    label: "Email",
    handle: "nknighta@varius.technology",
    url: "mailto:nknighta@varius.technology",
  },
];

export const history = [
  {
    age: { ja: "18歳", en: "18" },
    text: {
      ja: "VMwareの仮想マシンをきっかけにプログラミングの世界へ",
      en: "Entering the world of programming through VMware virtual machines",
    },
  },
  {
    age: { ja: "20歳", en: "20" },
    text: {
      ja: "Web開発とGitHubでの開発を始める",
      en: "Started web development and coding on GitHub",
    },
  },
  {
    age: { ja: "21歳", en: "21" },
    text: { ja: "このサイトを公開", en: "Published this site" },
  },
  {
    age: { ja: "23歳", en: "23" },
    text: { ja: "VRChatをやりはじめる", en: "Start VRChat life" },
  },
];
