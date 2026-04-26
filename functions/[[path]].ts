import { htmlToMarkdown, markdownTokenCount, shouldServeMarkdown } from "../src/utils/markdownNegotiation";

export async function onRequest(context: any) {
  const acceptHeader = context.request.headers.get("accept");

  if (!shouldServeMarkdown(acceptHeader)) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const markdown = htmlToMarkdown(await response.text());
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/markdown; charset=utf-8");

  const vary = headers.get("vary");
  headers.set("vary", vary ? `${vary}, Accept` : "Accept");
  headers.set("x-markdown-tokens", String(markdownTokenCount(markdown)));
  headers.delete("content-length");

  return new Response(markdown, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}