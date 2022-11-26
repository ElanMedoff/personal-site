import { Collection, Metadata } from "utils/postHelpers";

export const orderPosts = (
  posts: Metadata[],
  method: "date" | "collection"
) => {
  return posts.sort((a, b) =>
    method === "date"
      ? new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      : (a.collection as Collection).order - (b.collection as Collection).order
  );
};

export const getPostsByCollection = (
  posts: Metadata[],
  allCollections: string[]
) => {
  return allCollections
    .map((collectionName) => {
      return orderPosts(
        posts.filter((post) => post.collection?.name === collectionName),
        "collection"
      );
    })
    .filter((collection) => collection.length > 0);
};

export const getPostsWoCollection = (posts: Metadata[]) => {
  return posts.filter(({ collection }) => collection === null);
};

export const getPostsWCollection = (posts: Metadata[]) => {
  return posts.filter((post) => post.collection !== null);
};
