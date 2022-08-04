import cx from "classnames";
import AtroposImage from "./AtroposImage";
import styles from "../styles/icons.module.scss";
import Atropos from "atropos/react";

export default function Profile() {
  return (
    <div className="">
      <main className="pt-2 lg:pt-10 flex flex-row flex-wrap-reverse gap-12 lg:gap-16">
        <section
          className={cx(
            "p-4 flex-1",
            "min-w-[300px] max-w-[450px]",
            "m-auto md:m-0"
          )}
        >
          <Atropos className="relative" innerClassName="overflow-hidden">
            <AtroposImage file="sky.png" alt="profile pic" offset={0} />
            <AtroposImage
              className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
              file="horizon.png"
              alt="profile pic"
              offset={2}
            />
            <AtroposImage
              className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
              file="leaves.png"
              alt="profile pic"
              offset={4}
            />
            <AtroposImage
              className="absolute top-[-5%] left-[-5%] w-[110%] max-w-none"
              file="profile.png"
              alt="profile pic"
              offset={1}
            />
          </Atropos>
          <p className="text-sm italic mt-8 text-center">
            (Hover over the profile pic!)
          </p>
        </section>
        <section className="flex-1 min-w-auto sm:min-w-[400px]">
          <h1 className="text-6xl md:text-8xl font-bold">HEY</h1>
          <h1 className="text-6xl md:text-8xl font-bold">THERE,</h1>
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
              className="underline text-primary"
            >
              Wealthfront
            </a>
            <span className="text-secondary text-xs"> [external link] </span>
            as a web engineer!
          </p>
          <article className="flex gap-4 mt-4">
            <a className={styles.github} href="https://github.com/ElanMedoff" />
            <a
              className={styles.linkedin}
              href="https://www.linkedin.com/in/elan-medoff/"
            />
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
