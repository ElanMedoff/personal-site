import { twMerge as tm } from "tailwind-merge";
import { useEffect, useRef } from "react";
import { fetchAllMetadata, Metadata } from "utils/postHelpers";
import Content from "components/blog/Content";
import Head from "next/head";
import { motion, useAnimationControls } from "framer-motion";
import Footer from "components/reusable/Footer";
import { NextPageContext } from "next";
import fuzzysort from "fuzzysort";
import PostsForSearch from "components/blog/PostsForSearch";
import PostsForTags from "components/blog/PostsForTags";
import {
  getPostsByCollection,
  getPostsWCollection,
  getPostsWoCollection,
} from "components/blog/helpers";
import CollectionsForSearch from "components/blog/CollectionsForSearch";
import CollectionsForTags from "components/blog/CollectionsForTags";
import Pill from "components/blog/Pill";
import useIsMobile from "hooks/useIsMobile";
import { BsSearch as SearchIcon } from "react-icons/bs";
import Header from "components/root/Header";
import { useSearchParamState } from "use-search-param-state";
import { z } from "zod";

export default function Blog({ allMetadata, serverSideURL }: Props) {
  const allCollections = Array.from(
    new Set(
      allMetadata
        .map(({ collection }) => collection?.name)
        .filter(
          (value: string | undefined): value is string => value != undefined
        )
    )
  );
  const allTags = Array.from(
    new Set(allMetadata.map(({ tags }) => tags).flat())
  );

  const [selectedTags, setSelectedTags] = useSearchParamState<string[]>(
    "tags",
    [],
    {
      serverSideURL,
      parse: (unparsed) => {
        if (unparsed === "") return [];
        return unparsed.split("_");
      },
      stringify: (val) => val.join("_"),
      validate: (unvalidatedTags) => {
        if (!Array.isArray(unvalidatedTags)) throw new Error();

        const badTag = unvalidatedTags.find((tag) => !allTags.includes(tag));
        if (badTag) throw new Error();
        return unvalidatedTags;
      },
    }
  );
  const [filterMethod, setFilterMethod] = useSearchParamState<
    "union" | "intersection"
  >("method", "union", {
    serverSideURL,
    validate: z.union([z.literal("union"), z.literal("intersection")]).parse,
  });
  const [inputValue, setInputValue] = useSearchParamState("search", "", {
    serverSideURL,
    validate: z.coerce.string().parse,
  });

  const refInput = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const controls = useAnimationControls();

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

  useEffect(() => {
    controls.start({
      x: [null, 5, -5, 5, 0],
      transition: {
        type: "spring",
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 10,
        delay: 3,
      },
    });
  }, [controls]);

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
    if (inputValue) {
      return (
        fuzzysort.go(
          inputValue,
          getPostsWCollection(allMetadata).map((post) => post.title)
        ).length > 0
      );
    }

    return getPostsByCollection(filteredPostsByTags, allCollections).length > 0;
  };

  const shouldRenderBlogTitle = () => {
    if (inputValue) {
      return (
        fuzzysort.go(
          inputValue,
          getPostsWoCollection(allMetadata).map((post) => post.title)
        ).length > 0
      );
    }

    return getPostsWoCollection(filteredPostsByTags).length > 0;
  };

  const handleTagClick = (filter: string) => {
    setInputValue("");
    setSelectedTags((currTags) =>
      currTags.includes(filter)
        ? currTags.filter((prevFilter) => prevFilter !== filter)
        : currTags.concat(filter)
    );
  };

  const title = "elanmed.dev | blog";
  const description =
    "Check out 15+ blog posts on everything from React to NeoVim to comics!";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://elanmed.dev/og.jpg" />
      </Head>
      <Header hideOnScroll={false} />
      <Content>
        <div className="flex gap-6 md:gap-16 flex-wrap-reverse md:flex-nowrap">
          <section className="w-full md:w-1/2">
            <motion.div animate={controls} className="relative mt-6 mb-10">
              <input
                ref={refInput}
                type="text"
                placeholder="fuzzy search"
                className={tm(
                  "max-w-sm w-full py-3 px-6 pl-12 border border-neutral rounded-xl bg-base-100",
                  "focus:outline-none focus:outline-neutral"
                )}
                value={inputValue}
                onFocus={() => controls.stop()}
                onChange={(e) => {
                  setSelectedTags([]);
                  setFilterMethod("union");
                  setInputValue(e.target.value);
                }}
              />
              <SearchIcon
                size={20}
                className="inline-block absolute top-4 left-4"
              />
            </motion.div>
            {!shouldRenderCollectionsTitle() && !shouldRenderBlogTitle() ? (
              <div className="pl-3">
                <h2 className="mb-3 text-2xl">no results!</h2>
                <p className="italic">try selecting a different combination</p>
              </div>
            ) : null}
            <div className="mb-10">
              {shouldRenderCollectionsTitle() ? (
                <h2 className="pl-3 text-2xl underline mb-3">collections</h2>
              ) : null}
              <div className="ml-[-10px]">
                <ul>
                  {inputValue ? (
                    <CollectionsForSearch
                      allCollections={allCollections}
                      allMetadata={allMetadata}
                      inputValue={inputValue}
                      selectedTags={selectedTags}
                    />
                  ) : (
                    <CollectionsForTags
                      allCollections={allCollections}
                      filteredPostsByTags={filteredPostsByTags}
                      selectedTags={selectedTags}
                    />
                  )}
                </ul>
              </div>
            </div>
            <div>
              {shouldRenderBlogTitle() ? (
                <h1 className="pl-3 text-2xl underline mb-3">blog posts</h1>
              ) : null}
              <ul>
                {inputValue ? (
                  <PostsForSearch
                    allMetadata={allMetadata}
                    inputValue={inputValue}
                    selectedTags={selectedTags}
                  />
                ) : (
                  <PostsForTags
                    filteredPostsByTags={filteredPostsByTags}
                    selectedTags={selectedTags}
                  />
                )}
              </ul>
            </div>
          </section>
          <section
            className="w-full md:w-1/2 self-start md:sticky md:top-16"
            data-testid="sidebar"
          >
            <h2 className="m-3 text-lg underline w-max">tags</h2>
            <div className="flex flex-col pl-3 gap-3">
              <ul className="flex flex-wrap gap-2">
                {allTags.map((filter, index) => (
                  <Pill
                    key={index}
                    selected={selectedTags.includes(filter)}
                    onClick={() => handleTagClick(filter)}
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
              >
                reset all
              </Pill>
            </div>
            <h2 className="m-3 mt-6 text-sm underline w-max">filter method</h2>
            <div className="flex flex-wrap pl-3 gap-2">
              <Pill
                selected={filterMethod === "union"}
                onClick={() => {
                  setFilterMethod("union");
                }}
              >
                union
              </Pill>
              <Pill
                selected={filterMethod === "intersection"}
                onClick={() => {
                  setFilterMethod("intersection");
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
  serverSideURL: string;
}

export function getServerSideProps(ctx: NextPageContext) {
  const protocol = ctx.req?.headers["x-forwarded-proto"] || "http";
  const serverSideURL = `${protocol}://${ctx.req?.headers.host}${ctx.req?.url}`;

  return {
    props: {
      initialSearch: ctx.query.search ?? null,
      initialTags: ctx.query.tags ?? null,
      initialMethod: ctx.query.method ?? null,
      allMetadata: fetchAllMetadata(),
      serverSideURL,
    },
  };
}
