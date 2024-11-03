import fuzzysort from "fuzzysort";
import { AnimatePresence, motion } from "framer-motion";
import { Metadata } from "utils/post";
import { PostCard } from "components/blog/PostCard";
import { getPostsWoCollection } from "components/blog/helpers";

export function PostsWoCollectionForSearch({
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
            "<span class='text-secondary underline'>",
            "</span>"
          ) ?? undefined;
        return (
          <AnimatePresence key={index}>
            <motion.li layout="position">
              <PostCard
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
