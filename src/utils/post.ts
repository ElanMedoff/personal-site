import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { z } from "zod";
import { isProd, isVisualRegressionTest } from "./env";

export const collectionSchema = z.object({
  name: z.string(),
  order: z.number(),
});

export type Collection = z.infer<typeof collectionSchema>;

export const metadataSchema = z.object({
  title: z.string(),
  abstract: z.string(),
  lastUpdated: z.string(),
  slug: z.string(),
  tags: z.array(z.string()),
  collection: z.union([collectionSchema, z.null()]),
  isPublished: z.boolean(),
});

export type Metadata = z.infer<typeof metadataSchema>;

export interface Post {
  content: string;
  metadata: Metadata;
}

export const postsDirectory = join(process.cwd(), "src/posts");

export function fetchAllPaths() {
  return readdirSync(postsDirectory);
}

export async function fetchPostBySlug(
  slugToFetch: string,
): Promise<{ post: Post; relatedPostMetadata: Metadata }> {
  const path = `${slugToFetch}.mdx`;
  const rawPost = readFileSync(join(postsDirectory, path)).toString();
  const parsedPost = await serialize(rawPost, {
    parseFrontmatter: true,
  });
  const metadata = metadataSchema.parse(parsedPost.frontmatter);

  const allMetadata = fetchAllMetadata();
  const relatedPaths = allMetadata
    .filter((metadata) => {
      if (metadata.slug === slugToFetch) return false;
      return metadata.tags.filter((tag) => metadata.tags.includes(tag)).length > 0;
    })
    .map((metadata) => `${metadata.slug}.mdx`);

  let relatedPath: string;
  if (metadata.collection) {
    const nonNullCollection = metadata.collection;
    const foundCollection = allMetadata.filter(({ collection }) => {
      return collection?.name === nonNullCollection.name;
    });
    if (!foundCollection) {
      throw new Error("collection not found");
    }

    const relatedCollection = allMetadata.find(({ collection }) => {
      return (
        collection?.name === nonNullCollection.name &&
        // if last article in a collection, link to first
        collection?.order === (nonNullCollection.order + 1) % foundCollection.length
      );
    });

    if (!relatedCollection) {
      throw new Error("related collection not found");
    }
    relatedPath = relatedCollection.slug + ".mdx";
  } else {
    relatedPath = relatedPaths[Math.floor(Math.random() * relatedPaths.length)];
  }

  const rawRelatedPost = readFileSync(join(postsDirectory, relatedPath));
  const parsedRelatedPost = matter(rawRelatedPost);
  const relatedPostMetadata = metadataSchema.parse(parsedRelatedPost.data);

  return {
    post: {
      content: parsedPost.compiledSource,
      metadata,
    },
    relatedPostMetadata,
  };
}

export function fetchAllMetadata(): Metadata[] {
  const paths = fetchAllPaths();
  return paths
    .map((path) => {
      const rawPost = readFileSync(join(postsDirectory, path));
      const parsedPost = matter(rawPost);
      return metadataSchema.parse(parsedPost.data);
    })
    .filter((post) => (isProd() || isVisualRegressionTest() ? post.isPublished : true));
}

export function fetchSlugs() {
  const paths = fetchAllPaths();

  const allMetadata = paths.map((path) => {
    const rawPost = readFileSync(join(postsDirectory, path)).toString();
    const parsedPost = matter(rawPost);
    return metadataSchema.parse(parsedPost.data);
  });

  return allMetadata
    .filter((post) => (isProd() || isVisualRegressionTest() ? post.isPublished : true))
    .map((metadata) => metadata.slug);
}

export function isSlugValid(slug: string) {
  return fetchSlugs().includes(slug);
}
