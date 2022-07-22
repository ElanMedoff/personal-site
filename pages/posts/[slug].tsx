import {
  fetchPostSlugs,
  fetchPostBySlug,
  Post,
  Metadata,
} from "../../utils/postHelpers";
import styles from "../../styles/unreset.module.scss";

interface Props {
  post: Post;
  relatedPostMetadata: Metadata;
}

export default function PostPage({ post, relatedPostMetadata }: Props) {
  console.log({ post, relatedPostMetadata });
  return (
    <div
      className={styles.unreset}
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
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
