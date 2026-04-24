import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/cms";
import { htmlToMarkdown, markdownTokenCount } from "../../utils/markdownNegotiation";

type BlogRoute =
  | { type: "index" }
  | { type: "post"; id: string }
  | { type: "unsupported" };

function parseBlogRoute(pathValue: string | string[] | undefined): BlogRoute {
  if (!pathValue || Array.isArray(pathValue)) {
    return { type: "unsupported" };
  }

  const parts = pathValue.split("/").filter(Boolean);

  if (parts.length === 1 && parts[0] === "blog") {
    return { type: "index" };
  }

  if (parts.length === 2 && parts[0] === "blog") {
    return { type: "post", id: parts[1] };
  }

  return { type: "unsupported" };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method Not Allowed");
    return;
  }

  const originalPath = (req.headers["x-original-path"] as string) || req.query.path;
  const route = parseBlogRoute(originalPath);
  console.log("[markdown API] originalPath:", originalPath);
  console.log("[markdown API] parsed route:", route);
  
  if (route.type === "unsupported") {
    res.status(404).send("Not Found");
    return;
  }

  try {
    let markdown = "";

    if (route.type === "post") {
      const blog = await client.get({ endpoint: "blogs", contentId: route.id });
      markdown = htmlToMarkdown(blog.content ?? "");
    } else {
      const list = await client.get({ endpoint: "blogs", queries: { limit: 100 } });
      markdown = [
        "# Blog Index",
        "",
        ...list.contents.map((item: { title?: string; id: string }) => `- [${item.title ?? item.id}](/blog/${item.id})`),
      ].join("\n");
    }

    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.setHeader("Vary", "Accept");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("x-markdown-tokens", String(markdownTokenCount(markdown)));
    res.status(200).send(markdown);
  } catch (err) {
    console.error("[markdown API] Error:", err);
    res.status(404).send("Not Found");
  }
}