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
import { BsLink45Deg as LinkIcon } from "react-icons/bs";

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

  const renderPrinter = () => {
    return (
      <>
        {APP_ENV === "screenshot" ? null : (
          <PrinterIcon
            size={70}
            className="cursor-pointer hover:bg-base-200 rounded-full p-3"
            onClick={handleClick}
            style={{
              ...transitionProperties,
              transitionProperty: "transform, background",
            }}
          />
        )}
      </>
    );
  };

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
        <div className="flex flex-col gap-8 md:mt-8">
          <section>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-10 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">Elan Medoff</h1>
                <div className="flex gap-4 items-center">
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
                  <span className="block lg:hidden">{renderPrinter()}</span>
                </div>
              </div>
              <div className="hidden lg:block">{renderPrinter()}</div>
            </div>
            <div className="divider my-2" />
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
                  { name: "Next.js / Next.js V13", category: "framework" },
                  { name: "React Query", category: "library" },
                  { name: "Redux", category: "library" },
                  { name: "Node.js", category: "skill" },
                  { name: "Deno", category: "skill" },
                ]}
              />
              <SkillsByLevel
                experience="medium"
                skills={[
                  { name: "Bash", category: "language" },
                  { name: "Lua", category: "language" },
                  { name: "Redux Toolkit", category: "library" },
                  { name: "MongoDB", category: "library" },
                  { name: "Prisma", category: "library" },
                  { name: "Git", category: "skill" },
                  { name: "OAuth", category: "skill" },
                ]}
              />
              <SkillsByLevel
                experience="low"
                skills={[
                  { name: "Java", category: "language" },
                  { name: "Python", category: "language" },
                  { name: "OCaml", category: "language" },
                  { name: "Ruby on Rails", category: "framework" },
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
                  Collaborated with a cross-functional team of engineers,
                  designers, and project managers to launch several flagship
                  investment products
                </li>
                <li>
                  Standardized data fetching patterns in the web codebase with
                  React Query and number of custom utilities and wrappers; led
                  the migration to adopt these new tools, improving perceived
                  data loading speed and reducing code complexity significantly
                </li>
                <li>
                  Conducted technical interviews for prospective web engineers,
                  assessing their coding and conceptual skills
                </li>
                <li>
                  Participated in the web on-call rotation, troubleshooting and
                  resolving various production issues and ensuring a
                  high-quality user experience
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
                  Renewed an older landing page with a sophisticated, page-long
                  scrolling animation with several different stages,
                  collaborating with designers to create a visually appealing
                  and interactive experience
                </li>
              </ul>
            </article>
          </Section>
          <Section>
            <SectionTitle>Personal projects</SectionTitle>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                subtitle="elanmed.dev"
                href="https://elanmed.dev/"
              />
              <div className="divider my-2" />
              <ul className="list-disc ml-10">
                <li>
                  A personal tech blog with 15+ articles on various topics such
                  as programming with React, Next.js, and Typescript,
                  customizing NeoVim into a fully-fledge IDE, and setting up
                  continuous integration
                </li>
                <li>
                  Includes OAuth with Github (manually implemented), server-side
                  data fetching with client-side optimistic updates, shareable
                  URLs with automatic scrolling, and more
                </li>
                <li>
                  Built with Next.js, Typescript, Tailwindcss, Prisma, React
                  Query, Framer Motion, and Playwright
                </li>
              </ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                subtitle="guacarina"
                href="https://guacarina.com/scales"
              />
              <div className="divider my-2" />
              <ul className="list-disc ml-10">
                <li>
                  Created an ocarina educational site with a focus on practicing
                  ocarina scales; included features such as a built-in
                  metronome, shareable URLs to resume page-state, and more
                </li>
                <li>
                  Built with Next.js v13, Typescript, Tailwindcss, and Reach UI
                  as the main technologies
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
  framework: ["bg-base-300", "text-base-content"],
  language: ["bg-info", "text-info-content"],
  library: ["bg-primary", "text-primary-content"],
  skill: ["bg-accent", "text-accent-content"],
};

function SkillsByLevel({
  experience,
  skills,
}: {
  experience: "high" | "medium" | "low";
  skills: Skill[];
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1 w-[98px] justify-end flex-shrink-0">
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
  return <h2 className="text-3xl font-semibold">{children}</h2>;
}
function SectionSubtitle({
  iconStyles,
  subtitle,
  timeframe,
  href,
}: {
  iconStyles: string;
  subtitle: string;
  timeframe?: string;
  href?: string;
}) {
  return (
    <div className="flex items-start">
      <a className={tm(iconStyles, "shrink-0")} />
      {href ? (
        <a href={href} className="ml-3">
          <div className="cursor-pointer flex items-end group">
            <h3 className="text-lg md:text-2xl underline mr-2">{subtitle}</h3>
            <span
              className={tm(
                "rounded-full p-1 border border-transparent",
                "group-hover:border-neutral",
                "group-active:scale-[90%]"
              )}
              style={{
                ...transitionProperties,
                transitionProperty: "transform",
              }}
            >
              <LinkIcon size={20} />
            </span>
          </div>
        </a>
      ) : (
        <h3 className="text-lg md:text-2xl ml-3">{subtitle}</h3>
      )}
      <span className="hidden md:block md:text-sm ml-auto">{timeframe}</span>
    </div>
  );
}
