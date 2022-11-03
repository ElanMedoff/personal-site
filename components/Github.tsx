import React, { useEffect } from "react";
import { twMerge as tm } from "tailwind-merge";
import { languageToIconUrl, Repo } from "../utils/githubHelpers";
import AtroposBorder from "./AtroposBorder";
import Atropos from "atropos/react";
import { motion, useAnimationControls } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import "atropos/css";
import { onScrollChildProps, onScrollContainerProps } from "../utils/framer";

const RepoCard = ({ repo, index }: { repo: Repo; index: number }) => {
  const isMobile = useIsMobile();
  const controls = useAnimationControls();

  useEffect(() => {
    if (isMobile) return;

    controls.start({
      x: [null, 5, -5, 5, 0],
      transition: {
        type: "spring",
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 4,
        delay: 1,
      },
    });
  }, [controls, isMobile]);

  const {
    // TODO: find a way to use this
    /* clone_url, */
    description,
    name,
    pushed_at,
    html_url,
    language_info,
  } = repo;

  return (
    <motion.a
      // open in background tab
      onClick={(e) => {
        e.preventDefault();
        if (!isMobile) {
          window.open(html_url, "_blank");
        }
      }}
      className="cursor-pointer"
      href={isMobile ? undefined : html_url}
      animate={index === 0 ? controls : undefined}
      onMouseMove={() => controls.stop()}
    >
      <Atropos
        rotateXMax={25}
        rotateYMax={25}
        className="relative w-max"
        highlight={false}
        rotateChildren={
          <>
            <AtroposBorder.Left base={40} color="neutral" />
            <AtroposBorder.Right base={40} color="neutral" />
            <AtroposBorder.Top base={40} color="neutral" />
            <AtroposBorder.Bottom base={40} color="neutral" />
          </>
        }
      >
        <article
          className={tm(
            "min-h-[300px] bg-base-100 text-base-content px-6 py-8 flex flex-col gap-6 border-2 border-neutral transition-all",
            "w-[300px] sm:w-[400px]"
          )}
        >
          <p
            className="rounded-full text-xs italic underline"
            data-atropos-offset={0}
          >
            last updated: {new Date(pushed_at).toLocaleDateString()}
          </p>
          <div data-atropos-offset={1}>
            <div className="text-2xl font-semibold mb-2">{name}</div>
            <p className="italic text-xs">{description}</p>
          </div>
          <ul className="flex flex-wrap gap-3" data-atropos-offset={4}>
            {Object.keys(language_info).map((language, index) => (
              <li
                className="flex gap-1 text-sm rounded-full px-3 py-1 border border-neutral"
                key={index}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={languageToIconUrl[language]}
                  className="w-5"
                  alt="language icon"
                />
                {language}
              </li>
            ))}
          </ul>
        </article>
      </Atropos>
    </motion.a>
  );
};

export default function Github({ repos }: { repos: Repo[] }) {
  return (
    <motion.ul
      {...onScrollContainerProps}
      className="flex flex-wrap gap-10 justify-center max-w-[1500px] px-5 m-auto"
    >
      {repos.map((repo, index) => (
        <motion.li {...onScrollChildProps} key={index}>
          <RepoCard repo={repo} index={index} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
