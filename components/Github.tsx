import React, { useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { isMobileUser, languageToIconUrl, Repo } from "../utils/githubHelpers";
import AtroposBorder from "./AtroposBorder";
import Atropos from "atropos/react";
import Banner from "./Banner";
import { motion, useAnimationControls } from "framer-motion";
import "atropos/css";

const RepoCard = ({ repo, index }: { repo: Repo; index: number }) => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    setIsMobile(isMobileUser());
  }, []);

  useEffect(() => {
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
  }, [controls]);

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
      onMouseMove={index === 0 ? () => controls.stop() : undefined}
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
            "min-h-[375px] bg-base-100 text-base-content px-6 py-8 flex flex-col gap-6 border-2 border-neutral",
            "w-[300px] sm:w-[325px]"
          )}
        >
          <p
            className="rounded-full px-3 py-1 w-max text-xs italic border-2 border-neutral"
            data-atropos-offset={0}
          >
            last updated: {new Date(pushed_at).toLocaleDateString()}
          </p>
          <section data-atropos-offset={1}>
            <div className="text-2xl font-semibold mb-2">{name}</div>
            <p className="italic text-xs">{description}</p>
          </section>
          <section className="flex flex-wrap gap-3" data-atropos-offset={4}>
            {Object.keys(language_info).map((language, index) => (
              <div
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
              </div>
            ))}
          </section>
        </article>
      </Atropos>
    </motion.a>
  );
};

export default function Github({ repos }: { repos: Repo[] }) {
  return (
    <>
      <Banner className="bg-secondary text-secondary-content">
        github projects
      </Banner>
      <ul className="flex flex-wrap gap-10 justify-center">
        {repos.map((repo, index) => (
          <RepoCard repo={repo} key={index} index={index} />
        ))}
      </ul>
    </>
  );
}
