import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  atomDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  fetchPostSlugs,
  fetchPostBySlug,
  Post,
  Metadata,
} from "../../utils/postHelpers";
import rehypeRaw from "rehype-raw";
import styles from "../../styles/markdown.module.scss";
import BlogCard from "../../components/BlogCard";
import { useContext } from "react";
import { ThemeContext } from "../../components/Layout";

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
}

export default function PostPage({ post, relatedPostMetadata }: Props) {
  const { enabled } = useContext(ThemeContext);

  return (
    <div>
      <div className="pb-2 mb-8 text-sm italic border-b-2 text-primary border-b-base-300 w-max">
        last updated: {post.metadata.lastUpdated}
      </div>
      <ReactMarkdown
        className={styles.markdown}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={(enabled ? atomDark : darcula) as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="inline-block px-3 py-0 text-sm rounded bg-base-300">
                {children}
              </code>
            );
          },
          img({ src, ...props }) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...props} src={`/${src}`} alt="static markdown image" />
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
      <div className="w-1/2 divider" />
      <div>
        <p className="mb-3 text-sm italic text-primary">you may also like:</p>
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
    fallback: false,
  };
}
