import { twMerge as tm } from "tailwind-merge";
import { Metadata } from "utils/post";
import { PostCard } from "components/blog/PostCard";
import { SwiperCards } from "components/reusable/SwiperCards";

export function Collection({
  formattedTitles,
  posts,
  selectedTags,
}: {
  posts: Metadata[];
  selectedTags: string[];
  formattedTitles?: (string | undefined)[];
}) {
  return (
    <SwiperCards
      rounded
      slides={posts.map((metadata, index) => (
        <PostCard
          metadata={metadata}
          key={index}
          className="border-primary"
          selectedTags={selectedTags}
          formattedTitle={formattedTitles?.[index]}
        />
      ))}
      className={tm(
        "xs:max-w-[300px]",
        "[@media(min-width:450px)]:max-w-[400px]",
        "xl:max-w-[500px]",
        "overflow-hidden sm:overflow-visible",
        "px-8 sm:p-0"
      )}
    />
  );
}
