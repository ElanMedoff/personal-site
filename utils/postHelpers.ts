import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export interface Metadata {
  title: string;
  abstract: string;
  publishedOn: string;
  imagePath: string;
}

export interface Post {
  content: string;
  metadata: Metadata;
}

const postsDirectory = join(process.cwd(), "_posts");

export function fetchPostSlugs() {
  const paths = readdirSync(postsDirectory);
  return paths.map((path) => ({
    params: {
      slug: path.replace(".md", ""),
    },
  }));
}

export async function fetchPostBySlug(
  slugToFetch: string
): Promise<{ post: Post; relatedPostMetadata: Metadata }> {
  const path = `${slugToFetch}.md`;
  const rawPost = readFileSync(join(postsDirectory, path));
  const { content, data } = matter(rawPost);

  const paths = readdirSync(postsDirectory);
  const relatedPaths = paths.filter(
    (path) => path !== `${slugToFetch}.md` && path !== ".DS_Store"
  );
  const relatedPath =
    relatedPaths[Math.floor(Math.random() * relatedPaths.length)];
  const rawRelatedPost = readFileSync(join(postsDirectory, relatedPath));
  const { data: relatedData } = matter(rawRelatedPost);

  return {
    post: {
      content,
      metadata: {
        ...(data as Metadata),
      },
    },
    relatedPostMetadata: { ...(relatedData as Metadata) },
  };
}
