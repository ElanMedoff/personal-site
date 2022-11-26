import { twMerge as tm } from "tailwind-merge";
import Link from "next/link";
import { Metadata } from "utils/postHelpers";

export default function BlogCard({
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
        className={tm(
          "max-w-[500px] cursor-pointer rounded-2xl flex flex-col p-6 gap-5 bg-base-100",
          "border border-transparent hover:border-primary",
          className
        )}
      >
        <div>
          <h2 className="font-semibold">
            {formattedTitle ? (
              <span dangerouslySetInnerHTML={{ __html: formattedTitle }} />
            ) : (
              metadata.title
            )}
          </h2>
          <p className="text-xs italic">{metadata.lastUpdated}</p>
        </div>
        <p className="text-xs">{metadata.abstract}</p>
        <ul className="flex flex-wrap gap-2">
          {metadata.tags.map((tag, index) => (
            <li
              key={index}
              className={tm(
                "px-4 py-1 text-xs rounded-full border border-neutral",
                (selectedTags ?? []).includes(tag) &&
                  "bg-secondary text-secondary-content"
              )}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
