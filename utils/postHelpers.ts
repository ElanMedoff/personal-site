import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { isProd } from "./envHelpers";

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

export async function fetchPostBySlug(
  slugToFetch: string
): Promise<{ post: Post; relatedPostMetadata: Metadata }> {
  const path = `${slugToFetch}.mdx`;
  const rawPost = readFileSync(join(postsDirectory, path)).toString();
  const { compiledSource: content, frontmatter: data } = await serialize(
    rawPost,
    {
      parseFrontmatter: true,
    }
  );

  const allMetadata = fetchAllMetadata();
  const relatedPaths = allMetadata
    .filter((metadata) => {
      if (metadata.slug === slugToFetch) return false;
      return metadata.tags.filter((tag) => data?.tags.includes(tag)).length > 0;
    })
    .map((metadata) => `${metadata.slug}.mdx`);

  const castMetadata = data as any as Metadata;

  let relatedPath: string;
  if (castMetadata.collection) {
    const nonNullCollection = castMetadata.collection;
    const collectionLength = allMetadata.filter(({ collection }) => {
      return collection?.name === nonNullCollection.name;
    })!.length;

    relatedPath =
      allMetadata.find(({ collection }) => {
        return (
          collection?.name === nonNullCollection.name &&
          // if last article in a collection, link to first
          collection?.order === (nonNullCollection.order + 1) % collectionLength
        );
      })!.slug + ".mdx";
  } else {
    relatedPath = relatedPaths[Math.floor(Math.random() * relatedPaths.length)];
  }

  const rawRelatedPost = readFileSync(join(postsDirectory, relatedPath));
  const { data: relatedData } = matter(rawRelatedPost);

  return {
    post: {
      content,
      metadata: castMetadata,
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

function fetchslugs() {
  const paths = fetchAllPaths();

  const allMetadata = paths.map((path) => {
    const rawPost = readFileSync(join(postsDirectory, path)).toString();
    const { data } = matter(rawPost);

    return data as any as Metadata;
  });

  return allMetadata
    .filter((post) => post.isPublished)
    .map((metadata) => metadata.slug);
}

export function isSlugValid(slug: string) {
  return fetchslugs().includes(slug);
}
