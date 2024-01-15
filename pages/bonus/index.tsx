import Content from "components/blog/Content";
import Header from "components/root/Header";
import { motion } from "framer-motion";
import {
  onScrollChildProps,
  onScrollContainerProps,
} from "utils/framerHelpers";
import { twMerge as tm } from "tailwind-merge";
import SwiperCards from "components/reusable/SwiperCards";
import { GetServerSideProps } from "next";
import { fetchPublicImages } from "utils/publicHelpers";
import { ReactNode } from "react";
import Favorites, { SwiperWrapper } from "components/root/Favorites";

// function SwiperWrapperAlt({
//   paths,
//   dir,
//   autoplay,
// }: {
//   paths: string[];
//   dir: "movies" | "books" | "comics";
//   autoplay?: boolean;
// }) {
//   return (
//     <motion.article {...onScrollChildProps}>
//       <div className="border-2 border-neutral p-3 py-6 pr-7 rounded">
//         <SwiperCards
//           slides={paths.map((path, index) => {
//             return (
//               <div key={index} className="p-1  bg-neutral">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img src={`/${dir}/${path}`} alt={dir} />
//               </div>
//             );
//           })}
//           className="max-w-[200px] md:max-w-[300px] mx-6"
//           autoplay={autoplay}
//         />
//       </div>
//     </motion.article>
//   );
// }
//
// function Title({ children }: { children: ReactNode }) {
//   return (
//     <h3
//       className={tm(
//         "uppercase font-bold text-8xl mt-16 underline decoration-primary decoration-[16px] underline-offset-4"
//       )}
//     >
//       {children}
//     </h3>
//   );
// }

// function FavoritesAlt({
//   paths,
// }: {
//   paths: { comicPaths: string[]; bookPaths: string[]; moviePaths: string[] };
// }) {
//   const { comicPaths, bookPaths, moviePaths } = paths;
//
//   return (
//     <div className="mb-5 flex flex-col gap-10">
//       <section
//         className={tm(
//           "flex justify-center flex-wrap items-center",
//           "gap-10 md:gap-20"
//         )}
//       >
//         <div className="flex justify-around w-full">
//           <SwiperWrapper paths={moviePaths} dir="movies" />
//           <Title>movies</Title>
//         </div>
//         <div className="flex justify-around w-full">
//           <Title>books</Title>
//           <SwiperWrapper paths={bookPaths} dir="books" />
//         </div>
//         <div className="flex justify-around w-full">
//           <SwiperWrapper paths={comicPaths} dir="comics" />
//           <Title>comics</Title>
//         </div>
//       </section>
//     </div>
//   );
// }

export default function Bonus({ paths }: Props) {
  return (
    <>
      <Header />
      <Content>
        <section className="md:text-justify">
          <h1 className="text-6xl font-bold sm:text-8xl uppercase">Bonus:</h1>
          <p className="text-4xl uppercase">A few of my favorites</p>
          <div className="divider my-2 mb-20" />
          <Favorites paths={paths} />
        </section>
      </Content>
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
