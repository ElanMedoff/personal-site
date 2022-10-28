import { twMerge as tm } from "tailwind-merge";
import { ReactNode, useState } from "react";
import BlogCard from "../../components/BlogCard";
import SwiperCards from "../../components/SwiperCards";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";
import { Collection } from "../../utils/postHelpers";
import Content from "../../components/Content";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../../components/Footer";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import fuzzysort from "fuzzysort";

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

const getPostsWCollection = (posts: Metadata[]) => {
  return posts.filter((post) => post.collection !== null);
};

const Collection = ({
  formattedTitles,
  posts,
  selectedTags,
}: {
  posts: Metadata[];
  selectedTags: string[];
  formattedTitles?: (string | undefined)[];
}) => {
  return (
    <SwiperCards
      rounded
      slides={posts.map((metadata, index) => (
        <BlogCard
          metadata={metadata}
          key={index}
          className="border-primary bg-base-100"
          selectedTags={selectedTags}
          formattedTitle={formattedTitles?.[index]}
        />
      ))}
      className={tm(
        "xs:max-w-[300px]",
        "[@media(min-width:450px)]:max-w-[400px]",
        "xl:max-w-[500px]"
      )}
    />
  );
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

export default function Blog({
  allMetadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMethod, setFilterMethod] = useState<"union" | "intersection">(
    "union"
  );
  const [input, setInput] = useState("");

  const allTags = Array.from(
    new Set(allMetadata.map(({ tags }) => tags).flat())
  );

  const allCollections = Array.from(
    new Set(
      allMetadata
        .map(({ collection }) => collection?.name)
        .filter(
          (value: string | undefined): value is string => value != undefined
        )
    )
  );

  const filteredPosts = allMetadata.filter((metadata) => {
    const numOverlappingTags = metadata.tags.filter((tag) =>
      selectedTags.includes(tag)
    ).length;

    return filterMethod === "union"
      ? numOverlappingTags > 0
      : numOverlappingTags === selectedTags.length;
  });

  const currPostsForTags =
    selectedTags.length > 0 ? filteredPosts : allMetadata;

  const renderPostsWoCollectionForTags = () => {
    return orderPosts(getPostsWoCollection(currPostsForTags), "date").map(
      (metadata, index) => (
        <AnimatePresence key={index}>
          <motion.li layout="position">
            <BlogCard metadata={metadata} selectedTags={selectedTags} />
          </motion.li>
        </AnimatePresence>
      )
    );
  };

  const renderCollectionsForTags = () => {
    return getPostsByCollection(currPostsForTags, allCollections).map(
      (postsByCollection, index) => (
        <li key={index}>
          <Collection posts={postsByCollection} selectedTags={selectedTags} />
        </li>
      )
    );
  };

  const renderPostsWoCollectionForSearch = () => {
    const postsWoCollection = getPostsWoCollection(allMetadata);
    const fuzzyResults = fuzzysort.go(
      input,
      postsWoCollection.map((post) => post.title)
    );

    const filteredPosts = fuzzyResults.map((result) =>
      postsWoCollection.find((post) => post.title === result.target)
    ) as Metadata[];

    return filteredPosts.map((metadata, index) => {
      const formattedTitle =
        fuzzysort.highlight(
          fuzzyResults[index],
          "<span class='text-secondary'>",
          "</span>"
        ) ?? undefined;
      return (
        <AnimatePresence key={index}>
          <motion.li layout="position">
            <BlogCard
              metadata={metadata}
              selectedTags={selectedTags}
              formattedTitle={formattedTitle}
            />
          </motion.li>
        </AnimatePresence>
      );
    });
  };

  const renderCollectionsForSearch = () => {
    const postsWCollection = getPostsWCollection(allMetadata);

    const fuzzyResults = fuzzysort.go(
      input,
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

    return postsByCollection.map((posts, index) => {
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
    });
  };

  const shouldRenderCollectionsTitle = () => {
    if (input) {
      return (
        fuzzysort.go(
          input,
          getPostsWCollection(allMetadata).map((post) => post.title)
        ).length > 0
      );
    }

    return getPostsByCollection(currPostsForTags, allCollections).length > 0;
  };

  const shouldRenderBlogTitle = () => {
    if (input) {
      return (
        fuzzysort.go(
          input,
          getPostsWoCollection(allMetadata).map((post) => post.title)
        ).length > 0
      );
    }

    return getPostsWoCollection(currPostsForTags).length > 0;
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
            <div className="ml-[-10px] mb-5">
              <AnimatePresence>
                <motion.ul layout="position">
                  {input
                    ? renderCollectionsForSearch()
                    : renderCollectionsForTags()}
                </motion.ul>
              </AnimatePresence>
            </div>
            {shouldRenderBlogTitle() ? (
              <h1 className="pl-3 text-2xl underline">blog posts</h1>
            ) : null}
            {/* TODO: these don't seem to be working */}
            <AnimatePresence>
              <motion.ul layout>
                {input
                  ? renderPostsWoCollectionForSearch()
                  : renderPostsWoCollectionForTags()}
              </motion.ul>
            </AnimatePresence>
          </section>
          <section className="flex-grow-[2] flex-shrink-[2] basis-[290px]">
            <input
              type="text"
              placeholder="fuzzy search for post"
              className="input input-bordered w-full max-w-xs m-3 border border-neutral"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setSelectedTags([]);
              }}
            />
            <h2 className="m-3 text-lg underline w-max">tags</h2>
            <div className="flex flex-col pl-3 gap-3">
              <ul className="flex flex-wrap gap-2">
                {allTags.map((filter, index) => (
                  <Pill
                    key={index}
                    className={tm(
                      selectedTags.includes(filter) &&
                        "bg-secondary hover:bg-secondary text-secondary-content"
                    )}
                    onClick={() => {
                      setInput("");
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
              </ul>
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
      <Footer />
    </>
  );
}

interface Props {
  allMetadata: Metadata[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      allMetadata: fetchAllMetadata(),
    },
  };
};
