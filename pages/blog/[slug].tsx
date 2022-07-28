import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  fetchPostSlugs,
  fetchPostBySlug,
  Post,
  Metadata,
} from "../../utils/postHelpers";
import rehypeRaw from "rehype-raw";
import styles from "../../styles/markdown.module.scss";
import BlogCard from "../../components/BlogCard";

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
}

export default function PostPage({ post, relatedPostMetadata }: Props) {
  return (
    <div>
      <div className="italic text-sm text-secondary border-b-base-300 border-b-2 w-max pb-2 mb-8">
        published: {post.metadata.publishedOn}
      </div>
      <ReactMarkdown
        className={styles.markdown}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={a11yDark as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="inline-block text-sm px-3 py-0 bg-base-300 text-secondary rounded">
                {children}
              </code>
            );
          },
          // img({ src, ...props }) {
          //   if (src) {
          //     return <Image src={src} alt="dynamic markdown image" />;
          //   }
          //
          //   // eslint-disable-next-line @next/next/no-img-element
          //   return <img {...props} alt="static markdown image" />;
          // },
        }}
      >
        {post.content}
      </ReactMarkdown>
      <div className="divider w-1/2" />
      <div>
        <p className="mb-3 italic text-sm text-secondary">you may also like:</p>
        <BlogCard metadata={relatedPostMetadata} />
      </div>
    </div>
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
    fallback: true,
  };
}
