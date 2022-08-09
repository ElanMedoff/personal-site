import cx from "classnames";
import { useState } from "react";
import BlogCard from "../../components/BlogCard";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";

export default function Blog({ allMetadata }: { allMetadata: Metadata[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMethod, setFilterMethod] = useState<"union" | "intersection">(
    "union"
  );
  const allTags = Array.from(
    new Set(allMetadata.map(({ tags }) => tags).flat())
  );

  let filteredPosts: Metadata[];
  if (filterMethod === "union") {
    filteredPosts = allMetadata.filter((metadata) => {
      return (
        metadata.tags.filter((tag) => selectedTags.includes(tag)).length > 0
      );
    });
  } else {
    filteredPosts = allMetadata.filter((metadata) => {
      return (
        metadata.tags.filter((tag) => selectedTags.includes(tag)).length ===
        selectedTags.length
      );
    });
  }

  const orderedPosts = filteredPosts.sort((a, b) => a.priority - b.priority);

  return (
    <>
      <h1 className="p-3 text-2xl">blog posts</h1>
      <div className="flex flex-wrap-reverse gap-5">
        <section className="flex flex-col gap-4 flex-grow-[3] flex-shrink-[3] basis-[300px]">
          {selectedTags.length > 0
            ? orderedPosts.map((metadata, index) => (
                <BlogCard metadata={metadata} key={index} />
              ))
            : allMetadata
                .sort((a, b) => a.priority - b.priority)
                .map((metadata, index) => (
                  <BlogCard metadata={metadata} key={index} />
                ))}
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
            sort method
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
      allMetadata: fetchAllMetadata(),
    },
  };
}
