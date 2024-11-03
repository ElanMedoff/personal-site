const { readdirSync, readFileSync, writeFileSync } = require("fs");
const matter = require("gray-matter");
const { join } = require("path");

const postsDirectory = join(process.cwd(), "posts");

const file = join(process.cwd(), "public/sitemap.xml");

function fetchAllPaths() {
  const paths = readdirSync(postsDirectory);
  return paths.filter((path) => path !== ".DS_Store");
}

async function fetchAllMetadata() {
  const paths = fetchAllPaths();
  return paths
    .map((path) => {
      const rawPost = readFileSync(join(postsDirectory, path));
      const { data: metadata } = matter(rawPost);
      return metadata;
    })
    .filter(({ isPublished }) => isPublished);
}

async function generateSiteMap() {
  const slugs = (await fetchAllMetadata()).map(({ slug }) => slug);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://elanmed.dev/</loc></url>
<url><loc>https://elanmed.dev/resume</loc></url>
<url><loc>https://elanmed.dev/blog</loc></url>
${slugs
  .map((slug) => {
    return `<url><loc>${`https://elanmed.dev/blog/${slug}`}</loc></url>\n`;
  })
  .join("")}</urlset>`.trim();
  writeFileSync(file, sitemap);
}
generateSiteMap();
