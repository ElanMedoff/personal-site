import { AnimatePresence, motion } from "framer-motion";
import { Metadata } from "utils/postHelpers";
import BlogCard from "components/blog/BlogCard";
import { getPostsWoCollection, orderPosts } from "components/blog/helpers";

export default function PostsWoCollectionForTags({
  filteredPostsByTags,
  selectedTags,
}: {
  filteredPostsByTags: Metadata[];
  selectedTags: string[];
}) {
  const orderedPostsWoCollection = orderPosts(
    getPostsWoCollection(filteredPostsByTags),
    "date"
  );

  return (
    <>
      {orderedPostsWoCollection.map((metadata, index) => (
        <AnimatePresence key={index}>
          <motion.li layout="position">
            <BlogCard metadata={metadata} selectedTags={selectedTags} />
          </motion.li>
        </AnimatePresence>
      ))}
    </>
  );
}
