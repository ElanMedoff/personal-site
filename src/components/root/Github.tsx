import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import Atropos from "atropos/react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { Repo } from "src/utils/github";
import { AtroposBorder } from "src/components/reusable/atropos/AtroposBorder";
import { isMobileUser } from "src/utils/device";
import { onScrollChildProps, onScrollContainerProps } from "src/utils/framer";
import { collectionContainerClassNames } from "src/pages";
import { PillContainer } from "src/components/reusable/PillContainer";
import { Copy } from "src/components/design-system/Copy";
import { Heading } from "src/components/design-system/Heading";
import { Spacing } from "src/components/design-system/Spacing";
import { Inset } from "src/components/design-system/Inset";
import { WrapperProps, cn } from "src/utils/style";
import { isVisualRegressionTest } from "src/utils/env";

function CardWrapper({ children, isMobile }: { children: ReactNode; isMobile: boolean }) {
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
  const isMobile = isMobileUser();
  const controls = useAnimationControls();
  const refContainer = useRef(null);
  const isInView = useInView(refContainer);

  useEffect(() => {
    if (isMobile || hasHovered || !isInView || isVisualRegressionTest()) return;

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

  const languages = Object.keys(language_info).slice(0, 4);

  return (
    <motion.div
      data-testid="root-github-repo-card"
      onClick={handleClick}
      className="cursor-pointer"
      animate={index === 0 ? controls : undefined}
      onMouseMove={() => {
        controls.stop();
        setHasHovered(true);
      }}
      ref={refContainer}
    >
      <Card isMobile={isMobile}>
        <Spacing vertical sm data-atropos-offset={0}>
          <Copy subtext italic>
            last updated:{" "}
            {new Date(pushed_at).toLocaleDateString("en-US", {
              timeZone: "America/New_York",
            })}
          </Copy>
          <Heading base>{name}</Heading>
        </Spacing>
        <Copy base data-atropos-offset={2}>
          {description}
        </Copy>
        <PillContainer data-atropos-offset={4}>
          {languages.map((language, index) => (
            <Inset
              key={index}
              horizontal="sm"
              vertical="xs"
              className="rounded-full border border-neutral"
            >
              <Spacing horizontal xs key={index} items="center">
                <Image
                  src={`/languageIcons/${language.toLowerCase().replaceAll(" ", "")}.svg`}
                  width={20}
                  height={20}
                  alt={language}
                />
                <Copy base>{language}</Copy>
              </Spacing>
            </Inset>
          ))}
        </PillContainer>
      </Card>
    </motion.div>
  );
}

function Card(props: WrapperProps & { isMobile: boolean }) {
  return (
    <CardWrapper isMobile={props.isMobile}>
      <Inset
        horizontal="lg"
        vertical="md"
        className={cn(
          "min-h-[350px]",
          "w-[300px] sm:w-[400px]",
          "bg-base-100 text-base-content border-2 border-neutral", // weird background when hovering
        )}
      >
        <Spacing vertical md>
          {props.children}
        </Spacing>
      </Inset>
    </CardWrapper>
  );
}

export function Github({ repos }: { repos: Repo[] }) {
  return (
    <motion.ul {...onScrollContainerProps} className={collectionContainerClassNames}>
      {repos.slice(0, 6).map((repo, index) => (
        <motion.li {...onScrollChildProps} key={index}>
          <RepoCard repo={repo} index={index} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
