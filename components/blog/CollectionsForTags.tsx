import { Metadata } from "utils/post";
import { Collection } from "components/blog/Collection";
import { getPostsByCollection } from "components/blog/helpers";

export function CollectionsForTags({
  filteredPostsByTags,
  allCollections,
  selectedTags,
}: {
  filteredPostsByTags: Metadata[];
  allCollections: string[];
  selectedTags: string[];
}) {
  return (
    <>
      {getPostsByCollection(filteredPostsByTags, allCollections).map(
        (postsByCollection, index) => (
          <li key={index} className="mb-4">
            <Collection posts={postsByCollection} selectedTags={selectedTags} />
          </li>
        )
      )}
    </>
  );
}
