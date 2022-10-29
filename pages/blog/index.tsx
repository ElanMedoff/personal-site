import { twMerge as tm } from "tailwind-merge";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";
import Content from "../../components/Content";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../../components/Footer";
import { NextPageContext } from "next";
import fuzzysort from "fuzzysort";
import PostsForSearch from "../../components/blog/PostsForSearch";
import PostsForTags from "../../components/blog/PostsForTags";
import {
  getPostsByCollection,
  getPostsWCollection,
  getPostsWoCollection,
} from "../../components/blog/helpers";
import CollectionsForSearch from "../../components/blog/CollectionsForSearch";
import CollectionsForTags from "../../components/blog/CollectionsForTags";
import Pill from "../../components/blog/Pill";
import { useRouter } from "next/router";
import useIsMobile from "../../hooks/useIsMobile";

export default function Blog({
  allMetadata,
  initialMethod,
  initialSearch,
  initialTags,
}: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialTags?.split("_") ?? []
  );
  const [filterMethod, setFilterMethod] = useState<"union" | "intersection">(
    initialMethod ?? "union"
  );
  const [input, setInput] = useState(initialSearch ?? "");
  const refInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile();

  const setTagsQueryParam = (tags: string[]) => {
    const url = new URL(window.location.href);
    if (tags.length) {
      url.searchParams.set("tags", tags.join("_"));
    } else {
      url.searchParams.delete("tags");
    }
    router.push(url.toString(), undefined, { shallow: true });
  };

  const setTagsState = (tags: string[]) => {
    setSelectedTags(tags);
    setTagsQueryParam(tags);
  };

  const setMethodQueryParam = (method: "union" | "intersection") => {
    const url = new URL(window.location.href);
    url.searchParams.set("method", method);
    router.push(url.toString(), undefined, { shallow: true });
  };

  const setMethodState = (method: "union" | "intersection") => {
    setFilterMethod(method);
    setMethodQueryParam(method);
  };

  const setSearchQueryParam = useCallback(
    (search: string) => {
      const url = new URL(window.location.href);
      if (search) {
        url.searchParams.set("search", search);
      } else {
        url.searchParams.delete("search");
      }
      router.push(url.toString(), undefined, { shallow: true });
    },
    // https://github.com/vercel/next.js/issues/39007
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    // hack to set query param with controlled component
    setSearchQueryParam(input);
  }, [input, setSearchQueryParam]);

  useEffect(() => {
    if (!refInput.current) return;

    if (refInput.current.value && !isMobile) {
      refInput.current.focus();
      // hack to focus at end of input
      const currInput = refInput.current.value;
      refInput.current.value = "";
      refInput.current.value = currInput;
    }
  }, [isMobile]);

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

  const filteredPostsByTags =
    selectedTags.length > 0
      ? allMetadata.filter((metadata) => {
          const numOverlappingTags = metadata.tags.filter((tag) =>
            selectedTags.includes(tag)
          ).length;

          return filterMethod === "union"
            ? numOverlappingTags > 0
            : numOverlappingTags === selectedTags.length;
        })
      : allMetadata;

  const shouldRenderCollectionsTitle = () => {
    if (input) {
      return (
        fuzzysort.go(
          input,
          getPostsWCollection(allMetadata).map((post) => post.title)
        ).length > 0
      );
    }

    return getPostsByCollection(filteredPostsByTags, allCollections).length > 0;
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

    return getPostsWoCollection(filteredPostsByTags).length > 0;
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
                  {input ? (
                    <CollectionsForSearch
                      allCollections={allCollections}
                      allMetadata={allMetadata}
                      input={input}
                      selectedTags={selectedTags}
                    />
                  ) : (
                    <CollectionsForTags
                      allCollections={allCollections}
                      filteredPostsByTags={filteredPostsByTags}
                      selectedTags={selectedTags}
                    />
                  )}
                </motion.ul>
              </AnimatePresence>
            </div>
            {shouldRenderBlogTitle() ? (
              <h1 className="pl-3 text-2xl underline">blog posts</h1>
            ) : null}
            {/* TODO: these don't seem to be working */}
            <AnimatePresence>
              <motion.ul layout>
                {input ? (
                  <PostsForSearch
                    allMetadata={allMetadata}
                    input={input}
                    selectedTags={selectedTags}
                  />
                ) : (
                  <PostsForTags
                    filteredPostsByTags={filteredPostsByTags}
                    selectedTags={selectedTags}
                  />
                )}
              </motion.ul>
            </AnimatePresence>
          </section>
          <section className="flex-grow-[2] flex-shrink-[2] basis-[290px]">
            <input
              ref={refInput}
              type="text"
              placeholder="fuzzy search for post"
              className="input input-bordered max-w-xs w-3/4 m-3 border border-neutral"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setTagsState([]);
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
                      /* setSearchQueryParam(""); */
                      setTagsState(
                        selectedTags.includes(filter)
                          ? selectedTags.filter(
                              (prevFilter) => prevFilter !== filter
                            )
                          : selectedTags.concat(filter)
                      );
                    }}
                  >
                    {filter}
                  </Pill>
                ))}
              </ul>
              <div className="divider my-0" />
              <Pill
                onClick={() => {
                  setTagsState([]);
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
                onClick={() => {
                  setMethodState("union");
                }}
              >
                union
              </Pill>
              <Pill
                className={tm(
                  filterMethod === "intersection" &&
                    "bg-secondary hover:bg-secondary text-secondary-content"
                )}
                onClick={() => {
                  setMethodState("intersection");
                }}
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
  initialTags?: string;
  initialMethod?: "union" | "intersection";
  initialSearch?: string;
}

export function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      initialSearch: ctx.query.search ?? null,
      initialTags: ctx.query.tags ?? null,
      initialMethod: ctx.query.method ?? null,
      allMetadata: fetchAllMetadata(),
    },
  };
}
