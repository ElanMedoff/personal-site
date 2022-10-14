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
import { anchorStyles } from "../../components/reusable/Anchor";
import Content from "../../components/Content";
import Head from "next/head";

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
  mdxSource: any;
}

export default function PostPage({ post, relatedPostMetadata }: Props) {
  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
      </Head>
      <Content>
        <div className="md:text-justify">
          <div className="pb-2 mb-8 text-sm italic underline underline-offset-4 w-max">
            last updated: {post.metadata.lastUpdated}
          </div>
          <MDXRemote
            compiledSource={post.content}
            components={{
              Code,
              Info,
              Link,
              Aside,
              a: (props: any) => <a {...props} className={anchorStyles} />,
              code: (props: any) => (
                <code
                  className="bg-warning text-warning-content rounded-md px-4 inline-block"
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
              h2: (props: any) => (
                <h1
                  className="text-xl md:text-2xl font-bold my-3 text-left"
                  {...props}
                />
              ),
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
                <ol className="leading-7 list-decimal pl-10" {...props} />
              ),
              ul: (props: any) => (
                <ul className="leading-7 list-disc pl-10" {...props} />
              ),
            }}
          />
          <div className="w-1/2 divider" />
          <div>
            <p className="mb-3 text-sm italic">you may also like:</p>
            <BlogCard metadata={relatedPostMetadata} />
          </div>
        </div>
      </Content>
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
