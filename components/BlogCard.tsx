import cx from "classnames";
import Link from "next/link";
import { Metadata } from "../utils/postHelpers";

export default function BlogCard({ metadata }: { metadata: Metadata }) {
  return (
    <Link href={`/blog/${metadata.slug}`}>
      <div
        className={cx(
          "max-w-[700px] cursor-pointer transition rounded-2xl flex items-center p-3 gap-3",
          "border-base-100 border-2 hover:border-accent",
          "hover:bg-base-200"
        )}
      >
        <figure className="w-[200px]">
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="">
          <h2 className="card-title mb-2">{metadata.title}</h2>
          <p className="">{metadata.abstract}</p>
        </div>
      </div>
    </Link>
  );
}
