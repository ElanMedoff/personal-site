import { fetchPublicImages } from "../utils/publicHelpers";
import Profile from "../components/Profile";
import Favorites from "../components/Favorites";
import Github from "../components/Github";
import { fetchGithubRepos, Repo } from "../utils/githubHelpers";

export default function About({
  paths,
  repos,
}: {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
  repos: Repo[];
}) {
  return (
    <div className="flex flex-col gap-20 pt-20 items-center xl:border-x-2 xl:border-neutral max-w-[1700px] m-auto">
      <Profile />
      <Github repos={repos} />
      <Favorites paths={paths} />
      {/* spacing */}
      <div />
    </div>
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
    },
  };
}
