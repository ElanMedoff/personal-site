import fuzzysort from "fuzzysort";
import { Metadata } from "src/utils/post";
import { Collection } from "src/components/blog/Collection";
import { getPostsByCollection, getPostsWCollection } from "src/components/blog/helpers";

export function CollectionsForSearch({
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
    postsWCollection.map((post) => post.title),
  );

  const hydratedResults = fuzzyResults.map((result) =>
    postsWCollection.find((post) => post.title === result.target),
  ) as Metadata[];

  const postsByCollection = getPostsByCollection(allMetadata, allCollections).map((posts) => {
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
          const hydratedResult = hydratedResults.find((result) => result.title === post.title);

          if (!hydratedResult) {
            throw new Error("no hydrated result found");
          }

          const formattedTitle =
            fuzzysort.highlight(
              fuzzyResults.find((result) => result.target === hydratedResult.title),
              "<span class='text-secondary underline'>",
              "</span>",
            ) ?? undefined;

          return formattedTitle;
        });

        return (
          <li key={index} className="mb-4 -ml-12">
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
