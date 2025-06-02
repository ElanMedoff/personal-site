import Atropos from "atropos/react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import styles from "src/styles/icons.module.scss";
import { AtroposBorder } from "src/components/reusable/atropos/AtroposBorder";
import { AtroposImage } from "src/components/reusable/atropos/AtroposImage";
import { Skeleton } from "src/components/root/Skeleton";
import { Anchor } from "src/components/reusable/Anchor";
import { isMobileUser } from "src/utils/device";
import { generateOnScrollProps } from "src/utils/framer";

import "atropos/css";
import { cn, createClassNameWrapper } from "src/utils/style";
import { Copy } from "src/components/design-system/Copy";
import { Spacing } from "src/components/design-system/Spacing";
import { Inset } from "src/components/design-system/Inset";
import { isVisualRegressionTest } from "src/utils/env";

const fetchSrc = async (url: "sky" | "horizon" | "leaves" | "profile") => {
  const response = await fetch(`/profile/${url}.png`);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
};

const Title = createClassNameWrapper("Title", "h1", "text-6xl font-bold sm:text-8xl uppercase");

export function Profile() {
  const isMobile = isMobileUser();
  const [loading, setLoading] = useState(true);
  const [srcs, setSrcs] = useState({
    sky: "",
    horizon: "",
    leaves: "",
    profile: "",
  });
  const [hasHovered, setHasHovered] = useState(false);
  const controls = useAnimationControls();
  const refContainer = useRef(null);
  const isInView = useInView(refContainer);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [sky, horizon, leaves, profile] = await Promise.all([
          fetchSrc("sky"),
          fetchSrc("horizon"),
          fetchSrc("leaves"),
          fetchSrc("profile"),
        ]);

        setSrcs({
          sky,
          horizon,
          leaves,
          profile,
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (loading || isMobile || hasHovered || !isInView || isVisualRegressionTest()) return;

    controls.start({
      x: [null, 5, -5, 5, 0],
      transition: {
        type: "spring",
        duration: 0.4,
        repeat: 1,
        repeatDelay: 4,
        delay: 1.5,
      },
    });
  }, [controls, hasHovered, isInView, isMobile, loading]);

  const renderLoading = () => {
    return <Skeleton width={800} square />;
  };

  const renderAtropos = () => {
    const { sky, horizon, leaves, profile } = srcs;
    return (
      <motion.div
        data-testid="profile"
        animate={controls}
        onMouseMove={() => {
          controls.stop();
          setHasHovered(true);
        }}
      >
        <Atropos
          className="relative"
          innerClassName="overflow-hidden border-2 border-neutral"
          rotateXMax={20}
          rotateYMax={20}
          rotateChildren={
            <>
              <AtroposBorder.Left base={25} color="neutral" />
              <AtroposBorder.Right base={25} color="neutral" />
              <AtroposBorder.Top base={25} color="neutral" />
              <AtroposBorder.Bottom base={25} color="neutral" />
            </>
          }
        >
          <AtroposImage
            src={sky}
            alt=""
            offset={0}
            placeholderDimensions={{ width: 800, height: 800 }}
          />
          <AtroposImage
            className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
            src={horizon}
            alt=""
            offset={2}
            placeholderDimensions={{ width: 800, height: 800 }}
          />
          <AtroposImage
            className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
            src={leaves}
            alt=""
            offset={4}
            placeholderDimensions={{ width: 800, height: 800 }}
          />
          <AtroposImage
            className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
            src={profile}
            alt=""
            offset={2}
            placeholderDimensions={{ width: 800, height: 800 }}
          />
        </Atropos>
      </motion.div>
    );
  };

  return (
    <Inset horizontal="lg" vertical="md">
      <Spacing horizontal wrap="wrap-reverse" xl className={cn("max-w-7xl")}>
        <div className={cn("min-w-[300px] max-w-[450px]", "flex-1 m-auto")} ref={refContainer}>
          {loading ? renderLoading() : renderAtropos()}
        </div>
        <motion.div
          {...generateOnScrollProps}
          className="flex-1 min-w-auto sm:min-w-[400px] flex flex-col gap-6"
        >
          <div>
            <Title>hey</Title>
            <Title>there,</Title>
          </div>
          <div>
            I&apos;m{" "}
            <Copy
              base
              as="span"
              className="font-semibold underline underline-offset-4 decoration-primary decoration-4"
            >
              Elan Medoff
            </Copy>
            , a software engineer specializing in web and fullstack development.
          </div>
          <p>
            These days, I&apos;m especially interested in data fetching on the web, all the new
            approaches to server-side rendering, and tinkering with my (Neo)Vim config.
          </p>
          <p>
            I currently work at <Anchor href="https://www.wealthfront.com/">Wealthfront</Anchor> as
            a web engineer!
          </p>
          <Spacing horizontal sm>
            <a className={styles.github} href="https://github.com/elanmed" />
            <a className={styles.linkedin} href="https://www.linkedin.com/in/elan-medoff/" />
            <a className={styles.gmail} href="mailto:info@elanmed.dev" />
            <Spacing horizontal xs items="end">
              <Copy subtext>
                <span className="text-primary">[</span>
                <span>mailto</span>
                <span className="text-primary">]</span>
              </Copy>
            </Spacing>
          </Spacing>
        </motion.div>
      </Spacing>
    </Inset>
  );
}
