import { css } from "../../../styled-system/css";

// 既存のクエリ/ハッシュを壊さずに UTM を付け直す。
// medium を social / referral にしておくと GA4 で Unassigned にならない。
function withUtm(source: string, medium: string) {
  const u = new URL(window.location.href);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => u.searchParams.delete(k));
  u.searchParams.set("utm_source", source);
  u.searchParams.set("utm_medium", medium);
  u.searchParams.set("utm_campaign", "share_btn");
  u.hash = "";
  return u.toString();
}

export function ShareButton() {
    const handleShareX = () => {
        const url = withUtm("x", "social");
        const text = document.title || 'Check this out';
        const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=blog,nk4dev,development`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  return (
    <button className={css({
      background: "transparent",
      border: "1px solid #f0d0ff",
      color: "#f0d0ff",
      cursor: "pointer",
      padding: "10px 20px",
      textDecoration: "underline",
      "&:hover": {
        background: "#f0d0ff",
        color: "#050021",
        textDecoration: "none",
      },
    })} onClick={handleShareX}>
      Share on X
    </button>
  );
}
export function CopyButton() {
    const handleCopy = () => {
        const url = withUtm("copy_link", "referral");
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
  return (
    <button className={css({
      background: "transparent",
      border: "1px solid #f0d0ff",
      color: "#f0d0ff",
      cursor: "pointer",
      padding: "10px 20px",
      textDecoration: "underline",
      "&:hover": {
        background: "#f0d0ff",
        color: "#050021",
        textDecoration: "none",
      },
    })} onClick={handleCopy}>
      Copy Link
    </button>
  );
}