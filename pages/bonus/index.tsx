import Head from "next/head";
import { Header } from "components/root/Header";
import { GetServerSideProps } from "next";
import { fetchPublicImages } from "utils/public";
import { Favorites } from "components/bonus/Favorites";
import { Footer } from "components/reusable/Footer";
import { WideContent } from "components/reusable/WideContent";
import { Heading } from "components/design-system/Heading";
import Spacing from "components/design-system/Spacing";
import { Inset } from "components/design-system/Inset";
import { BannerText, BannerBorder } from "components/reusable/Banner";

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
        <section className="w-full">
          <Inset bottom="xl" horizontal="none">
            <Spacing vertical sm>
              <BannerText>Bonus:</BannerText>
              <Inset vertical="md" horizontal="xl">
                <Heading lg className="font-normal">
                  A few of my favorites
                </Heading>
              </Inset>
            </Spacing>
            <BannerBorder />
          </Inset>
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
