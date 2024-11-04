import Head from "next/head";
import { useEffect, useRef } from "react";
import { fetchAllMetadata, Metadata } from "utils/post";
import { Content } from "components/blog/Content";
import { motion, useAnimationControls } from "framer-motion";
import { Footer } from "components/reusable/Footer";
import { NextPageContext } from "next";
import fuzzysort from "fuzzysort";
import { PostsWoCollectionForSearch as PostsForSearch } from "components/blog/PostsForSearch";
import { PostsWoCollectionForTags as PostsForTags } from "components/blog/PostsForTags";
import {
  getPostsByCollection,
  getPostsWCollection,
  getPostsWoCollection,
} from "components/blog/helpers";
import { CollectionsForSearch } from "components/blog/CollectionsForSearch";
import { CollectionsForTags } from "components/blog/CollectionsForTags";
import { FilterTagPill } from "components/blog/FilterTagPill";
import { useIsMobile } from "hooks/useIsMobile";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { Header } from "components/root/Header";
import { z } from "zod";
import { useSearchParamState } from "use-search-param-state";
import { cn, WrapperProps } from "utils/style";
import { Copy } from "components/design-system/Copy";
import { Inset } from "components/design-system/Inset";
import { Heading } from "components/design-system/Heading";
import Spacing from "components/design-system/Spacing";

export default function Blog({ allMetadata, serverSideURL }: Props) {
  const allCollections = Array.from(
    new Set(
      allMetadata
        .map(({ collection }) => collection?.name)
        .filter(
          (value: string | undefined): value is string => value !== undefined
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
      validate: (unvalidatedTags) => {
        if (!Array.isArray(unvalidatedTags)) throw new Error();
        if (unvalidatedTags.length === 0) return unvalidatedTags;

        const badTag = unvalidatedTags.find((tag) => !allTags.includes(tag));
        if (badTag) throw new Error();
        return unvalidatedTags;
      },
      stringify: (val) => val.join("_"),
      isEmptySearchParam: (searchParamVal) => searchParamVal.length === 0,
    }
  );
  const [filterMethod, setFilterMethod] = useSearchParamState(
    "method",
    "union",
    {
      serverSideURL,
      validate: z.union([z.literal("union"), z.literal("intersection")]).parse,
    }
  );
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

  const hasCollections = () => {
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

  const hasPosts = () => {
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
        <div className="flex gap-9 md:gap-16 flex-wrap-reverse md:flex-nowrap">
          <section className="w-full md:w-1/2">
            <Spacing vertical md>
              <motion.div animate={controls} className="relative">
                <input
                  ref={refInput}
                  type="text"
                  placeholder="fuzzy search"
                  className={cn(
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
              {!hasCollections() && !hasPosts() ? (
                <Inset left="sm">
                  <Spacing vertical xs>
                    <Heading base>no results!</Heading>
                    <Copy base>try selecting a different combination</Copy>
                  </Spacing>
                </Inset>
              ) : null}
              {hasCollections() ? (
                <Spacing vertical md>
                  {<Title>collections</Title>}
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
                </Spacing>
              ) : null}
              {hasPosts() ? (
                <Spacing vertical md>
                  <Title>blog posts</Title>
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
                </Spacing>
              ) : null}
            </Spacing>
          </section>
          <section
            className="w-full md:w-1/2 self-start md:sticky md:top-20"
            data-testid="sidebar"
          >
            <Spacing vertical xl>
              <Spacing vertical sm>
                <Subtitle>tags</Subtitle>
                <Spacing vertical sm>
                  <Spacing horizontal sm wrap="wrap">
                    <ul className="flex flex-wrap gap-2">
                      {allTags.map((filter, index) => (
                        <FilterTagPill
                          key={index}
                          selected={selectedTags.includes(filter)}
                          onClick={() => handleTagClick(filter)}
                        >
                          {filter}
                        </FilterTagPill>
                      ))}
                    </ul>
                  </Spacing>
                  <div className="divider my-0" />
                  <FilterTagPill
                    onClick={() => {
                      setSelectedTags([]);
                    }}
                  >
                    reset all
                  </FilterTagPill>
                </Spacing>
              </Spacing>
              <Spacing vertical sm>
                <Subtitle>filter method</Subtitle>
                <Spacing horizontal sm>
                  <FilterTagPill
                    selected={filterMethod === "union"}
                    onClick={() => {
                      setFilterMethod("union");
                    }}
                  >
                    union
                  </FilterTagPill>
                  <FilterTagPill
                    selected={filterMethod === "intersection"}
                    onClick={() => {
                      setFilterMethod("intersection");
                    }}
                  >
                    intersection
                  </FilterTagPill>
                </Spacing>
              </Spacing>
            </Spacing>
          </section>
        </div>
      </Content>
      <Footer />
    </>
  );
}

function Title(props: WrapperProps) {
  return (
    <Inset left="lg">
      <Heading base underline>
        {props.children}
      </Heading>
    </Inset>
  );
}

function Subtitle(props: WrapperProps) {
  return (
    <Heading sm underline>
      {props.children}
    </Heading>
  );
}

interface Props {
  allMetadata: Metadata[];
  serverSideURL: string;
}

export function getServerSideProps(ctx: NextPageContext) {
  const protocol = ctx.req?.headers["x-forwarded-proto"] || "http";
  const serverSideURL = `${protocol}://${ctx.req?.headers.host}${ctx.req?.url}`;

  return {
    props: {
      allMetadata: fetchAllMetadata(),
      serverSideURL,
    },
  };
}
