import { motion } from "framer-motion";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import {
  onScrollChildProps,
  onScrollContainerProps,
  onScrollProps,
} from "../utils/framer";
import { Metadata } from "../utils/postHelpers";

function Post({ post }: { post: Metadata }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className={tm(
          "cursor-pointer rounded-2xl px-9 py-6 bg-base-100 h-60 duration-200 transition",
          "flex flex-col justify-between",
          "shadow-lg hover:shadow-2xl",
          "border hover:border-primary",
          "w-[300px] sm:w-[500px]",
          "hover:scale-105"
        )}
      >
        <div>
          <h2 className="mb-2 sm:mb-5 font-semibold sm:text-xl">
            {post.title}
          </h2>
          <p className="mb-2 text-xs italic">{post.lastUpdated}</p>
          <p className="mb-2 text-xs">{post.abstract}</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className={tm(
                "px-4 py-1 text-xs rounded-full border border-neutral inline-block"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function RecentPosts({ allPosts }: { allPosts: Metadata[] }) {
  const topPosts = allPosts
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, 6);

  return (
    <motion.div
      className="px-5 flex flex-col gap-20"
      {...onScrollContainerProps}
    >
      <ul
        className={tm(
          "flex justify-center flex-wrap items-center",
          "gap-5 md:gap-10"
        )}
      >
        {topPosts.map((post, index) => (
          <motion.li {...onScrollChildProps} key={index}>
            <Post post={post} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
