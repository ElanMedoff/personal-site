import cx from "classnames";
import { useState } from "react";
import BlogCard from "../../components/BlogCard";
import Cards from "../../components/Cards";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";

const orderPosts = (posts: Metadata[], method: "date" | "collection") => {
  return posts.sort((a, b) =>
    method === "collection"
      ? new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      : (a.collection?.order ?? 0) - (b.collection?.order ?? 0)
  );
};

const getPostsByCollection = (posts: Metadata[], allCollections: string[]) => {
  return allCollections.map((collectionName) => {
    return orderPosts(
      posts.filter((post) => post.collection?.name === collectionName),
      "collection"
    );
  });
};

const getPostsWoCollection = (posts: Metadata[]) => {
  return posts.filter(({ collection }) => collection === null);
};

export default function Blog({ allPosts }: { allPosts: Metadata[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMethod, setFilterMethod] = useState<"union" | "intersection">(
    "union"
  );

  const allTags = Array.from(new Set(allPosts.map(({ tags }) => tags).flat()));

  const allCollections = Array.from(
    new Set(
      allPosts
        .map(({ collection }) => collection?.name)
        .filter(
          (value: string | undefined): value is string => value != undefined
        )
    )
  );

  const filteredPosts = allPosts.filter((metadata) => {
    const numOverlappingTags = metadata.tags.filter((tag) =>
      selectedTags.includes(tag)
    ).length;

    return filterMethod === "union"
      ? numOverlappingTags > 0
      : numOverlappingTags === selectedTags.length;
  });

  const renderPostsWoCollection = () => {
    return orderPosts(
      getPostsWoCollection(selectedTags.length > 0 ? filteredPosts : allPosts),
      "date"
    ).map((metadata, index) => <BlogCard metadata={metadata} key={index} />);
  };

  const renderPostsByCollection = () => {
    return getPostsByCollection(
      selectedTags.length > 0 ? filteredPosts : allPosts,
      allCollections
    ).map((postsByCollection, index) => (
      <Cards
        key={index}
        slides={postsByCollection.map((metadata, index) => (
          <BlogCard
            metadata={metadata}
            key={index}
            className="border-2 border-primary"
          />
        ))}
      />
    ));
  };

  return (
    <>
      <h1 className="p-3 text-2xl">blog posts</h1>
      <div className="flex flex-wrap-reverse gap-5">
        <section className="flex flex-col gap-4 flex-grow-[3] flex-shrink-[3] basis-[300px]">
          {renderPostsWoCollection()}
          {/* // TODO: figure out how to conditionally render this */}
          <h2 className="p-3 text-2xl">collections</h2>
          <div className="ml-[-10px]">{renderPostsByCollection()}</div>
        </section>
        <section className="flex-grow-[2] flex-shrink-[2] basis-[200px]">
          <h2 className="m-3 text-lg border-b-2 w-max border-b-base-300">
            tags
          </h2>
          <div className="flex flex-wrap pl-3 gap-2">
            {allTags.map((filter, index) => (
              <span
                key={index}
                className={cx(
                  "cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition",
                  "hover:bg-base-300",
                  {
                    "bg-secondary hover:bg-secondary":
                      selectedTags.includes(filter),
                  }
                )}
                onClick={() => {
                  setSelectedTags((prevSelectedTags) => {
                    if (prevSelectedTags.includes(filter)) {
                      return prevSelectedTags.filter(
                        (prevFilter) => prevFilter !== filter
                      );
                    } else {
                      return prevSelectedTags.concat(filter);
                    }
                  });
                }}
              >
                {filter}
              </span>
            ))}
          </div>
          <h2 className="m-3 mt-6 text-xs border-b-2 w-max border-b-base-300">
            filter method
          </h2>
          <div className="flex flex-wrap pl-3 gap-2">
            <span
              className={cx(
                "cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition",
                "hover:bg-base-300",
                {
                  "bg-primary hover:bg-primary": filterMethod === "union",
                }
              )}
              onClick={() => setFilterMethod("union")}
            >
              union
            </span>
            <span
              className={cx(
                "cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition",
                "hover:bg-base-300",
                {
                  "bg-primary hover:bg-primary":
                    filterMethod === "intersection",
                }
              )}
              onClick={() => setFilterMethod("intersection")}
            >
              intersection
            </span>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPosts: fetchAllMetadata(),
    },
  };
}
