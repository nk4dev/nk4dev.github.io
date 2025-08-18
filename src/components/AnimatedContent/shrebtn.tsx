import { css } from "../../../styled-system/css";

export default function ShareButton() {
    const handleShareX = () => {
        const url = window.location.href + "?utm_source=share_btn&utm_medium=x_post_link";
        const text = document.title || 'Check this out';
        const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
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