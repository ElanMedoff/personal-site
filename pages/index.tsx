import Head from "next/head";
import { Profile } from "components/root/Profile";
import { Github } from "components/root/Github";
import { fetchGithubRepos, Repo } from "utils/github";
import { RecentPosts } from "components/root/RecentPosts";
import { fetchAllMetadata, Metadata } from "utils/post";
import { BannerBorder, BannerText } from "components/reusable/Banner";
import { Footer } from "components/reusable/Footer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Header } from "components/root/Header";
import { createClassNameWrapper } from "utils/style";
import { WideContent } from "components/reusable/WideContent";

const Section = createClassNameWrapper("Section", "div", "w-full");

export const collectionContainerClassNames =
  "flex flex-wrap justify-center gap-5 sm:gap-10 px-5";

export default function About({
  repos,
  allMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const description =
    "I'm Elan Medoff, a software engineer specializing in web and fullstack development. Welcome to my blog!";
  const title = "elanmed.dev";

  const npmRepoNames = [
    "use-search-param",
    "use-search-param-state",
    "use-stable-reference",
  ];
  const npmRepos = repos.filter(({ name }) => npmRepoNames.includes(name));
  const restRepose = repos.filter(({ name }) => !npmRepoNames.includes(name));

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
          <BannerText>npm packages</BannerText>
          <BannerBorder />
          <Github repos={npmRepos} />
        </Section>
        <Section>
          <BannerText>recent blog posts</BannerText>
          <BannerBorder />
          <RecentPosts allMetadata={allMetadata} />
        </Section>
        <Section>
          <BannerText reverse>github projects</BannerText>
          <BannerBorder />
          <Github repos={restRepose} />
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
