// アイキャッチのない記事のサムネイル。アバター画像を並べると一覧で見分けがつかないので、
// OGP と同じタイトル入り画像を使う。
export function titleThumbnail(title: string) {
  return `https://ogp-img-gen.vercel.app/api/img-gen?text=${encodeURIComponent(title)}`;
}
