import { twMerge as tm } from "tailwind-merge";
import Banner from "./Banner";
import SwiperCards from "./SwiperCards";

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
    <article>
      <section className="border-2 border-neutral p-3 py-6 pr-7 rounded">
        <h3
          className={tm(
            "uppercase font-bold text-2xl mb-3 border-b-4 border-primary w-max ml-6"
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
      </section>
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
    <>
      <Banner className="bg-secondary text-secondary-content">
        Some of my favorites
      </Banner>
      <div className="mb-20 flex flex-col gap-10">
        <section
          className={tm(
            "flex justify-center flex-wrap items-center",
            "gap-10 md:gap-20"
          )}
        >
          <SwiperWrapper
            paths={moviePaths}
            dir="movies"
            title="movies"
            autoplay
          />
          <SwiperWrapper paths={bookPaths} dir="books" title="books" />
          <SwiperWrapper paths={comicPaths} dir="comics" title="comics" />
        </section>
      </div>
    </>
  );
}
