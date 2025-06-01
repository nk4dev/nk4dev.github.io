import Layout from "../../layout/main";
import { css } from "../../../styled-system/css";

export default function YTImageDL() {
  function extractVideoId(url: string): string {
    const THUMB_TYPES: string[] = [
      /** w1280 */
      "maxresdefault.jpg",
      /** w640 */
      "sddefault.jpg",
      /** w480 */
      "hqdefault.jpg",
      /** w320 */
      "mqdefault.jpg",
      /** w120 */
      "default.jpg",
    ];

    const patterns: RegExp[] = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match: RegExpMatchArray | null = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return "error";
  }
  return (
    <Layout>
      <h1
        className={css({
          textAlign: "center",
          fontSize: "2xl",
          marginY: "20px",
          color: "#fff",
        })}
      >
        YTImageDL
      </h1>
      <p
        className={css({
          textAlign: "center",
          fontSize: "lg",
          color: "#ccc",
          marginBottom: "20px",
        })}
      >
        this is preview version
      </p>
      <form
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#060067",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        })}
        onSubmit={async (e) => {
          e.preventDefault();
          const url = (e.target as HTMLFormElement).elements.namedItem(
            "url"
          ) as HTMLInputElement;
          const videoId = extractVideoId(url.value);
          if (videoId === "error") {
            alert("Invalid YouTube URL");
            return;
          }

          const THUMB_TYPES = [
            "maxresdefault.jpg",
            "sddefault.jpg",
            "hqdefault.jpg",
            "mqdefault.jpg",
            "default.jpg",
          ];

          const thumbnailContainer = document.getElementById("thumbnail");
          thumbnailContainer!.innerHTML = ""; // Clear previous thumbnails

          THUMB_TYPES.forEach((type) => {
            const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${type}`;
            const img = document.createElement("img");
            img.src = thumbnailUrl;
            img.alt = type;
            img.style.margin = "10px";
            img.style.maxWidth = "100%";
            img.style.border = "1px solid #ccc";
            img.style.borderRadius = "5px";
            thumbnailContainer!.appendChild(img);
          });
        }}
      >
        <input
          type="text"
          name="url"
          placeholder="Enter YouTube video URL"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Thumbnails
        </button>
      </form>
      <div style={{ padding: "20px" }}>
        <h2>Thumbnail Preview</h2>
        <div className={css({
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        })}>
          <div
            id="thumbnail"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "800px",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
