import { twMerge as tm } from "tailwind-merge";
import "atropos/css";
import AtroposImage from "./AtroposImage";
import styles from "../styles/icons.module.scss";
import Atropos from "atropos/react";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const fetchSrc = async (url: "sky" | "horizon" | "leaves" | "profile") => {
  const response = await fetch(`/profile/${url}.png`);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [sky, setSky] = useState("");
  const [horizon, setHorizon] = useState("");
  const [leaves, setLeaves] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [skySrc, horizonSrc, leavesSrc, profileSrc] = await Promise.all([
          fetchSrc("sky"),
          fetchSrc("horizon"),
          fetchSrc("leaves"),
          fetchSrc("profile"),
        ]);

        setSky(skySrc);
        setHorizon(horizonSrc);
        setLeaves(leavesSrc);
        setProfile(profileSrc);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    load();
  }, []);

  const renderLoading = () => {
    return <Skeleton width={400} square />;
  };

  const renderAtropos = () => {
    return (
      <Atropos className="relative" innerClassName="overflow-hidden">
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
    );
  };

  return (
    <div>
      <main className="flex flex-row flex-wrap-reverse pt-2 gap-12">
        <section
          className={tm("p-4 flex-1", "min-w-[300px] max-w-[450px]", "m-auto")}
        >
          {loading ? renderLoading() : renderAtropos()}
          <p className="mt-8 text-sm italic text-center">
            (Hover over the profile pic!)
          </p>
        </section>
        <section className="flex-1 min-w-auto sm:min-w-[400px]">
          <h1 className="text-6xl font-bold sm:text-8xl">HEY</h1>
          <h1 className="text-6xl font-bold sm:text-8xl">THERE,</h1>
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
            <a
              href="https://www.wealthfront.com/"
              className="text-primary-focus underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
              Wealthfront
            </a>{" "}
            as a web engineer!
          </p>
          <article className="flex mt-4 gap-4">
            <a
              className={styles.github}
              style={{ color: "transparent" }}
              href="https://github.com/ElanMedoff"
            >
              github
            </a>
            <a
              className={styles.linkedin}
              href="https://www.linkedin.com/in/elan-medoff/"
              style={{ color: "transparent" }}
            >
              linkedin
            </a>
            {/* <a className={styles.gmail} /> */}
            {/* <span className="text-accent text-xs flex items-end ml-[-15px]"> */}
            {/*   [mailto] */}
            {/* </span> */}
          </article>
        </section>
      </main>
    </div>
  );
}
