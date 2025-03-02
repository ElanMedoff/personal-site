import { HTMLAttributes, isValidElement } from "react";
import { Metadata } from "src/utils/post";
import { Code } from "src/components/reusable/Code";
import { Info } from "src/components/reusable/Info";
import { MyLink, MyLinkProps } from "src/components/reusable/MyLink";
import { Image } from "src/components/reusable/Image";
import { HeaderLink } from "src/components/reusable/HeaderLink";

export const orderPosts = (posts: Metadata[], method: "date" | "collection") => {
  return posts.sort((a, b) => {
    if (method === "date") {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }

    if (!a.collection || !b.collection) {
      throw new Error(
        "one of the posts meant to be sorted by collection order does not have a collection",
      );
    }
    return a.collection.order - b.collection.order;
  });
};

export const getPostsByCollection = (posts: Metadata[], allCollections: string[]) => {
  return allCollections
    .map((collectionName) => {
      return orderPosts(
        posts.filter((post) => post.collection?.name === collectionName),
        "collection",
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
  Info,
  Link: MyLink,
  pre: (props: HTMLAttributes<HTMLPreElement>) => {
    if (!isValidElement(props.children)) {
      throw new Error("props.children of pre is not a code block");
    }

    const codeBlockProps = props.children.props;

    if (typeof codeBlockProps.children !== "string") {
      return null;
    }

    if (typeof codeBlockProps.className !== "string") {
      return null;
    }

    return (
      <Code
        code={"\n" + codeBlockProps.children}
        language={codeBlockProps.className.substring(codeBlockProps.className.indexOf("-") + 1)}
      />
    );
  },
  a: (props: HTMLAttributes<HTMLAnchorElement>) => <MyLink {...(props as MyLinkProps)} />,
  code: (props: HTMLAttributes<HTMLPreElement>) => (
    <code
      className="bg-secondary text-secondary-content rounded-md px-2 py-[2px] text-sm"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => <p className="my-6" {...props} />,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl md:text-4xl font-bold my-2 text-center" {...props} />
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
    <ul className="leading-7 list-disc pl-5 sm:pl-10" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-l-base-300 pl-4 sm:mx-16 mx-4 text-sm" {...props} />
  ),
};

export function msToReadingTime(ms: number) {
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formattedHours = hours ? `${hours} hour ` : "";
  const formattedMinutes = minutes ? `${minutes} minute` : "";

  return `${formattedHours}${formattedMinutes}`;
}
