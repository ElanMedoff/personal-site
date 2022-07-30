import Image from "next/image";
import cx from "classnames";
import AtroposImage from "./AtroposImage";
import AtroposBorder from "./AtroposBorder";
import styles from "../styles/icons.module.scss";
import Atropos from "atropos/react";
import curvedArrow from "../public/curvedArrow.png";
import "atropos/css";

export default function Profile() {
  return (
    <div className="">
      <main className="pt-10 flex flex-row gap-16">
        <section className={cx("max-w-[450px]", "")}>
          <Atropos
            className="relative"
            rotateXMax={25}
            rotateYMax={25}
            rotateChildren={
              <>
                <AtroposBorder.Left base={40} color="secondary" />
                <AtroposBorder.Right base={40} color="secondary" />
                <AtroposBorder.Top base={40} color="secondary" />
                <AtroposBorder.Bottom base={40} color="secondary" />
              </>
            }
          >
            <AtroposImage
              file="profile.jpeg"
              alt="profile pic"
              width={450}
              height={450}
            />
          </Atropos>
        </section>
        <section className="">
          <h1 className="text-8xl font-bold">HEY THERE,</h1>
          <p className="mt-6 text-lg">
            I'm{" "}
            <span className="font-semibold border-b-4 border-b-primary ">
              Elan
            </span>
            , a software engineer specializing in web and fullstack development.
          </p>
          <div className="mt-6 flex flex-row items-baseline gap-2 ml-[-40px]">
            {/* <CurvedArrow /> */}
            <span className="w-10">
              <Image src={curvedArrow} alt="curved arrow" />
            </span>
            <p className="text-sm italic">(Hover over the profile pic!)</p>
          </div>
        </section>
      </main>
      <article className="flex gap-4 mt-6">
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
    </div>
  );
}
