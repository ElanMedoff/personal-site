import Link from "next/link";
import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";
import Banner from "./Banner";
import SwiperCards from "./SwiperCards";

function SwiperWrapper({
  paths,
  dir,
  title,
  children,
  reverse,
}: {
  paths: string[];
  dir: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <article
      className={tm(
        "border-primary border-2 pr-6 py-8 rounded-lg",
        "flex gap-14 shadow-2xl flex-wrap flex-wrap-reverse justify-center",
        reverse && "flex-row-reverse pl-6 gap-8"
      )}
    >
      <section>
        <SwiperCards
          slides={paths.map((path, index) => (
            <div key={index} className="p-1 rounded bg-neutral">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${dir}/${path}`} alt={dir} className="" />
            </div>
          ))}
          className="max-w-[150px] [@media(min-width:375px)]:max-w-[200px] mx-7"
        />
      </section>
      <section>
        <h3
          className={tm(
            "uppercase font-bold text-2xl mb-3 border-b-4 border-primary w-max"
          )}
        >
          {title}
        </h3>
        <p
          className={tm(
            " max-w-[250px] bg-secondary text-secondary-content h-min p-7 text-lg"
          )}
        >
          {children}
        </p>
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
    <div className="mb-20 flex flex-col gap-10">
      <Banner className="bg-neutral text-neutral-content">
        outside of work
      </Banner>
      <section
        className={tm("flex justify-center flex-wrap items-center gap-8")}
      >
        <SwiperWrapper paths={moviePaths} dir="movies" title="movies">
          Fun fact: aside from my computer science degree, I also managed to
          squeeze in a film minor (JHU 21').
        </SwiperWrapper>
        <SwiperWrapper paths={bookPaths} dir="books" title="books" reverse>
          I'm a little too exclusive about the novels I read – only
          medieval-style fantasy!
        </SwiperWrapper>
        <SwiperWrapper paths={comicPaths} dir="comics" title="comics">
          It's can be pretty difficult to narrow down your favorite comic runs
          when you've read{" "}
          <span className="underline underline-offset-2 hover:underline-offset-4 transition-all text-primary-focus">
            <Link href="blog/lessons-from-reading-a-thousand-comics">
              1000+
            </Link>{" "}
          </span>
          issues
        </SwiperWrapper>
      </section>
    </div>
  );
}
