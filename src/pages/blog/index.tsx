import Head from "next/head";
import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { NextPageContext } from "next";
import fuzzysort from "fuzzysort";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { z } from "zod";
import { useRouter } from "next/router";
import {
  useSearchParamState as _useSearchParamState,
  UseSearchParamStateOptions,
} from "use-search-param-state";
import { Metadata, fetchAllMetadata } from "src/utils/post";
import { Content } from "src/components/blog/Content";
import { Footer } from "src/components/reusable/Footer";
import { PostsWoCollectionForSearch as PostsForSearch } from "src/components/blog/PostsForSearch";
import { PostsWoCollectionForTags as PostsForTags } from "src/components/blog/PostsForTags";
import {
  getPostsByCollection,
  getPostsWCollection,
  getPostsWoCollection,
} from "src/components/blog/helpers";
import { CollectionsForSearch } from "src/components/blog/CollectionsForSearch";
import { CollectionsForTags } from "src/components/blog/CollectionsForTags";
import { FilterTagPill } from "src/components/blog/FilterTagPill";
import { isMobileUser } from "src/utils/device";
import { Header } from "src/components/root/Header";
import { WrapperProps, cn } from "src/utils/style";
import { Copy } from "src/components/design-system/Copy";
import { Inset } from "src/components/design-system/Inset";
import { Heading } from "src/components/design-system/Heading";
import { Spacing } from "src/components/design-system/Spacing";
import { isVisualRegressionTest } from "src/utils/env";

function useSearchParamState<TVal>(
  searchParam: string,
  initialState: TVal,
  options: UseSearchParamStateOptions<TVal> = {},
) {
  const router = useRouter();

  function pushURLSearchParams(urlSearchParams: URLSearchParams) {
    const maybeQuestionmark = urlSearchParams.toString().length ? "?" : "";
    router.push(`${router.pathname}${maybeQuestionmark}${urlSearchParams.toString()}`, undefined, {
      shallow: true,
    });
  }

  function replaceURLSearchParams(urlSearchParams: URLSearchParams) {
    const maybeQuestionmark = urlSearchParams.toString().length ? "?" : "";
    router.replace(
      `${router.pathname}${maybeQuestionmark}${urlSearchParams.toString()}`,
      undefined,
      { shallow: true },
    );
  }

  return _useSearchParamState(searchParam, initialState, {
    deleteEmptySearchParam: true,
    pushURLSearchParams,
    replaceURLSearchParams,
    ...options,
  });
}

export default function Blog({ allMetadata, serverSideSearchString }: Props) {
  const allCollections = Array.from(
    new Set(
      allMetadata
        .map(({ collection }) => collection?.name)
        .filter((value: string | undefined): value is string => value !== undefined),
    ),
  );
  const allTags = Array.from(new Set(allMetadata.map(({ tags }) => tags).flat()));

  const [selectedTags, setSelectedTags] = useSearchParamState<string[]>("tags", [], {
    serverSideURLSearchParams: new URLSearchParams(serverSideSearchString),
    parse: (unparsed) => unparsed.split("_"),
    validate: (unvalidatedTags) => {
      if (!Array.isArray(unvalidatedTags)) throw new Error();
      if (unvalidatedTags.length === 0) return unvalidatedTags;

      const badTag = unvalidatedTags.find((tag) => !allTags.includes(tag));
      if (badTag) throw new Error();
      return unvalidatedTags;
    },
    stringify: (val) => val.join("_"),
    isEmptySearchParam: (searchParamVal) => searchParamVal.length === 0,
  });
  const [filterMethod, setFilterMethod] = useSearchParamState("method", "union", {
    serverSideURLSearchParams: new URLSearchParams(serverSideSearchString),
    validate: z.union([z.literal("union"), z.literal("intersection")]).parse,
  });
  const [inputValue, setInputValue] = useSearchParamState("search", "", {
    serverSideURLSearchParams: new URLSearchParams(serverSideSearchString),
    validate: z.string().parse,
  });

  const refInput = useRef<HTMLInputElement>(null);
  const isMobile = isMobileUser();
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
    if (isMobile || isVisualRegressionTest()) return;

    controls.start({
      x: [null, 5, -5, 5, 0],
      transition: {
        type: "spring",
        duration: 0.4,
        repeat: 1,
        repeatDelay: 10,
        delay: 3,
      },
    });
  }, [controls, isMobile]);

  const filteredPostsByTags =
    selectedTags.length > 0
      ? allMetadata.filter((metadata) => {
          const numOverlappingTags = metadata.tags.filter((tag) =>
            selectedTags.includes(tag),
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
          getPostsWCollection(allMetadata).map((post) => post.title),
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
          getPostsWoCollection(allMetadata).map((post) => post.title),
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
        : currTags.concat(filter),
    );
  };

  const title = "elanmed.dev | blog";
  const description = "Check out 15+ blog posts on everything from React to NeoVim to comics!";

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
                    "focus:outline-none focus:outline-neutral",
                  )}
                  value={inputValue}
                  onFocus={() => controls.stop()}
                  onChange={(e) => {
                    setSelectedTags([]);
                    setFilterMethod("union");
                    setInputValue(e.target.value);
                  }}
                />
                <SearchIcon size={20} className="inline-block absolute top-4 left-4" />
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
          <section className="w-full md:w-1/2 self-start md:sticky md:top-20" data-testid="sidebar">
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
  serverSideSearchString: string;
}

export function getServerSideProps(ctx: NextPageContext) {
  const protocol = ctx.req?.headers["x-forwarded-proto"] ?? "http";
  const serverSideURL = new URL(`${protocol}://${ctx.req?.headers.host}${ctx.req?.url}`);
  const serverSideSearchString = serverSideURL.search;

  return {
    props: {
      allMetadata: fetchAllMetadata(),
      serverSideSearchString,
    },
  };
}
