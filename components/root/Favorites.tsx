import { motion } from "framer-motion";
import { twMerge as tm } from "tailwind-merge";
import {
  onScrollChildProps,
  onScrollContainerProps,
} from "utils/framerHelpers";
import SwiperCards from "components/reusable/SwiperCards";

function SwiperWrapper({
  paths,
  dir,
  title,
  autoplay,
}: {
  paths: string[];
  dir: "movies" | "books" | "comics";
  title: string;
  autoplay?: boolean;
}) {
  // TODO: why doesn't this work well with next's Image?
  return (
    <article>
      <div className="border-2 border-neutral p-3 py-6 pr-7 rounded">
        <h3
          className={tm(
            "uppercase font-bold text-4xl mb-3 ml-6 underline decoration-primary decoration-8 underline-offset-4"
          )}
        >
          {title}
        </h3>
        <SwiperCards
          slides={paths.map((path, index) => {
            return (
              <div key={index} className="p-1  bg-neutral">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/${dir}/${path}`} alt={dir} />
              </div>
            );
          })}
          className="max-w-[200px] md:max-w-[300px] mx-6"
          autoplay={autoplay}
        />
      </div>
    </article>
  );
}

export default function Favorites({
  paths,
}: {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
}) {
  const { comicPaths, bookPaths, moviePaths } = paths;

  return (
    <div className="mb-5 flex flex-col gap-10">
      <section
        className={tm(
          "flex justify-center flex-wrap items-center",
          "gap-10 md:gap-20"
        )}
      >
        <SwiperWrapper paths={moviePaths} dir="movies" title="movies" />
        <SwiperWrapper paths={bookPaths} dir="books" title="books" />
        <SwiperWrapper paths={comicPaths} dir="comics" title="comics" />
      </section>
    </div>
  );
}
