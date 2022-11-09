import * as ReactDOMServer from "react-dom/server";
import {
  fetchPostSlugs,
  fetchPostBySlug,
  Post,
  Metadata,
} from "../../utils/postHelpers";
import BlogCard from "../../components/BlogCard";
import Code from "../../components/reusable/Code";
import { MDXRemote } from "next-mdx-remote";
import Info from "../../components/reusable/Info";
import Link from "../../components/reusable/Link";
import Aside from "../../components/reusable/Aside";
import Image from "../../components/reusable/Image";
import { anchorStyles } from "../../components/reusable/Anchor";
import Content from "../../components/Content";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { convert } from "html-to-text";
import { count } from "@wordpress/wordcount";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import HeaderLink from "../../components/reusable/HeaderLink";

function msToReadingTime(ms: number) {
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formattedHours = hours ? `${hours} hour ` : "";
  const formattedMinutes = minutes ? `${minutes} minute` : "";

  return `${formattedHours}${formattedMinutes}`;
}

export default function PostPage({
  post,
  relatedPostMetadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

  const components = useMemo(() => ({ Image, Code, Info, Link, Aside }), []);
  const wordCount = useMemo(
    () =>
      count(
        convert(
          ReactDOMServer.renderToString(
            <MDXRemote compiledSource={post.content} components={components} />
          )
        ),
        "words",
        {}
      ),
    [components, post.content]
  );
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
              a: (props: any) => <a {...props} className={anchorStyles} />,
              code: (props: any) => (
                <code
                  className="bg-warning text-warning-content rounded-md px-3 inline-block text-sm"
                  {...props}
                />
              ),
              p: (props: any) => <p className="my-6" {...props} />,
              h1: (props: any) => (
                <h1
                  className="text-2xl md:text-4xl font-bold my-2 text-center"
                  {...props}
                />
              ),
              h2: HeaderLink,
              h3: (props: any) => (
                <h1 className="text-lg font-bold my-4 text-left" {...props} />
              ),
              h4: (props: any) => (
                <h1 className="text-base font-bold my-5 text-left" {...props} />
              ),
              h5: (props: any) => (
                <h1 className="text-sm font-bold my-6 text-left" {...props} />
              ),
              h6: (props: any) => (
                <h1 className="text-xs font-bold my-10 text-left" {...props} />
              ),
              ol: (props: any) => (
                <ol
                  className="leading-7 list-decimal pl-5 sm:pl-10 my-6"
                  {...props}
                />
              ),
              ul: (props: any) => (
                <ul
                  className="leading-7 list-disc pl-5 sm:pl-10 my-6"
                  {...props}
                />
              ),
            }}
          />
        </section>
        <div className="w-1/2 divider" />
        <section>
          <p className="mb-3 text-sm italic">you may also like:</p>
          <BlogCard metadata={relatedPostMetadata} />
        </section>
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
