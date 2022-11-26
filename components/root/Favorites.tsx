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
  dir: string;
  title: string;
  autoplay?: boolean;
}) {
  return (
    <motion.article {...onScrollChildProps}>
      <div className="border-2 border-neutral p-3 py-6 pr-7 rounded">
        <h3
          className={tm(
            "uppercase font-bold text-2xl mb-3 ml-6 underline decoration-primary decoration-4 underline-offset-4"
          )}
        >
          {title}
        </h3>
        <SwiperCards
          slides={paths.map((path, index) => (
            <div key={index} className="p-1  bg-neutral">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${dir}/${path}`} alt={dir} />
            </div>
          ))}
          className="max-w-[200px] md:max-w-[300px] mx-6"
          autoplay={autoplay}
        />
      </div>
    </motion.article>
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
      <motion.section
        {...onScrollContainerProps}
        className={tm(
          "flex justify-center flex-wrap items-center",
          "gap-10 md:gap-20"
        )}
      >
        <SwiperWrapper paths={moviePaths} dir="movies" title="movies" />
        <SwiperWrapper paths={bookPaths} dir="books" title="books" />
        <SwiperWrapper paths={comicPaths} dir="comics" title="comics" />
      </motion.section>
    </div>
  );
}
