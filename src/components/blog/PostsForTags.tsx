import { AnimatePresence, motion } from "framer-motion";
import { Metadata } from "src/utils/post";
import { PostCard } from "src/components/blog/PostCard";
import { getPostsWoCollection, orderPosts } from "src/components/blog/helpers";

export function PostsWoCollectionForTags({
  filteredPostsByTags,
  selectedTags,
}: {
  filteredPostsByTags: Metadata[];
  selectedTags: string[];
}) {
  const orderedPostsWoCollection = orderPosts(getPostsWoCollection(filteredPostsByTags), "date");

  return (
    <>
      {orderedPostsWoCollection.map((metadata, index) => (
        <AnimatePresence key={index}>
          <motion.li layout="position">
            <PostCard metadata={metadata} selectedTags={selectedTags} />
          </motion.li>
        </AnimatePresence>
      ))}
    </>
  );
}
