import Head from "next/head";
import { Header } from "components/root/Header";
import { twMerge as tm } from "tailwind-merge";
import { GetServerSideProps } from "next";
import { fetchPublicImages } from "utils/public";
import { Favorites } from "components/root/Favorites";
import { Footer } from "components/reusable/Footer";
import { borderClassNames } from "pages";
import { WideContent } from "components/reusable/WideContent";

export default function Bonus({ paths }: Props) {
  const title = "elanmed.dev | Bonus";
  const description = "Some of my favorites: movies, books, and comics";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://elanmed.dev/og.jpg" />
      </Head>
      <Header />
      <WideContent>
        <section className="w-full min-h-[75vh]">
          <div className="flex flex-col gap-2 mb-14">
            <h1 className={tm("text-4xl sm:text-6xl md:text-7xl", "uppercase font-bold", "text-left pl-5 sm:pl-20")}>
              Bonus:
            </h1>
            <p className={tm("text-2xl md:text-4xl text-left pl-5 sm:pl-20", borderClassNames)}>
              A few of my favorites
            </p>
          </div>
          <Favorites paths={paths} />
        </section>
      </WideContent>
      <Footer />
    </>
  );
}

interface Props {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      paths: {
        moviePaths: fetchPublicImages("movies"),
        bookPaths: fetchPublicImages("books"),
        comicPaths: fetchPublicImages("comics"),
      },
    },
  };
};
