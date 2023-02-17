import * as ReactDOMServer from "react-dom/server";
import { fetchPostBySlug, Post, Metadata } from "utils/postHelpers";
import BlogCard from "components/blog/BlogCard";
import { MDXRemote } from "next-mdx-remote";
import Content from "components/blog/Content";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { convert } from "html-to-text";
import { count } from "@wordpress/wordcount";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { isFeatureEnabled } from "utils/featureHelpers";
import useOAuthExchange from "hooks/useOAuthExchange";
import { components, msToReadingTime } from "components/blog/helpers";
import LoginLogout from "components/blog/LoginLogout";
import Upvote from "components/blog/Upvote";
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import hasUpvotedLoader from "loaders/hasUpvotedLoader";
import userLoader from "loaders/userLoader";
import upvoteCountLoader from "loaders/upvoteCountLoader";

export default function PostPage({
  post,
  relatedPostMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useOAuthExchange();
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
          <div className="flex justify-between items-start gap-6 mb-8">
            <div>
              <p className="pb-2 text-sm underline underline-offset-4 w-max">
                last updated: {post.metadata.lastUpdated}
              </p>
              <p className="text-sm italic">{formattedReadingTime} read</p>
            </div>
            {isFeatureEnabled("oauth") ? <LoginLogout /> : null}
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
          <p className="mb-3 text-sm italic">you may also upvote:</p>
          <BlogCard metadata={relatedPostMetadata} />
        </section>
      </Content>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-3 bg-primary"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      {isFeatureEnabled("oauth") ? <Upvote /> : null}
    </>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
  dehydratedState: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const queryClient = new QueryClient();

  const getServerSidePropsCookie = context.req.cookies.sessionId;
  await queryClient.prefetchQuery(["hasUpvoted", slug], () =>
    hasUpvotedLoader({
      slug,
      getServerSidePropsCookie,
    })
  );
  await queryClient.prefetchQuery(["upvoteCount", slug], () =>
    upvoteCountLoader(slug)
  );
  await queryClient.prefetchQuery(["user"], () =>
    userLoader(getServerSidePropsCookie)
  );

  const { post, relatedPostMetadata } = await fetchPostBySlug(slug);
  return {
    props: {
      post,
      relatedPostMetadata,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
