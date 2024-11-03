import { Pill } from "components/reusable/Pill";
import { PillContainer } from "components/reusable/PillContainer";
import { motion } from "framer-motion";
import Link from "next/link";
import { collectionContainerClassNames } from "pages";
import { twMerge as tm } from "tailwind-merge";
import { onScrollChildProps, onScrollContainerProps } from "utils/framer";
import { Metadata } from "utils/post";
import { transitionProperties } from "utils/style";

export const postWrapperClassNames = tm(
  "cursor-pointer rounded-2xl bg-base-100 p-8",
  "flex flex-col gap-6",
  "border border-transparent hover:border-primary"
);

function RecentPostCard({ post }: { post: Metadata }) {
  console.log(post.tags);
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className={tm(
          postWrapperClassNames,
          "min-h-[250px]",
          "shadow-lg hover:shadow-2xl",
          "w-[300px] sm:w-[500px]",
          "hover:scale-105",
          "border-neutral"
        )}
        style={{
          ...transitionProperties,
          transitionProperty: "transform, border-color, box-shadow",
          transitionDuration: "200ms",
        }}
      >
        <h2 className="font-semibold sm:text-xl">{post.title}</h2>
        <div>
          <p className="text-xs italic mb-1">{post.lastUpdated}</p>
          <p className="text-xs">{post.abstract}</p>
        </div>
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
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 4);

  return (
    <motion.ul className={collectionContainerClassNames} {...onScrollContainerProps}>
      {topPosts.map((post, index) => (
        <motion.li {...onScrollChildProps} key={index}>
          <RecentPostCard post={post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
