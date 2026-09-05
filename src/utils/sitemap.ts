export const SITE_URL = "https://nknighta.me";

export type Changefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: Changefreq;
  priority?: number;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(entries: SitemapEntry[]) {
  const urls = entries
    .map((entry) => {
      const fields = [`    <loc>${escapeXml(entry.loc)}</loc>`];
      if (entry.lastmod) fields.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      if (entry.changefreq) fields.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      if (entry.priority !== undefined) fields.push(`    <priority>${entry.priority}</priority>`);
      return `  <url>\n${fields.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
