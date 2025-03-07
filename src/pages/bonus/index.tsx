import Head from "next/head";
import { GetServerSideProps } from "next";
import { Header } from "src/components/root/Header";
import { fetchPublicImages } from "src/utils/public";
import { Favorites } from "src/components/bonus/Favorites";
import { Footer } from "src/components/reusable/Footer";
import { WideContent } from "src/components/reusable/WideContent";
import { Heading } from "src/components/design-system/Heading";
import { Spacing } from "src/components/design-system/Spacing";
import { Inset } from "src/components/design-system/Inset";
import { BannerBorder, BannerText } from "src/components/reusable/Banner";

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
