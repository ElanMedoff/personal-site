import cx from "classnames";
import Link from "next/link";
import { Metadata } from "../utils/postHelpers";

export default function BlogCard({ metadata }: { metadata: Metadata }) {
  return (
    <Link href={`/blog/${metadata.slug}`}>
      <div
        className={cx(
          "max-w-[500px] cursor-pointer rounded-2xl flex items-center p-3 gap-3",
          "border-base-100 border-2 hover:border-secondary",
          "hover:bg-base-200"
        )}
      >
        <div className="">
          <h2 className="font-semibold mb-1">{metadata.title}</h2>
          <p className="text-xs text-secondary italic mb-2">
            {metadata.publishedOn}
          </p>
          <p className="text-xs mb-2">{metadata.abstract}</p>
          <div>
            {metadata.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-accent text-accent-content rounded-full px-4 py-1 text-xs mr-1"
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
