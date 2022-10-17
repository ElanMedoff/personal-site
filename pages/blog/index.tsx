import { twMerge as tm } from "tailwind-merge";
import { ReactNode, useState } from "react";
import BlogCard from "../../components/BlogCard";
import SwiperCards from "../../components/SwiperCards";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";
import { Collection } from "../../utils/postHelpers";
import Content from "../../components/Content";
import Head from "next/head";
import Divider from "../../components/reusable/Divider";

const orderPosts = (posts: Metadata[], method: "date" | "collection") => {
  return posts.sort((a, b) =>
    method === "date"
      ? new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      : (a.collection as Collection).order - (b.collection as Collection).order
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

const Pill = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick: (args: any) => void;
}) => {
  return (
    <span
      className={tm(
        "cursor-pointer select-none rounded-full px-4 py-1 h-max w-max text-xs bg-base-200 transition border border-neutral",
        "hover:bg-base-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
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

  const currPosts = selectedTags.length > 0 ? filteredPosts : allPosts;

  const renderPostsWoCollection = () => {
    return orderPosts(getPostsWoCollection(currPosts), "date").map(
      (metadata, index) => (
        <BlogCard metadata={metadata} key={index} selectedTags={selectedTags} />
      )
    );
  };

  const renderCollections = () => {
    return getPostsByCollection(currPosts, allCollections).map(
      (postsByCollection, index) => (
        <SwiperCards
          rounded
          key={index}
          slides={postsByCollection.map((metadata, index) => (
            <BlogCard
              metadata={metadata}
              key={index}
              className="border-primary"
              selectedTags={selectedTags}
            />
          ))}
          className={tm(
            "xs:max-w-[300px]",
            "[@media(min-width:450px)]:max-w-[400px]",
            "xl:max-w-[500px]"
          )}
        />
      )
    );
  };

  const shouldRenderCollectionsTitle = () => {
    const postsByCollection = getPostsByCollection(currPosts, allCollections);
    return postsByCollection.length > 0;
  };

  const shouldRenderBlogTitle = () => {
    const postsWoCollection = getPostsWoCollection(currPosts);
    return postsWoCollection.length > 0;
  };

  return (
    <>
      <Head>
        <title>elanmed.dev - blog</title>
      </Head>
      <Content>
        <div className="flex flex-wrap-reverse gap-12">
          <section className="flex flex-col gap-4 flex-grow-[3] flex-shrink-[3] basis-[300px]">
            {!shouldRenderCollectionsTitle() && !shouldRenderBlogTitle() ? (
              <div className="pl-3">
                <h2 className="mb-3 text-2xl">no results!</h2>
                <p className="italic">try selecting a different combination</p>
              </div>
            ) : null}
            {shouldRenderCollectionsTitle() ? (
              <h2 className="pl-3 text-2xl underline">collections</h2>
            ) : null}
            <div className="ml-[-10px] mb-5">{renderCollections()}</div>
            {shouldRenderBlogTitle() ? (
              <h1 className="pl-3 text-2xl underline">blog posts</h1>
            ) : null}
            {renderPostsWoCollection()}
          </section>
          <section className="flex-grow-[2] flex-shrink-[2] basis-[290px]">
            <h2 className="m-3 text-lg underline w-max">tags</h2>
            <div className="flex flex-col pl-3 gap-3">
              <div className="flex flex-wrap gap-2">
                {allTags.map((filter, index) => (
                  <Pill
                    key={index}
                    className={tm(
                      selectedTags.includes(filter) &&
                        "bg-secondary hover:bg-secondary text-secondary-content"
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
                  </Pill>
                ))}
              </div>
              <div className="divider my-0" />
              <Pill
                onClick={() => {
                  setSelectedTags([]);
                }}
                className="active:scale-95"
              >
                reset all
              </Pill>
            </div>
            <h2 className="m-3 mt-6 text-sm underline w-max">filter method</h2>
            <div className="flex flex-wrap pl-3 gap-2">
              <Pill
                className={tm(
                  filterMethod === "union" &&
                    "bg-secondary hover:bg-secondary text-secondary-content"
                )}
                onClick={() => setFilterMethod("union")}
              >
                union
              </Pill>
              <Pill
                className={tm(
                  filterMethod === "intersection" &&
                    "bg-secondary hover:bg-secondary text-secondary-content"
                )}
                onClick={() => setFilterMethod("intersection")}
              >
                intersection
              </Pill>
            </div>
          </section>
        </div>
      </Content>
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
