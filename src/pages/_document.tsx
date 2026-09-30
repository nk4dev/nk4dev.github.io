import { Html, Head, Main, NextScript } from "next/document";

// 本文は日本語なので lang="ja" を固定で出す(UI の EN 切り替えはクライアント側で
// <html lang> を書き換える。src/libs/lang.tsx 参照)
export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
