import { twMerge as tm } from "tailwind-merge";
import Content from "components/blog/Content";
import Head from "next/head";
import { Fragment, ReactNode, useEffect } from "react";
import { isFeatureEnabled } from "utils/featureHelpers";
import { useRouter } from "next/router";
import styles from "styles/icons.module.scss";
import { BsPrinter as PrinterIcon } from "react-icons/bs";
import { generateUrlPrefix } from "loaders/helpers";
import { transitionProperties } from "utils/styleHelpers";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

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

  const handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    // open in background tab
    window.open(`${generateUrlPrefix()}/resume.pdf`, "_blank");
  };

  return (
    <>
      <Head>
        <title>Resume</title>
      </Head>
      <Content>
        <div className="flex flex-col gap-16 mt-8">
          <section>
            <div className="flex items-center">
              <h1 className="text-6xl font-bold">Elan Medoff</h1>
              {APP_ENV === "screenshot" ? null : (
                <PrinterIcon
                  size={70}
                  className="ml-auto cursor-pointer hover:bg-base-200 rounded-full p-3"
                  onClick={handleClick}
                  style={{
                    ...transitionProperties,
                    transitionProperty: "transform, background",
                  }}
                />
              )}
            </div>
            <div className="divider my-2" />
            <div className="flex mt-4 gap-4">
              <a
                className={styles.github}
                href="https://github.com/ElanMedoff"
              />
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
            </div>
          </section>
          <Section>
            <h2 className="text-4xl font-semibold">Skills</h2>
            <div className="flex flex-col gap-2">
              <SkillsByLevel
                experience="high"
                skills={[
                  { name: "Typescript", category: "language" },
                  { name: "Javascript", category: "language" },
                  { name: "HTML", category: "language" },
                  { name: "CSS", category: "language" },
                  { name: "React", category: "framework" },
                  { name: "Next.js", category: "framework" },
                  { name: "React Query", category: "library" },
                  { name: "git", category: "skill" },
                ]}
              />
              <SkillsByLevel
                experience="medium"
                skills={[
                  { name: "Bash", category: "language" },
                  { name: "Redux/Redux toolkit", category: "library" },
                  { name: "MongoDB", category: "library" },
                  { name: "Node.js", category: "skill" },
                  { name: "OAuth", category: "skill" },
                ]}
              />
              <SkillsByLevel
                experience="low"
                skills={[
                  { name: "Ruby", category: "language" },
                  { name: "Lua", category: "language" },
                  { name: "Ruby on Rails", category: "framework" },
                  { name: "Prisma", category: "library" },
                ]}
              />
            </div>
          </Section>
          <Section>
            <h2 className="text-4xl font-semibold">Experience</h2>
            <article>
              <div className="flex items-center gap-4">
                <a className={tm(styles.wealthfront)} />
                <h3 className="text-2xl ml-3">Software Engineer</h3>
                <span className="text-sm ml-auto">July 2021 - present</span>
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
              <div className="flex items-center gap-4">
                <a className={tm(styles.wealthfront)} />
                <h3 className="text-2xl ml-3">Software Engineer Intern</h3>
                <span className="text-sm ml-auto">Summer 2020</span>
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
                  benefits of tax-loss harvesting on the investment account
                  dashboard, and several sweepstakes events for new users
                </li>
              </ul>
            </article>
          </Section>
          <Section>
            <h2 className="text-4xl font-semibold">Education</h2>
            <article>
              <div className="flex items-center gap-4">
                <a className={tm(styles.hopkins)} />
                <h3 className="text-2xl ml-3">Johns Hopkins University</h3>
                <span className="text-sm ml-auto">2017 - 2021</span>
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

interface Skill {
  name: string;
  category: "language" | "framework" | "library" | "skill";
}

const skillCategorytoColor: Record<Skill["category"], string[]> = {
  framework: ["bg-success", "text-success-content"],
  language: ["bg-info", "text-info-content"],
  library: ["bg-warning", "text-warning-content"],
  skill: ["bg-error", "text-error-content"],
};

type Experience = "high" | "medium" | "low";
const experienceToColor: Record<Experience, string> = {
  high: "bg-neutral",
  medium: "bg-base-300",
  low: "bg-base-100",
};

function SkillsByLevel({
  experience,
  skills,
}: {
  experience: Experience;
  skills: Skill[];
}) {
  return (
    <div className="flex items-center gap-6">
      <span
        className={tm(
          "w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full border-4 border-netural",
          experienceToColor[experience]
        )}
      />
      <ul className="flex flex-wrap gap-1">
        {skills.map((skill, index) => (
          <Fragment key={index}>
            <li
              className={tm(
                "border-neutral border inline-block rounded-full px-3 text-sm ml-1 min-w-max",
                ...skillCategorytoColor[skill.category]
              )}
            >
              {skill.name}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="flex flex-col gap-6">{children}</section>;
}
