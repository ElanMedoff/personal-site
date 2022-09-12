import { twMerge as tm } from "tailwind-merge";
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
    <article>
      <p
        className={tm(
          "uppercase font-bold text-xl m-3 border-b-4 border-primary w-max"
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
        className="max-w-[175px] [@media(min-width:400px)]:max-w-[250px]"
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
  const imageWrapperStyles = "p-1 rounded bg-neutral";
  const swiperStyles = "max-w-[175px] [@media(min-width:400px)]:max-w-[250px]";

  return (
    <>
      <section
        className={tm(
          "bg-neutral text-neutral-content px-10 py-5 ",
          "lg:ml-[-5rem] lg:mr-[-5rem]",
          "w-[95%] m-auto md:w-auto"
        )}
      >
        <h1 className="text-5xl font-bold text-center md:text-7xl">
          OUTSIDE OF WORK
        </h1>
      </section>
      <section
        className={tm("flex justify-center flex-wrap gap-20 items-center")}
      >
        <SwiperWrapper paths={moviePaths} dir="movies" title="movies" />
        <SwiperWrapper paths={bookPaths} dir="books" title="books" />
        <SwiperWrapper paths={comicPaths} dir="comics" title="comics" />
      </section>
    </>
  );
}
