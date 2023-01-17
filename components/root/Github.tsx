import React, { ReactNode, useEffect, useRef, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { Repo } from "utils/githubHelpers";
import AtroposBorder from "components/reusable/atropos/AtroposBorder";
import Atropos from "atropos/react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import useIsMobile from "hooks/useIsMobile";
import {
  onScrollChildProps,
  onScrollContainerProps,
} from "utils/framerHelpers";

const CardWrapper = ({
  children,
  isMobile,
}: {
  children: ReactNode;
  isMobile: boolean;
}) => {
  if (isMobile) {
    return <>{children}</>;
  }

  return (
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
      {children}
    </Atropos>
  );
};

const RepoCard = ({ repo, index }: { repo: Repo; index: number }) => {
  const [hasHovered, setHasHovered] = useState(false);
  const isMobile = useIsMobile();
  const controls = useAnimationControls();
  const refContainer = useRef(null);
  const isInView = useInView(refContainer);

  useEffect(() => {
    if (isMobile || hasHovered || !isInView) return;

    controls.start({
      x: [null, 5, -5, 5, 0],
      transition: {
        type: "spring",
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 4,
        delay: 2,
      },
    });
  }, [controls, hasHovered, isInView, isMobile]);

  const { description, name, pushed_at, html_url, language_info } = repo;
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    // open in background tab
    window.open(html_url, "_blank");
  };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer"
      animate={index === 0 ? controls : undefined}
      onMouseMove={() => {
        controls.stop();
        setHasHovered(true);
      }}
      ref={refContainer}
    >
      <CardWrapper isMobile={isMobile}>
        <article
          className={tm(
            "min-h-[300px] bg-base-100 text-base-content px-6 py-8 flex flex-col gap-6 border-2 border-neutral",
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
                <object
                  data={`/languageIcons/${language
                    .toLowerCase()
                    .replaceAll(" ", "")}.svg`}
                  className="w-5"
                />
                {language}
              </li>
            ))}
          </ul>
        </article>
      </CardWrapper>
    </motion.div>
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
