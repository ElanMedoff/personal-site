import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export interface Collection {
  name: string;
  order: number;
}

export interface Metadata {
  title: string;
  abstract: string;
  lastUpdated: string;
  imagePath: string;
  slug: string;
  tags: string[];
  collection: Collection | null;
  isPublished: boolean;
}

export interface Post {
  content: string;
  metadata: Metadata;
}

const postsDirectory = join(process.cwd(), "posts");

function fetchAllPaths() {
  const paths = readdirSync(postsDirectory);
  return paths.filter((path) => path !== ".DS_Store");
}

export async function fetchPostSlugs() {
  const paths = fetchAllPaths();

  const allMetadata = await Promise.all(
    paths.map(async (path) => {
      const rawPost = readFileSync(join(postsDirectory, path)).toString();
      const { data } = matter(rawPost);

      return data as any as Metadata;
    })
  );

  return allMetadata
    .filter((metadata) => metadata.isPublished)
    .map((metadata) => ({
      params: {
        slug: metadata.slug,
      },
    }));
}

export async function fetchPostBySlug(
  slugToFetch: string
): Promise<{ post: Post; relatedPostMetadata: Metadata }> {
  const path = `${slugToFetch}.mdx`;
  const rawPost = readFileSync(join(postsDirectory, path)).toString();
  const { compiledSource: content, frontmatter: data } = await serialize(
    rawPost,
    { parseFrontmatter: true }
  );

  const allMetadata = fetchAllMetadata();
  const relatedPaths = allMetadata
    .filter((metadata) => {
      if (metadata.slug === slugToFetch) return false;
      return metadata.tags.filter((tag) => data?.tags.includes(tag)).length > 0;
    })
    .map((metadata) => `${metadata.slug}.mdx`);
  const relatedPath =
    relatedPaths[Math.floor(Math.random() * relatedPaths.length)];
  const rawRelatedPost = readFileSync(join(postsDirectory, relatedPath));
  const { data: relatedData } = matter(rawRelatedPost);

  return {
    post: {
      content,
      metadata: {
        // bleh
        ...(data as any as Metadata),
      },
    },
    relatedPostMetadata: { ...(relatedData as Metadata) },
  };
}

export function fetchAllMetadata(): Metadata[] {
  const paths = fetchAllPaths();
  return paths
    .map((path) => {
      const rawPost = readFileSync(join(postsDirectory, path));
      const { data: metadata } = matter(rawPost);
      return metadata as Metadata;
    })
    .filter((post) => post.isPublished);
}
