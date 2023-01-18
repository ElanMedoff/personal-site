import { Metadata } from "utils/postHelpers";
import Collection from "components/blog/Collection";
import { getPostsByCollection } from "components/blog/helpers";

export default function CollectionsForTags({
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
          <li key={index} className="mb-3">
            <Collection posts={postsByCollection} selectedTags={selectedTags} />
          </li>
        )
      )}
    </>
  );
}
