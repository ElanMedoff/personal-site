import { twMerge as tm } from "tailwind-merge";
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
  return allCollections
    .map((collectionName) => {
      return orderPosts(
        posts.filter((post) => post.collection?.name === collectionName),
        "collection"
      );
    })
    .filter((collection) => collection.length > 0);
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

  const renderCollections = () => {
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
            className="border-primary"
          />
        ))}
        maxWidth={500}
      />
    ));
  };

  const shouldRenderCollectionsTitle = () => {
    const postsByCollection = getPostsByCollection(
      selectedTags.length > 0 ? filteredPosts : allPosts,
      allCollections
    );
    return postsByCollection.length > 0;
  };

  return (
    <div className="flex flex-wrap-reverse gap-10">
      <section className="flex flex-col gap-4 flex-grow-[3] flex-shrink-[3] basis-[300px]">
        {shouldRenderCollectionsTitle() ? (
          <h2 className="pl-3 text-2xl underline">collections</h2>
        ) : null}
        <div className="ml-[-10px] mb-5">{renderCollections()}</div>
        <h1 className="pl-3 text-2xl underline">blog posts</h1>
        {renderPostsWoCollection()}
      </section>
      <section className="flex-grow-[2] flex-shrink-[2] basis-[200px]">
        <h2 className="m-3 text-lg underline w-max">tags</h2>
        <div className="flex flex-wrap pl-3 gap-2">
          {allTags.map((filter, index) => (
            <span
              key={index}
              className={tm(
                "cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition",
                "hover:bg-base-300",
                selectedTags.includes(filter) &&
                  "bg-secondary hover:bg-secondary"
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
        <h2 className="m-3 mt-6 text-sm underline w-max">filter method</h2>
        <div className="flex flex-wrap pl-3 gap-2">
          <span
            className={tm(
              "cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition",
              "hover:bg-base-300",
              filterMethod === "union" && "bg-primary hover:bg-primary"
            )}
            onClick={() => setFilterMethod("union")}
          >
            union
          </span>
          <span
            className={tm(
              "cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition",
              "hover:bg-base-300",
              filterMethod === "intersection" && "bg-primary hover:bg-primary"
            )}
            onClick={() => setFilterMethod("intersection")}
          >
            intersection
          </span>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPosts: fetchAllMetadata(),
    },
  };
}
