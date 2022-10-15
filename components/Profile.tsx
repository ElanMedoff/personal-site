import { twMerge as tm } from "tailwind-merge";
import "atropos/css";
import AtroposImage from "./AtroposImage";
import styles from "../styles/icons.module.scss";
import Atropos from "atropos/react";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Skeleton from "./Skeleton";
import Anchor from "./reusable/Anchor";
import useIsMobile from "../hooks/useIsMobile";

const fetchSrc = async (url: "sky" | "horizon" | "leaves" | "profile") => {
  const response = await fetch(`/profile/${url}.png`);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
};

export default function Profile() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [srcs, setSrcs] = useState({
    sky: "",
    horizon: "",
    leaves: "",
    profile: "",
  });
  const controls = useAnimationControls();

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
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (loading || isMobile) return;

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
  }, [controls, isMobile, loading]);

  const renderLoading = () => {
    return <Skeleton width={451} square />;
  };

  const renderAtropos = () => {
    const { sky, horizon, leaves, profile } = srcs;
    return (
      <motion.div animate={controls} onMouseMove={() => controls.stop()}>
        <Atropos
          className="relative"
          innerClassName="overflow-hidden border-2 border-neutral"
          rotateXMax={20}
          rotateYMax={20}
        >
          <AtroposImage src={sky} alt="profile pic" offset={0} />
          <AtroposImage
            className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
            src={horizon}
            alt="profile pic"
            offset={2}
          />
          <AtroposImage
            className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
            src={leaves}
            alt="profile pic"
            offset={4}
          />
          <AtroposImage
            className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
            src={profile}
            alt="profile pic"
            offset={2}
          />
        </Atropos>
      </motion.div>
    );
  };

  return (
    <main
      className={tm(
        "flex flex-row flex-wrap-reverse gap-12 max-w-7xl p-10 mb-20"
      )}
    >
      <section className={tm("min-w-[300px] max-w-[450px]", "flex-1 m-auto")}>
        {loading ? renderLoading() : renderAtropos()}
      </section>
      <section className="flex-1 min-w-auto sm:min-w-[400px]">
        <h1 className="text-6xl font-bold sm:text-8xl uppercase">hey</h1>
        <h1 className="text-6xl font-bold sm:text-8xl uppercase">there,</h1>
        <p className="mt-6 text-lg">
          I&apos;m{" "}
          <span className="font-semibold border-b-4 border-b-primary ">
            Elan Medoff
          </span>
          , a software engineer specializing in web and fullstack development.
        </p>
        <p className="mt-6">
          These days, I&apos;m especially interested in authentication on the
          web, the (re)emergence of server-side rendering and all the new
          approaches to it, and tinkering with my Neovim config.
        </p>
        <p className="mt-6">
          I currently work at{" "}
          <Anchor href="https://www.wealthfront.com/">Wealthfront</Anchor> as a
          web engineer!
        </p>
        <article className="flex mt-4 gap-4">
          <a className={styles.github} href="https://github.com/ElanMedoff" />
          <a
            className={styles.linkedin}
            href="https://www.linkedin.com/in/elan-medoff/"
          />
          <a className={styles.gmail} href="mailto:info@elanmed.dev" />
          <span className="text-xs flex items-end ml-[-10px]">
            <span className="text-primary">[</span>
            mailto
            <span className="text-primary">]</span>
          </span>
        </article>
      </section>
    </main>
  );
}
