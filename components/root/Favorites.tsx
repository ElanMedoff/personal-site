import { twMerge as tm } from "tailwind-merge";
import { SwiperCards } from "components/reusable/SwiperCards";
import { onScrollChildProps, onScrollContainerProps } from "utils/framer";
import { motion } from "framer-motion";
import Spacing from "components/reusable/Spacing";

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
  return (
    <motion.article {...onScrollChildProps}>
      <div className="border-2 border-neutral py-6 pl-3 pr-12 rounded">
        <h3
          className={tm("uppercase font-bold text-2xl md:text-4xl mb-3 ml-3")}
        >
          {title}
        </h3>
        <SwiperCards
          slides={paths.map((path, index) => {
            return (
              <div key={index} className="p-1 bg-neutral">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/${dir}/${path}`} alt={dir} />
              </div>
            );
          })}
          className="max-w-[200px] md:max-w-[300px]"
          autoplay={autoplay}
        />
      </div>
    </motion.article>
  );
}

export function Favorites({
  paths,
}: {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
}) {
  const { comicPaths, bookPaths, moviePaths } = paths;

  return (
    <Spacing vertical lg className="mb-5">
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
    </Spacing>
  );
}
