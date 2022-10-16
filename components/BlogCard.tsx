import { twMerge as tm } from "tailwind-merge";
import Link from "next/link";
import { Metadata } from "../utils/postHelpers";

export default function BlogCard({
  metadata,
  className,
  selectedTags,
}: {
  metadata: Metadata;
  className?: string;
  selectedTags?: string[];
}) {
  return (
    <Link href={`/blog/${metadata.slug}`}>
      <div
        className={tm(
          "max-w-[500px] cursor-pointer rounded-2xl flex items-center p-6 gap-3 bg-base-100",
          "border-base-100 border-2 hover:border-primary hover:shadow-xl transition",
          className
        )}
      >
        <div>
          <h2 className="mb-1 font-semibold">{metadata.title}</h2>
          <p className="mb-2 text-xs italic">{metadata.lastUpdated}</p>
          <p className="mb-2 text-xs">{metadata.abstract}</p>
          <div>
            {metadata.tags.map((tag, index) => (
              <span
                key={index}
                className={tm(
                  "px-4 py-1 mr-1 text-xs rounded-full border border-neutral",
                  (selectedTags ?? []).includes(tag) &&
                    "bg-secondary text-secondary-content"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
