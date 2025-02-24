import Link from "next/link";
import { Metadata } from "src/utils/post";
import { postWrapperClassNames } from "src/components/root/RecentPosts";
import { PillContainer } from "src/components/reusable/PillContainer";
import { Pill } from "src/components/reusable/Pill";
import { cn } from "src/utils/style";

export function PostCard({
  metadata,
  className,
  selectedTags,
  formattedTitle,
}: {
  metadata: Metadata;
  className?: string;
  selectedTags?: string[];
  formattedTitle?: string;
}) {
  return (
    <Link href={`/blog/${metadata.slug}`}>
      <div className={cn(postWrapperClassNames, "max-w-[500px] gap-4", className)}>
        <h2 className="font-semibold">
          {formattedTitle ? (
            <span dangerouslySetInnerHTML={{ __html: formattedTitle }} />
          ) : (
            metadata.title
          )}
        </h2>
        <div>
          <p className="text-xs italic mb-1">{metadata.lastUpdated}</p>
          <p className="text-xs">{metadata.abstract}</p>
        </div>
        <PillContainer>
          {metadata.tags.map((tag, index) => (
            <Pill
              key={index}
              className={cn(
                (selectedTags ?? []).includes(tag) && "bg-secondary text-secondary-content",
              )}
            >
              {tag}
            </Pill>
          ))}
        </PillContainer>
      </div>
    </Link>
  );
}
