import { Metadata } from "src/utils/post";
import { Collection } from "src/components/blog/Collection";
import { getPostsByCollection } from "src/components/blog/helpers";

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
      {getPostsByCollection(filteredPostsByTags, allCollections).map((postsByCollection, index) => (
        <li key={index} className="mb-4">
          <Collection posts={postsByCollection} selectedTags={selectedTags} />
        </li>
      ))}
    </>
  );
}
