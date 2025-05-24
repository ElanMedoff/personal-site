import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Profile } from "src/components/root/Profile";
import { Github } from "src/components/root/Github";
import { Repo, fetchGithubRepos } from "src/utils/github";
import { RecentPosts } from "src/components/root/RecentPosts";
import { Metadata, fetchAllMetadata } from "src/utils/post";
import { BannerBorder, BannerText } from "src/components/reusable/Banner";
import { Footer } from "src/components/reusable/Footer";
import { Header } from "src/components/root/Header";
import { createClassNameWrapper } from "src/utils/style";
import { WideContent } from "src/components/reusable/WideContent";

const Section = createClassNameWrapper("Section", "div", "w-full");

export const collectionContainerClassNames = "flex flex-wrap justify-center gap-5 sm:gap-10 px-5";

export default function About({
  repos,
  allMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const description =
    "I'm Elan Medoff, a software engineer specializing in web and fullstack development. Welcome to my blog!";
  const title = "elanmed.dev";

  const libraryRepoNames = [
    "use-search-param-state",
    "use-stable-reference",
    "quickfix-preview.nvim",
    "schema-validator.nvim",
    "ft-highlight.nvim",
  ];
  const libraryRepos = repos.filter(({ name }) => libraryRepoNames.includes(name));
  const restRepos = repos.filter(({ name }) => !libraryRepoNames.includes(name));

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
        <Profile />
        <Section>
          <BannerText>open-source libraries</BannerText>
          <BannerBorder />
          <Github repos={libraryRepos} />
        </Section>
        <Section>
          <BannerText>recent blog posts</BannerText>
          <BannerBorder />
          <RecentPosts allMetadata={allMetadata} />
        </Section>
        <Section>
          <BannerText reverse>github projects</BannerText>
          <BannerBorder />
          <Github repos={restRepos} />
        </Section>
        <div />
      </WideContent>
      <Footer />
    </>
  );
}

interface Props {
  repos: Repo[];
  allMetadata: Metadata[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      repos: await fetchGithubRepos(),
      allMetadata: fetchAllMetadata(),
    },
  };
};
