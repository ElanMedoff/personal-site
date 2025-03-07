import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "src/posts");

function validateSlugs() {
  const paths = readdirSync(postsDirectory);
  paths.forEach((path) => {
    const rawPost = readFileSync(join(postsDirectory, path));
    const { data: metadata } = matter(rawPost);
    const { slug } = metadata;

    const sanitizedPath = path.substring(0, path.indexOf("."));
    if (sanitizedPath !== slug) {
      throw new Error(`The slug: ${slug} in ${path} does not match the file path!`);
    }
  });
}

validateSlugs();
