import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Metadata } from "../utils/postHelpers";

export default function BlogCard({
  metadata,
  className,
}: {
  metadata: Metadata;
  className?: string;
}) {
  return (
    <Link href={`/blog/${metadata.slug}`}>
      <div
        className={twMerge(
          "max-w-[500px] cursor-pointer rounded-2xl flex items-center p-3 gap-3 bg-base-100",
          "border-base-100 border-2 hover:border-neutral",
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
                className="px-4 py-1 mr-1 text-xs rounded-full bg-secondary text-secondary-content"
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
