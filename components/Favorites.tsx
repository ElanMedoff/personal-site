import { twMerge as tm } from "tailwind-merge";
import Banner from "./Banner";
import SwiperCards from "./SwiperCards";

function SwiperWrapper({
  paths,
  dir,
  title,
}: {
  paths: string[];
  dir: string;
  title: string;
}) {
  return (
    <article className="border-base-300 border-2 pr-2 py-4 rounded-lg">
      <p
        className={tm(
          "uppercase font-bold text-xl mb-3 border-b-4 border-primary w-max ml-7"
        )}
      >
        {title}
      </p>
      <SwiperCards
        slides={paths.map((path, index) => (
          <div key={index} className="p-1 rounded bg-neutral">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/${dir}/${path}`} alt={dir} className="" />
          </div>
        ))}
        className="max-w-[150px] [@media(min-width:375px)]:max-w-[200px] mx-7"
      />
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
    <div className="mb-20 flex flex-col gap-10">
      <Banner className="bg-neutral text-neutral-content">
        outside of work
      </Banner>
      <section
        className={tm("flex justify-center flex-wrap items-center gap-8")}
      >
        <SwiperWrapper paths={moviePaths} dir="movies" title="movies" />
        <SwiperWrapper paths={bookPaths} dir="books" title="books" />
        <SwiperWrapper paths={comicPaths} dir="comics" title="comics" />
      </section>
    </div>
  );
}
