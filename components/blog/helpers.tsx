import { Collection, Metadata } from "utils/postHelpers";
import Code from "components/reusable/Code";
import Info from "components/reusable/Info";
import Link from "components/reusable/Link";
import Aside from "components/reusable/Aside";
import Image from "components/reusable/Image";
import { anchorStyles } from "components/reusable/Anchor";
import HeaderLink from "components/reusable/HeaderLink";
import { HTMLAttributes } from "react";

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

export const components = {
  Image,
  Code,
  Info,
  Link,
  Aside,
  a: (props: HTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className={anchorStyles} />
  ),
  code: (props: HTMLAttributes<HTMLPreElement>) => (
    <code
      className="bg-warning text-warning-content rounded-md px-3 inline-block text-sm"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-6" {...props} />
  ),
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl md:text-4xl font-bold my-2 text-center"
      {...props}
    />
  ),
  h2: HeaderLink,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-lg font-bold my-4 text-left" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-base font-bold my-5 text-left" {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-sm font-bold my-6 text-left" {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-xs font-bold my-10 text-left" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="leading-7 list-decimal pl-5 sm:pl-10 my-6" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="leading-7 list-disc pl-5 sm:pl-10 my-6" {...props} />
  ),
};

export function msToReadingTime(ms: number) {
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formattedHours = hours ? `${hours} hour ` : "";
  const formattedMinutes = minutes ? `${minutes} minute` : "";

  return `${formattedHours}${formattedMinutes}`;
}
