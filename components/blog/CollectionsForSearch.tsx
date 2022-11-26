import fuzzysort from "fuzzysort";
import { Metadata } from "utils/postHelpers";
import Collection from "components/blog/Collection";
import {
  getPostsByCollection,
  getPostsWCollection,
} from "components/blog/helpers";

export default function CollectionsForSearch({
  allMetadata,
  inputValue,
  allCollections,
  selectedTags,
}: {
  allMetadata: Metadata[];
  inputValue: string;
  allCollections: string[];
  selectedTags: string[];
}) {
  const postsWCollection = getPostsWCollection(allMetadata);

  const fuzzyResults = fuzzysort.go(
    inputValue,
    postsWCollection.map((post) => post.title)
  );

  const hydratedResults = fuzzyResults.map((result) =>
    postsWCollection.find((post) => post.title === result.target)
  ) as Metadata[];

  const postsByCollection = getPostsByCollection(
    allMetadata,
    allCollections
  ).map((posts) => {
    return posts.filter((post) => {
      return hydratedResults.some((result) => {
        return result.title === post.title;
      });
    });
  });

  return (
    <>
      {postsByCollection.map((posts, index) => {
        const formattedTitles = posts.map((post) => {
          const hydratedResult = hydratedResults.find(
            (result) => result.title === post.title
          ) as Metadata;

          const formattedTitle =
            fuzzysort.highlight(
              fuzzyResults.find(
                (result) => result.target === hydratedResult.title
              ),
              "<span class='text-secondary'>",
              "</span>"
            ) ?? undefined;

          return formattedTitle;
        });

        return (
          <li key={index}>
            <Collection
              posts={posts}
              selectedTags={selectedTags}
              formattedTitles={formattedTitles}
            />
          </li>
        );
      })}
    </>
  );
}
