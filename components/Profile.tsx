import { twMerge as tm } from "tailwind-merge";
import "atropos/css";
import AtroposImage from "./AtroposImage";
import styles from "../styles/icons.module.scss";
import Atropos from "atropos/react";

export default function Profile() {
  return (
    <div>
      <main className="flex flex-row flex-wrap-reverse pt-2 gap-12">
        <section
          className={tm("p-4 flex-1", "min-w-[350px] max-w-[450px]", "m-auto")}
        >
          <Atropos className="relative" innerClassName="overflow-hidden">
            <AtroposImage src="/profile/sky.png" alt="profile pic" offset={0} />
            <AtroposImage
              className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
              src="/profile/horizon.png"
              alt="profile pic"
              offset={2}
            />
            <AtroposImage
              className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
              src="/profile/leaves.png"
              alt="profile pic"
              offset={4}
            />
            <AtroposImage
              className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
              src="/profile/profile.png"
              alt="profile pic"
              offset={1}
            />
          </Atropos>
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
              className="link link-primary"
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
