import { parse } from "node-html-parser";

// microCMS 本文(HTML)からタグを取り除き、カード表示用の短い抜粋を作る。
export function excerptFromHtml(html: string, maxLen = 90): string {
  if (!html) return "";
  const text = parse(html).textContent.replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trimEnd()}…`;
}
