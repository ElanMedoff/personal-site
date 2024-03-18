import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge as tm } from "tailwind-merge";
import { Repo } from "utils/github";
import AtroposBorder from "components/reusable/atropos/AtroposBorder";
import Atropos from "atropos/react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useIsMobile } from "hooks/useIsMobile";
import { onScrollChildProps, onScrollContainerProps } from "utils/framer";
import { collectionContainerClassNames } from "pages";
import { PillContainer } from "components/reusable/PillContainer";
import Spacing from "components/reusable/Spacing";

function CardWrapper({
  children,
  isMobile,
}: {
  children: ReactNode;
  isMobile: boolean;
}) {
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
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
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
            "min-h-[300px] bg-base-100 text-base-content p-8 border-2 border-neutral",
            "w-[300px] sm:w-[400px]"
          )}
        >
          <Spacing vertical md>
            <p className="text-xs italic underline" data-atropos-offset={0}>
              last updated:{" "}
              {new Date(pushed_at).toLocaleDateString("en-US", {
                timeZone: "America/New_York",
              })}
            </p>
            <Spacing vertical sm data-atropos-offset={1}>
              <div className="text-2xl font-semibold">{name}</div>
              <p className="italic text-xs">{description}</p>
            </Spacing>
            <PillContainer data-atropos-offset={4}>
              {Object.keys(language_info).map((language, index) => (
                <article
                  key={index}
                  className="text-sm rounded-full px-3 py-1 border border-neutral"
                >
                  <Spacing horizontal xs>
                    <Image
                      src={`/languageIcons/${language
                        .toLowerCase()
                        .replaceAll(" ", "")}.svg`}
                      width={18}
                      height={18}
                      alt={language}
                    />
                    {language}
                  </Spacing>
                </article>
              ))}
            </PillContainer>
          </Spacing>
        </article>
      </CardWrapper>
    </motion.div>
  );
}

export function Github({ repos }: { repos: Repo[] }) {
  return (
    <motion.ul
      {...onScrollContainerProps}
      className={collectionContainerClassNames}
    >
      {repos.slice(0, 6).map((repo, index) => (
        <motion.li {...onScrollChildProps} key={index}>
          <RepoCard repo={repo} index={index} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
