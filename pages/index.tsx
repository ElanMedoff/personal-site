import { fetchPublicImages } from "../utils/publicHelpers";
import { twMerge as tm } from "tailwind-merge";
import Profile from "../components/Profile";
import Favorites from "../components/Favorites";
import Github from "../components/Github";
import { fetchGithubRepos, Repo } from "../utils/githubHelpers";
import RecentPosts from "../components/RecentPosts";
import { fetchAllMetadata, Metadata } from "../utils/postHelpers";
import Banner from "../components/Banner";
import { ReactNode } from "react";
import Footer from "../components/Footer";

function Section({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default function About({
  paths,
  repos,
  allPosts,
}: {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
  repos: Repo[];
  allPosts: Metadata[];
}) {
  return (
    <>
      <div
        className={tm(
          "flex flex-col  items-center xl:border-x-2 xl:border-neutral max-w-[1700px] m-auto overflow-hidden",
          "gap-8 sm:gap-16 md:gap-32 pt-10 lg:pt-20"
        )}
      >
        <Profile />
        <Section>
          <Banner primary="recent blog posts" />
          <RecentPosts allPosts={allPosts} />
        </Section>
        <Section>
          <Banner primary="github projects" reverse />
          <Github repos={repos} />
        </Section>
        <Section>
          <Banner primary="some of my favorites" />
          <Favorites paths={paths} />
        </Section>
        <div />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      paths: {
        moviePaths: fetchPublicImages("movies"),
        bookPaths: fetchPublicImages("books"),
        comicPaths: fetchPublicImages("comics"),
      },
      repos: await fetchGithubRepos(),
      allPosts: fetchAllMetadata(),
    },
  };
}
