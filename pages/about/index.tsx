import cx from "classnames";
import Image from "next/image";
import profile from "../../public/profile.jpeg";
import styles from "../../styles/icons.module.scss";

export default function About() {
  return (
    <div className="card max-w-[1000px] shadow-lg bg-base-200">
      <main className="card-body flex flex-row gap-16">
        <section className={cx("avatar mt-2", "hidden lg:block")}>
          <div className="min-w-[150px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image src={profile} alt="profile picture" />
          </div>
        </section>
        <section className="flex flex-col gap-5 ">
          <article className="card-title">
            <div className="flex gap-5 items-center">
              <div className="avatar mt-2 lg:hidden">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image src={profile} alt="profile picture" />
                </div>
              </div>
              <h2 className="pt-6">Hey there,</h2>
            </div>
          </article>
          <article className="text-sm md:text-base">
            <p className="mb-6">
              I'm a software engineer working in web and full-stack development.
              These days, I'm especially interested in authentication on the
              web, the (re)emergence of server-side rendering and all the new
              approaches to it, and tinkering with my Neovim config.
            </p>
            <p className="mb-6">
              I currently work at{" "}
              <a
                href="https://www.wealthfront.com/"
                className="underline text-primary"
              >
                Wealthfront
              </a>{" "}
              as a web engineer!
            </p>
            <section className="flex gap-4">
              <a
                className={styles.github}
                href="https://github.com/ElanMedoff"
              />
              <a
                className={styles.linkedin}
                href="https://www.linkedin.com/in/elan-medoff/"
              />
              <a className={styles.gmail} />
              <span className="text-secondary text-xs flex items-end ml-[-15px]">
                [mailto!]
              </span>
            </section>
          </article>
        </section>
      </main>
    </div>
  );
}
