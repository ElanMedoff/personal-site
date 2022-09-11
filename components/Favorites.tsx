import { twMerge as tm } from "tailwind-merge";
import SwiperCards from "./SwiperCards";

export default function Favorites({
  paths,
}: {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
}) {
  const { comicPaths, bookPaths, moviePaths } = paths;

  return (
    <>
      <h1 className="text-6xl font-bold md:text-7xl">OUTSIDE OF WORK ...</h1>
      <section
        className={tm(
          "bg-neutral px-10 py-5 ",
          "flex justify-center flex-wrap gap-20 items-center",
          "lg:ml-[-5rem] lg:mr-[-5rem]",
          "w-[95%] m-auto md:w-auto"
        )}
      >
        <SwiperCards
          slides={moviePaths.map((path, index) => (
            <div key={index} className="p-1 rounded bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/movies/${path}`} alt="movie poster" className="" />
            </div>
          ))}
          className={tm("max-w-[200px]")}
        />
        <SwiperCards
          slides={bookPaths.map((path, index) => (
            <div key={index} className="p-1 rounded bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/books/${path}`} alt="book cover" />
            </div>
          ))}
          className={tm("max-w-[200px]")}
        />
        <SwiperCards
          slides={comicPaths.map((path, index) => (
            <div key={index} className="p-1 rounded bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/comics/${path}`} alt="comic cover" />
            </div>
          ))}
          className={tm("max-w-[200px]")}
        />
      </section>
    </>
  );
}
