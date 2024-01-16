import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import { Metadata } from "utils/postHelpers";
import { postWrapperClassNames } from "components/root/RecentPosts";
import { PillContainer } from "components/reusable/PillContainer";
import { Pill } from "components/reusable/Pill";

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
      <div
        className={tm(postWrapperClassNames, "max-w-[500px] gap-4", className)}
      >
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
              className={tm(
                (selectedTags ?? []).includes(tag) &&
                  "bg-secondary text-secondary-content"
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
