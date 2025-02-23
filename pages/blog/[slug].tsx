import * as ReactDOMServer from "react-dom/server";
import Head from "next/head";
import { fetchPostBySlug, Post, Metadata, isSlugValid } from "utils/post";
import { PostCard } from "components/blog/PostCard";
import { MDXRemote } from "next-mdx-remote";
import { Content } from "components/blog/Content";
import { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { convert } from "html-to-text";
import { count } from "@wordpress/wordcount";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { components, msToReadingTime } from "components/blog/helpers";
import { LoginLogout } from "components/blog/LoginLogout";
import { Upvote } from "components/blog/Upvote";
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { hasUpvotedLoader } from "loaders/hasUpvoted";
import { userLoader } from "loaders/user";
import { upvoteCountLoader } from "loaders/upvoteCount";
import { Header } from "components/root/Header";
import { generateQueryKey } from "loaders/helpers";
import { Footer } from "components/reusable/Footer";

export default function PostPage({
  post,
  relatedPostMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const memoizedComponents = useMemo(() => components, []);
  const wordCount = useMemo(() => {
    const asString = ReactDOMServer.renderToString(
      <MDXRemote
        compiledSource={post.content}
        components={memoizedComponents}
        scope={undefined}
        frontmatter={undefined}
      />
    );
    const asPlainText = convert(asString);

    return count(asPlainText, "words", {});
  }, [memoizedComponents, post.content]);
  const avgReadingSpeed = 200;
  const rawReadingTime = (wordCount / avgReadingSpeed) * 60000;
  const formattedReadingTime = msToReadingTime(rawReadingTime);

  const title = `elanmed.dev | ${post.metadata.title}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.metadata.abstract} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.metadata.abstract} />
        <meta property="og:image" content="https://elanmed.dev/og.jpg" />
      </Head>
      <Header />
      <Content>
        <section className="md:text-justify">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-6 mb-12">
            <div>
              <p className="pb-2 text-sm underline underline-offset-4">
                last updated: {post.metadata.lastUpdated}
              </p>
              <p className="text-sm italic">{formattedReadingTime} read</p>
            </div>
            <LoginLogout />
          </div>
          <MDXRemote
            compiledSource={post.content}
            components={components}
            scope={undefined}
            frontmatter={undefined}
          />
        </section>
        <div className="w-1/2 divider" />
        <section>
          <p className="mb-3 text-sm italic">you might also like:</p>
          <PostCard metadata={relatedPostMetadata} />
        </section>
      </Content>
      <Footer />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-3 bg-primary"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      <Upvote />
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
  if (!isSlugValid(slug)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  const queryClient = new QueryClient();

  const getServerSidePropsCookie = context.req.cookies.sessionId;

  await queryClient.prefetchQuery(generateQueryKey("user", []), () =>
    userLoader(getServerSidePropsCookie)
  );
  await queryClient.prefetchQuery(generateQueryKey("hasUpvoted", [slug]), () =>
    hasUpvotedLoader(slug, getServerSidePropsCookie)
  );
  await queryClient.prefetchQuery(generateQueryKey("upvoteCount", [slug]), () =>
    upvoteCountLoader(slug, getServerSidePropsCookie)
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
