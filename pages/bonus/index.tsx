import Header from "components/root/Header";
import { twMerge as tm } from "tailwind-merge";
import { GetServerSideProps } from "next";
import { fetchPublicImages } from "utils/publicHelpers";
import Favorites from "components/root/Favorites";
import Footer from "components/reusable/Footer";
import WideContent from "components/root/WideContent";

export default function Bonus({ paths }: Props) {
  return (
    <>
      <Header />
      <WideContent>
        <section className="w-full pt-10 mb-20">
          <div className="flex flex-col gap-2 mb-14">
            <h1
              className={tm(
                "text-6xl md:text-7xl lg:text-8xl",
                "uppercase font-bold",
                "text-left pl-5 sm:pl-20"
              )}
            >
              Bonus:
            </h1>
            <p
              className={tm(
                "text-2xl md:text-4xl",
                "uppercase border-b-[15px] sm:border-b-[30px] border-primary",
                "text-left pl-5 sm:pl-20"
              )}
            >
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
