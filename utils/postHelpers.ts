import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export interface Metadata {
  title: string;
  abstract: string;
  lastUpdated: string;
  imagePath: string;
  slug: string;
  tags: string[];
  collection: {
    name: string;
    order: number;
  } | null;
}

export interface Post {
  content: string;
  metadata: Metadata;
}

const postsDirectory = join(process.cwd(), "_posts");

function fetchAllPaths() {
  const paths = readdirSync(postsDirectory);
  return paths.filter((path) => path !== ".DS_Store");
}

export function fetchPostSlugs() {
  const paths = fetchAllPaths();
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

  const allMetadata = fetchAllMetadata();
  const relatedPaths = allMetadata
    .filter((metadata) => {
      if (metadata.slug === slugToFetch) return false;
      return metadata.tags.filter((tag) => data.tags.includes(tag)).length > 0;
    })
    .map((metadata) => `${metadata.slug}.md`);
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

export function fetchAllMetadata(): Metadata[] {
  const paths = fetchAllPaths();
  return paths.map((path) => {
    const rawPost = readFileSync(join(postsDirectory, path));
    const { data: metadata } = matter(rawPost);
    return metadata as Metadata;
  });
}
