import { Metadata } from "../../utils/postHelpers";
import Collection from "./Collection";
import { getPostsByCollection } from "./helpers";

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
          <li key={index}>
            <Collection posts={postsByCollection} selectedTags={selectedTags} />
          </li>
        )
      )}
    </>
  );
}