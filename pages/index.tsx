import { fetchPublicImages } from "../utils/publicHelpers";
import Profile from "../components/Profile";
import Favorites from "../components/Favorites";

export default function About({
  paths,
}: {
  paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
}) {
  return (
    <div className="flex flex-col gap-16">
      <Profile />
      <div className="divider" />
      <Favorites paths={paths} />
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
    },
  };
}
