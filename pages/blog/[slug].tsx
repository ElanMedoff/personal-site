import ReactMarkdown from "react-markdown";
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

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
}

export default function PostPage({ post, relatedPostMetadata }: Props) {
  return (
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
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {post.content}
    </ReactMarkdown>
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
