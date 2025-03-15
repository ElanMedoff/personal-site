import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "src/posts");
const file = join(process.cwd(), "public/rss.xml");

function generateRssFeed() {
  const paths = readdirSync(postsDirectory);
  const urlBase = "http://159.203.77.112/";

  const today = new Date().toUTCString();
  const mostRecentUpdate = paths
    .map((path) => {
      const rawPost = readFileSync(join(postsDirectory, path));
      const { data: metadata } = matter(rawPost);
      return new Date(metadata.lastUpdated);
    })
    .sort((a, b) => b.getTime() - a.getTime())[0]
    .toUTCString();

  const rssFeed = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
    <title>elanmed.dev</title>
    <link>${urlBase}</link>
    <description>An rss feed for Elan Medoff's blog</description>
    <atom:link href="${urlBase}rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <pubDate>${today}</pubDate>
    <lastBuildDate>${mostRecentUpdate}</lastBuildDate>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <managingEditor>info@elanmed.dev (Elan Medoff)</managingEditor>
    ${paths
      .map((path) => {
        const rawPost = readFileSync(join(postsDirectory, path));
        const { data: metadata } = matter(rawPost);
        const { slug, title, abstract, lastUpdated, isPublished } = metadata;
        if (!isPublished) return "";
        return `
    <item>
    <title>${title}</title>
    <link>${urlBase}${slug}</link>
    <description>${abstract}</description>
    <pubDate>${new Date(lastUpdated).toUTCString()}</pubDate>
    <guid>${urlBase}${slug}</guid>
    </item>`;
      })
      .join("")}
    </channel>
    </rss>
    `.trim();
  writeFileSync(file, rssFeed);
}

generateRssFeed();
