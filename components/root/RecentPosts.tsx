import { Heading } from "components/design-system/Heading";
import { Pill } from "components/reusable/Pill";
import { PillContainer } from "components/reusable/PillContainer";
import Spacing from "components/design-system/Spacing";
import { Copy } from "components/design-system/Copy";
import { motion } from "framer-motion";
import Link from "next/link";
import { collectionContainerClassNames } from "pages";
import { onScrollChildProps, onScrollContainerProps } from "utils/framer";
import { Metadata } from "utils/post";
import { cn, transitionProperties } from "utils/style";

export const postWrapperClassNames = cn(
  "cursor-pointer rounded-2xl bg-base-100 p-8",
  "flex flex-col gap-6",
  "border border-transparent hover:border-primary"
);

function RecentPostCard({ post }: { post: Metadata }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className={cn(
          postWrapperClassNames,
          "min-h-[325px]",
          "w-[300px] sm:w-[500px]",
          "border-neutral",
          "shadow-lg hover:shadow-2xl",
          "hover:scale-105"
        )}
        style={{
          ...transitionProperties,
          transitionProperty: "transform, border-color, box-shadow",
          transitionDuration: "200ms",
        }}
      >
        <Spacing vertical sm>
          <Copy subtext italic>
            last updated: {post.lastUpdated}
          </Copy>
          <Heading base>{post.title}</Heading>
        </Spacing>
        <Copy base>{post.abstract}</Copy>
        <PillContainer>
          {post.tags.map((tag, index) => (
            <Pill key={index}>{tag}</Pill>
          ))}
        </PillContainer>
      </div>
    </Link>
  );
}

export function RecentPosts({ allMetadata }: { allMetadata: Metadata[] }) {
  const topPosts = allMetadata
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, 4);

  return (
    <motion.ul
      className={collectionContainerClassNames}
      {...onScrollContainerProps}
    >
      {topPosts.map((post, index) => (
        <motion.li {...onScrollChildProps} key={index}>
          <RecentPostCard post={post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
