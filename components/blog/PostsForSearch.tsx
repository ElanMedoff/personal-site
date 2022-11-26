import { AnimatePresence, motion } from "framer-motion";
import fuzzysort from "fuzzysort";
import { Metadata } from "utils/postHelpers";
import BlogCard from "components/blog/BlogCard";
import { getPostsWoCollection } from "components/blog/helpers";

export default function PostsWoCollectionForSearch({
  allMetadata,
  inputValue,
  selectedTags,
}: {
  allMetadata: Metadata[];
  inputValue: string;
  selectedTags: string[];
}) {
  const postsWoCollection = getPostsWoCollection(allMetadata);
  const fuzzyResults = fuzzysort.go(
    inputValue,
    postsWoCollection.map((post) => post.title)
  );

  const filteredPostsBySearch = fuzzyResults.map((result) =>
    postsWoCollection.find((post) => post.title === result.target)
  ) as Metadata[];

  return (
    <>
      {filteredPostsBySearch.map((metadata, index) => {
        const formattedTitle =
          fuzzysort.highlight(
            fuzzyResults[index],
            "<span class='text-secondary'>",
            "</span>"
          ) ?? undefined;
        return (
          <AnimatePresence key={index}>
            <motion.li layout="position">
              <BlogCard
                metadata={metadata}
                selectedTags={selectedTags}
                formattedTitle={formattedTitle}
              />
            </motion.li>
          </AnimatePresence>
        );
      })}
    </>
  );
}
