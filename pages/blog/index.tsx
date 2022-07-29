import cx from "classnames";
import { useState } from "react";
import BlogCard from "../../components/BlogCard";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";

export default function Blog({ allMetadata }: { allMetadata: Metadata[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allTags = Array.from(
    new Set(allMetadata.map(({ tags }) => tags).flat())
  );

  return (
    <>
      <h1 className="text-2xl p-3">blog posts</h1>
      <div className="flex flex-wrap-reverse gap-5">
        <section className="flex flex-col gap-4 flex-grow-[3] flex-shrink-[3] basis-[300px]">
          {selectedTags.length > 0
            ? allMetadata
              .filter((metadata) => {
                return (
                  metadata.tags.filter((tag) => selectedTags.includes(tag))
                    .length > 0
                );
              })
              .map((metadata, index) => (
                <BlogCard metadata={metadata} key={index} />
              ))
            : allMetadata.map((metadata, index) => (
              <BlogCard metadata={metadata} key={index} />
            ))}
        </section>
        <section className="flex-grow-[2] flex-shrink-[2] basis-[200px]">
          <h2 className="m-3 w-max border-b-base-300 border-b-2">tags</h2>
          <div className="pl-3 flex flex-wrap gap-2">
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
