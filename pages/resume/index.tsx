import { twMerge as tm } from "tailwind-merge";
import Content from "components/blog/Content";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { isFeatureEnabled } from "utils/featureHelpers";
import { useRouter } from "next/router";
import styles from "styles/icons.module.scss";

export default function PostPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isFeatureEnabled("resume")) {
      router.push("/");
    }
  }, []);

  if (!isFeatureEnabled("resume")) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Resume</title>
      </Head>
      <Content>
        <div className="flex flex-col gap-12 mt-8">
          <section>
            <h1 className="text-6xl font-bold">Elan Medoff</h1>
            <div className="divider my-2" />
          </section>
          <Section>
            <h2 className="text-4xl font-semibold">Skills</h2>
            <SkillsByLevel
              color="bg-green-900"
              skills={[
                "Typescript",
                "Javascript",
                "HTML",
                "CSS",
                "React",
                "Next.js",
                "React Query",
                "git",
              ]}
            />
            <SkillsByLevel
              color="bg-green-600"
              skills={[
                "Node.js",
                "Redux/Redux toolkit",
                "MongoDB",
                "OAuth",
                "Bash",
              ]}
            />
            <SkillsByLevel
              color="bg-green-300"
              skills={["Ruby", "Ruby on Rails", "Prisma", "Lua"]}
            />
          </Section>
          <Section>
            <h2 className="text-4xl font-semibold">Experience</h2>
            <article>
              <div className="flex items-end gap-8">
                <a className={tm(styles.wealthfront, "w-12 h-12")} />
                <h3 className="text-2xl">Software Engineer</h3>
                <span className="ml-auto">July 2021 - present</span>
              </div>
              <div className="divider my-2" />
              <ul className="list-disc ml-12">
                <li>
                  Worked on a cross-functional team of engineers, designers, and
                  project managers to launch products such as: investment
                  account portfolio customization, stock investment accounts,
                  and bond investment accounts
                </li>
                <li>
                  Standardized data fetching patterns in the codebase with React
                  Query and number of utility wrappers; led the migration to
                  adopt these new tools
                </li>
                <li>
                  Conducted technical interviews for prospective web engineers,
                  working through coding and conceptual questions with
                  interviewees
                </li>
                <li>
                  Participated in the web oncall rotation, working to triage a
                  variety of production bugs along with more serious
                  cross-functional issues
                </li>
              </ul>
            </article>
            <article>
              <div className="flex items-end gap-8">
                <a className={tm(styles.wealthfront, "w-12 h-12")} />
                <h3 className="text-2xl">Software Engineer Intern</h3>
                <span className="ml-auto">Summer 2020</span>
              </div>
              <div className="divider my-2" />
              <ul className="list-disc ml-12">
                <li>
                  Colloborated with designers to renew an older landing page
                  with a sophisticated page-long scrolling animation with
                  several different stages
                </li>
                <li>
                  Worked on a cross-functional team of engineers, designers, and
                  project managers to launch products such as: highlighting the
                  tax-savings benefits of Wealthfront on the investment account
                  dashboard, along with several sweepstakes events for new users
                </li>
              </ul>
            </article>
          </Section>
          <Section>
            <h2 className="text-4xl font-semibold">Education</h2>
            <article>
              <div className="flex items-end gap-8">
                <a className={tm(styles.hopkins, "w-12 h-12")} />
                <h3 className="text-2xl">Johns Hopkins University</h3>
                <span className="ml-auto">2017 - 2021</span>
              </div>
              <div className="divider my-2" />
              <ul className="ml-10">
                <li>Bachelor&apos;s degree in Computer Science (3.83)</li>
              </ul>
            </article>
          </Section>
        </div>
      </Content>
    </>
  );
}

function SkillsByLevel({ color, skills }: { color: string; skills: string[] }) {
  return (
    <div className="flex items-center">
      <span className={tm("w-8 h-8 rounded-full", color)} />
      <ul className="flex flex-wrap ml-4">
        {skills.map((skill, index) => (
          <>
            <li
              className="border-neutral border inline-block rounded-full px-3 text-sm ml-1 min-w-max"
              key={index}
            >
              {skill}
            </li>
            {index !== skills.length - 1 ? "," : ""}
          </>
        ))}
      </ul>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="flex flex-col gap-5">{children}</section>;
}
