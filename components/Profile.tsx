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
            "p-8 [@media(min-width:651px)]:p-0",
            "flex-1",
            "min-w-[300px] max-w-[400px] md:min-w-0"
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
        </section>
        <section className="flex-1">
          <h1 className="text-6xl lg:text-8xl font-bold">HEY THERE,</h1>
          <p className="mt-6 text-lg">
            I'm{" "}
            <span className="font-semibold border-b-4 border-b-primary ">
              Elan
            </span>
            , a software engineer specializing in web and fullstack development.
          </p>
          <article className="flex gap-4 mt-4">
            <a className={styles.github} href="https://github.com/ElanMedoff" />
            <a
              className={styles.linkedin}
              href="https://www.linkedin.com/in/elan-medoff/"
            />
            <a className={styles.gmail} />
            <span className="text-accent text-xs flex items-end ml-[-15px]">
              [mailto]
            </span>
          </article>
          <p className="text-sm italic mt-8">(Hover over the profile pic!)</p>
        </section>
      </main>
    </div>
  );
}
