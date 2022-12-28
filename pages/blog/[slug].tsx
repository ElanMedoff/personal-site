import * as ReactDOMServer from "react-dom/server";
import {
  fetchPostSlugs,
  fetchPostBySlug,
  Post,
  Metadata,
} from "utils/postHelpers";
import BlogCard from "components/blog/BlogCard";
import { MDXRemote } from "next-mdx-remote";
import Content from "components/blog/Content";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { convert } from "html-to-text";
import { count } from "@wordpress/wordcount";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { isFeatureEnabled } from "utils/gateHelpers";
import Login from "components/blog/Login";
import useOAuthExchange from "hooks/useOAuthExchange";
import { components, msToReadingTime } from "components/blog/helpers";

export default function PostPage({
  post,
  relatedPostMetadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useOAuthExchange();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const header = document.querySelector(
      `[data-locationhash=${hash.slice(1)}]`
    );

    if (!header) return;
    const { y } = header.getBoundingClientRect();
    if (!y || document.documentElement.scrollTop !== 0) return;

    window.scrollTo({ top: y - 24, behavior: "smooth" });
  }, []);

  const memoizedComponents = useMemo(() => components, []);
  const wordCount = useMemo(() => {
    const asString = ReactDOMServer.renderToString(
      <MDXRemote
        compiledSource={post.content}
        components={memoizedComponents}
      />
    );
    const asPlainText = convert(asString);

    return count(asPlainText, "words", {});
  }, [memoizedComponents, post.content]);
  const avgReadingSpeed = 200;
  const rawReadingTime = (wordCount / avgReadingSpeed) * 60000;
  const formattedReadingTime = msToReadingTime(rawReadingTime);

  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
      </Head>
      <Content>
        <section className="md:text-justify">
          <div className="mb-8">
            <p className="pb-2 text-sm underline underline-offset-4 w-max">
              last updated: {post.metadata.lastUpdated}
            </p>
            <p className="text-sm italic">{formattedReadingTime} read</p>
          </div>
          <MDXRemote
            compiledSource={post.content}
            components={{
              ...components,
            }}
          />
        </section>
        <div className="w-1/2 divider" />
        <section>
          <p className="mb-3 text-sm italic">you may also like:</p>
          <BlogCard metadata={relatedPostMetadata} />
        </section>
        {isFeatureEnabled("oauth") ? (
          <div className="w-full flex justify-center mt-6">
            <Login user={user} />
          </div>
        ) : null}
      </Content>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-3 bg-primary"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;

  const { post, relatedPostMetadata } = await fetchPostBySlug(slug);
  return {
    props: {
      post,
      relatedPostMetadata,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await fetchPostSlugs(),
    fallback: false,
  };
};
