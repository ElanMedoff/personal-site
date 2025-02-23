import { Metadata } from "src/utils/post";
import { PostCard } from "src/components/blog/PostCard";
import { SwiperCards } from "src/components/reusable/SwiperCards";
import { cn } from "src/utils/style";

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
      className={cn(
        "xs:max-w-[300px]",
        "[@media(min-width:450px)]:max-w-[400px]",
        "xl:max-w-[500px]",
        "overflow-hidden sm:overflow-visible",
        "px-8 sm:p-0",
        "overflow-hidden"
      )}
    />
  );
}
