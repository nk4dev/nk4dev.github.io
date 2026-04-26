const BLOCK_TAGS = ["p", "div", "section", "article", "blockquote"];

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function collapseBlankLines(input: string): string {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function shouldServeMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) {
    return false;
  }

  return acceptHeader
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .some((token) => token.startsWith("text/markdown") && !token.includes("q=0"));
}

export function markdownTokenCount(markdown: string): number {
  return Math.ceil(markdown.length / 4);
}

export function htmlToMarkdown(html: string): string {
  let markdown = html;

  markdown = markdown.replace(/<script[\s\S]*?<\/script>/gi, "");
  markdown = markdown.replace(/<style[\s\S]*?<\/style>/gi, "");

  markdown = markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
    const body = decodeHtmlEntities(String(code).replace(/<[^>]+>/g, "").trim());
    return `\n\n\`\`\`\n${body}\n\`\`\`\n\n`;
  });

  markdown = markdown.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, text) => {
    const heading = decodeHtmlEntities(String(text).replace(/<[^>]+>/g, "").trim());
    return `\n\n${"#".repeat(Number(level))} ${heading}\n\n`;
  });

  markdown = markdown.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const label = decodeHtmlEntities(String(text).replace(/<[^>]+>/g, "").trim()) || String(href);
    return `[${label}](${href})`;
  });

  markdown = markdown.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>/gi, (_, alt, src) => {
    return `![${decodeHtmlEntities(String(alt))}](${src})`;
  });

  markdown = markdown.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (_, src) => {
    return `![](${src})`;
  });

  markdown = markdown.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, code) => {
    const body = decodeHtmlEntities(String(code).replace(/<[^>]+>/g, "").trim());
    return `\`${body}\``;
  });

  markdown = markdown.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => {
    const item = decodeHtmlEntities(String(text).replace(/<[^>]+>/g, "").trim());
    return `\n- ${item}`;
  });

  markdown = markdown.replace(/<br\s*\/?>/gi, "\n");

  for (const tag of BLOCK_TAGS) {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
    markdown = markdown.replace(re, (_, text) => {
      const body = decodeHtmlEntities(String(text).replace(/<[^>]+>/g, "").trim());
      return body ? `\n\n${body}\n\n` : "\n";
    });
  }

  markdown = markdown
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");

  markdown = decodeHtmlEntities(markdown.replace(/<[^>]+>/g, ""));
  return collapseBlankLines(markdown);
}
