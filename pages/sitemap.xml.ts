import { ServerResponse } from "http";
import { fetchslugs } from "utils/postHelpers";

function generateSiteMap(slugs: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
}

function SiteMap() {}

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  const slugs = await fetchslugs();

  const sitemap = generateSiteMap(slugs);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
