import Profile from "components/root/Profile";
import Github from "components/root/Github";
import { fetchGithubRepos, Repo } from "utils/githubHelpers";
import RecentPosts from "components/root/RecentPosts";
import { fetchAllMetadata, Metadata } from "utils/postHelpers";
import Banner from "components/root/Banner";
import { ReactNode } from "react";
import Footer from "components/reusable/Footer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Header from "components/root/Header";
import WideContent from "components/root/WideContent";

function Section({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default function About({
  repos,
  allMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const description =
    "I'm Elan Medoff, a software engineer specializing in web and fullstack development. Welcome to my blog!";
  const title = "elanmed.dev";

  const isNpmRepo = (name: string) =>
    name === "use-search-param" || name === "use-search-param-state";
  const npmRepos = repos.filter(({ name }) => isNpmRepo(name));
  const restRepose = repos.filter(({ name }) => !isNpmRepo(name));

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
          <Banner primary="npm packages" />
          <Github repos={npmRepos} />
        </Section>
        <Section>
          <Banner primary="recent blog posts" />
          <RecentPosts allMetadata={allMetadata} />
        </Section>
        <Section>
          <Banner primary="github projects" reverse />
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
