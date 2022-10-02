import React, { useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { isMobileUser, languageToIconUrl, Repo } from "../utils/githubHelpers";
import AtroposBorder from "./AtroposBorder";
import Atropos from "atropos/react";
import Banner from "./Banner";
import "atropos/css";

const RepoCard = ({ repo }: { repo: Repo }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileUser());
  }, []);

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
    <a
      // open in background tab
      onClick={(e) => {
        e.preventDefault();
        if (!isMobile) {
          window.open(html_url, "_blank");
        }
      }}
      className="cursor-pointer"
      href={isMobile ? undefined : html_url}
    >
      <Atropos
        className="relative w-max"
        rotateChildren={
          <>
            <AtroposBorder.Left base={40} color="primary" />
            <AtroposBorder.Right base={40} color="primary" />
            <AtroposBorder.Top base={40} color="primary" />
            <AtroposBorder.Bottom base={40} color="primary" />
          </>
        }
      >
        <article
          className={tm(
            "min-h-[325px] bg-base-100 text-base-content px-6 py-8 flex flex-col gap-6 border-2 border-primary",
            "w-[300px] sm:w-96"
          )}
        >
          <p className="bg-primary rounded-full text-primary-content px-3 py-1 w-max text-xs italic shadow-xl">
            last updated: {new Date(pushed_at).toLocaleDateString()}
          </p>
          <section>
            <div className="text-2xl font-semibold mb-2">{name}</div>
            <p className="italic text-xs">{description}</p>
          </section>
          <section className="flex flex-wrap gap-3">
            {Object.keys(language_info).map((language, index) => (
              <div
                className="flex gap-1 text-sm rounded-full px-3 py-1 bg-secondary text-secondary-content"
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
    </a>
  );
};

export default function Github({ repos }: { repos: Repo[] }) {
  return (
    <>
      <Banner className="bg-neutral text-neutral-content">
        github projects
      </Banner>
      <ul className="flex flex-wrap gap-10 justify-center">
        {repos.map((repo, index) => (
          <RepoCard repo={repo} key={index} />
        ))}
      </ul>
    </>
  );
}
