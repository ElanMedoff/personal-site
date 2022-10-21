import * as ReactDOMServer from "react-dom/server";
import queryString from "query-string";
import { twMerge as tm } from "tailwind-merge";
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
import slugify from "slugify";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import { useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { convert } from "html-to-text";
import { count } from "@wordpress/wordcount";
import { useRouter } from "next/router";

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
  mdxSource: any;
}

function msToReadingTime(ms: number) {
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formattedHours = hours ? `${hours} hour ` : "";
  const formattedMinutes = minutes ? `${minutes} minute` : "";

  return `${formattedHours}${formattedMinutes}`;
}

export default function PostPage({ post, relatedPostMetadata }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const router = useRouter();

  useEffect(() => {
    let { l } = queryString.parse(router.asPath.split(/\?/)[1]);
    if (!l || Array.isArray(l)) return;
    const header = document.querySelector(`[data-locationhash=${l}]`);

    if (!header) return;
    const { y } = header.getBoundingClientRect();
    if (!y) return;
    window.scroll(0, 0);
    window.scrollTo({ top: y - 24, behavior: "smooth" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              h2: (props: any) => {
                const preProcessed = props.children
                  .replace(/([0-9]|\.|:)/g, "")
                  .toLowerCase();
                const slug = slugify(preProcessed);
                return (
                  <div className="group">
                    <h1
                      className={tm(
                        "cursor-pointer font-bold my-3 text-left inline mr-3",
                        "text-xl md:text-2xl",
                        "hover:text-secondary transition-all"
                      )}
                      {...props}
                    />
                    <span
                      className={tm(
                        "inline-block border border-base-100 py-[1px] px-[3px] rounded-full cursor-pointer relative top-[-2px]",
                        "group-hover:border-neutral transition-all",
                        "group-active:scale-[90%]"
                      )}
                      onClick={() => {
                        const url = new URL(window.location.href);
                        url.searchParams.set("l", slug);
                        window.history.pushState(undefined, "", url.toString());
                      }}
                      // override native id to use our own scrolling on load
                      data-locationhash={slug}
                    >
                      <LinkIcon size={20} className="inline-block" />
                    </span>
                  </div>
                );
              },
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
                  className="leading-7 list-decimal pl-5 sm:pl-10"
                  {...props}
                />
              ),
              ul: (props: any) => (
                <ul className="leading-7 list-disc pl-5 sm:pl-10" {...props} />
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

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { post, relatedPostMetadata } = await fetchPostBySlug(params.slug);
  return {
    props: {
      post,
      relatedPostMetadata,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: fetchPostSlugs(),
    fallback: false,
  };
}
