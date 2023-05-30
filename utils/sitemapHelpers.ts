import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const file = join(process.cwd(), "public/sitemap.xml");
const postsDirectory = join(process.cwd(), "posts");

async function generateSiteMap() {
  const paths = readdirSync(postsDirectory).filter(
    (path) => path !== ".DS_Store"
  );
  const slugs = paths.map((path) => path.substring(0, path.indexOf(".")));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://elanmed.dev/</loc>
     </url>
     <url>
       <loc>https://elanmed.dev/resume</loc>
     </url>
     <url>
       <loc>https://elanmed.dev/blog</loc>
     </url>
     ${slugs
       .map((slug) => {
         return `
       <url>
           <loc>${`https://elanmed.dev/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
  writeFileSync(file, sitemap);
}
generateSiteMap();
