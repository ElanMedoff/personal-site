import { twMerge as tm } from "tailwind-merge";
import Content from "components/blog/Content";
import Head from "next/head";
import { Fragment, ReactNode, useEffect } from "react";
import { isFeatureEnabled } from "utils/featureHelpers";
import { useRouter } from "next/router";
import styles from "styles/icons.module.scss";
import {
  BsPrinter as PrinterIcon,
  BsFillCheckCircleFill as CheckIcon,
} from "react-icons/bs";
import { generateUrlPrefix } from "loaders/helpers";
import { transitionProperties } from "utils/styleHelpers";
import getConfig from "next/config";
import Header from "components/root/Header";
import useIsMobile from "hooks/useIsMobile";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

export default function PostPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isFeatureEnabled("resume")) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFeatureEnabled("resume")) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    // open in background tab
    window.open(`${generateUrlPrefix()}/resume.pdf`, "_blank");
  };

  const description = "Check out my resumé, printable to pdf!";
  const title = "elanmed.dev | resumé";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://elanmed.dev/og.jpg" />
      </Head>
      <Header />
      <Content>
        <div className="flex flex-col gap-16 md:mt-8">
          <section>
            <div className="flex items-center">
              <h1 className="text-4xl md:text-6xl font-bold">Elan Medoff</h1>
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
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-col gap-8 md:gap-2">
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
            <SectionTitle>Experience</SectionTitle>
            <article>
              <SectionSubtitle
                iconStyles={styles.wealthfront}
                subtitle="Software Engineer (Wealthfront)"
                timeframe="July 2021 - present"
              />
              <div className="divider my-2" />
              <ul className="list-disc ml-12">
                <li>
                  Worked on a cross-functional team of engineers, designers, and
                  project managers to launch products such as: managed
                  investment account portfolio customization, self-directed
                  stock investment accounts, and managed bond investment
                  accounts
                </li>
                <li>
                  Standardized data fetching patterns in the web codebase with
                  React Query and number of custom utilities; led the migration
                  to adopt these new tools
                </li>
                <li>
                  Conducted technical interviews for prospective web engineers,
                  working through coding and conceptual questions with
                  interviewees
                </li>
                <li>
                  Participated in the web on-call rotation, working to triage a
                  variety of production bugs along with more serious
                  cross-functional issues
                </li>
              </ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.wealthfront}
                subtitle="Software Engineer Intern (Wealthfront)"
                timeframe="Summer 2020"
              />
              <div className="divider my-2" />
              <ul className="list-disc ml-12">
                <li>
                  Collaborated with designers to renew an older landing page
                  with a sophisticated page-long scrolling animation with
                  several different stages
                </li>
                <li>
                  Worked on a cross-functional team of engineers, designers, and
                  project managers to launch products such as: highlighting the
                  benefits of tax-loss harvesting (Wealthfront&apos;s automated
                  service to defer taxes) on the investment account dashboard,
                  along with several sweepstakes events for new users
                </li>
              </ul>
            </article>
          </Section>
          <Section>
            <SectionTitle>Education</SectionTitle>
            <article>
              <SectionSubtitle
                iconStyles={styles.hopkins}
                subtitle="Johns Hopkins University"
                timeframe="2017 - 2021"
              />
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
  high: "text-neutral text-neutral-content",
  medium: "text-base-300",
  low: "text-base-100",
};

function SkillsByLevel({
  experience,
  skills,
}: {
  experience: Experience;
  skills: Skill[];
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1 w-[98px] justify-end">
        {Array.from(
          experience === "high"
            ? Array(3)
            : experience === "medium"
            ? Array(2)
            : Array(1)
        ).map((_, index) => {
          return (
            <CheckIcon
              key={index}
              size={30}
              className={tm("flex-shrink-0")}
              color="bg-green-200"
            />
          );
        })}
      </div>
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
function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-4xl font-semibold">{children}</h2>;
}
function SectionSubtitle({
  iconStyles,
  subtitle,
  timeframe,
}: {
  iconStyles: string;
  subtitle: string;
  timeframe: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <a className={tm(iconStyles)} />
      <h3 className="text-lg md:text-2xl ml-3">{subtitle}</h3>
      <span className="text-xs md:text-sm ml-auto">{timeframe}</span>
    </div>
  );
}
