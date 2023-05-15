import { twMerge as tm } from "tailwind-merge";
import { Metadata } from "utils/postHelpers";
import BlogCard from "components/blog/BlogCard";
import SwiperCards from "components/reusable/SwiperCards";

export default function CollectionOfPosts({
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
        <BlogCard
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
