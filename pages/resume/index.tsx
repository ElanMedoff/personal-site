import Head from "next/head";
import getConfig from "next/config";
import styles from "styles/icons.module.scss";
import { twMerge as tm } from "tailwind-merge";
import { Content } from "components/blog/Content";
import { Fragment, ReactNode, useEffect } from "react";
import { isFeatureEnabled } from "utils/feature";
import { useRouter } from "next/router";
import {
  BsPrinter as PrinterIcon,
  BsFillCheckCircleFill as CheckIcon,
} from "react-icons/bs";
import { generateUrlPrefix } from "loaders/helpers";
import { createClassNameWrapper, transitionProperties } from "utils/style";
import { Header } from "components/root/Header";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import Image from "next/image";

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
        <div
          className={tm(
            "flex flex-col gap-8",
            APP_ENV === "screenshot" ? "md:mt-10" : ""
          )}
        >
          <section>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-8 flex-wrap">
                <div className="relative h-20 w-20 rounded-full border-4 border-primary overflow-hidden">
                  <Image
                    alt="resume profile image"
                    src="/profile/profile.png"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
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
          </section>
          <Section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-col gap-8 md:gap-2">
              <SkillsByLevel
                experience="high"
                skills={[
                  "Typescript",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "React",
                  "Next.js / Next.js V13",
                  "React Query",
                  "Redux",
                  "Node.js",
                  "Deno",
                ]}
              />
              <SkillsByLevel
                experience="medium"
                skills={[
                  "Bash",
                  "Lua",
                  "Redux Toolkit",
                  "MongoDB",
                  "Prisma",
                  "Git",
                  "OAuth",
                ]}
              />
              <SkillsByLevel
                experience="low"
                skills={["Java", "Python", "OCaml", "Ruby on Rails"]}
              />
            </div>
          </Section>
          <Section>
            <SectionTitle>Experience</SectionTitle>
            <article>
              <SectionSubtitle
                iconStyles={styles.wealthfront}
                headers={[
                  {
                    title: "Senior Software Engineer (Wealthfront)",
                    timeframe: "January 2024 - present",
                    subtitle: "Lead of the Web Engineering Platform",
                  },
                  {
                    title: "Software Engineer",
                    timeframe: "January 2023 - December 2023",
                  },
                  {
                    title: "Junior Software Engineer",
                    timeframe: "July 2021 - December 2022",
                  },
                  {
                    title: "Software Engineer Intern",
                    timeframe: "Summer 2020",
                  },
                ]}
              />
              <div className="divider mb-2 mt-1" />
              <ul className="list-disc ml-12">
                <li>
                  Oversaw quarterly web infrastructure goals by orchestrating
                  the selection process and encouraging engineers to opt for
                  impactful and feasible projects
                </li>
                <li>
                  Collaborated with a cross-functional team of engineers,
                  designers, and project managers to launch several flagship
                  investment products; acted as the engineering lead for several
                  product initiatives
                </li>
                <li>
                  Standardized data fetching patterns in the web codebase with
                  React Query and number of custom utilities and wrappers; led
                  the migration to adopt these new tools, improving perceived
                  data loading speed and reducing code complexity significantly
                </li>
                <li>
                  Participated in the web on-call rotation, troubleshooting and
                  resolving various production issues and ensuring a
                  high-quality user experience
                </li>
                <li>
                  Conducted interviews for prospective engineers, assessing
                  their coding and conceptual skills
                </li>
              </ul>
            </article>
          </Section>
          <Section>
            <SectionTitle>Personal projects</SectionTitle>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                headers={[
                  {
                    title: "use-search-param-state",
                    href: "https://www.npmjs.com/package/use-search-param-state",
                  },
                ]}
              />
              <div className="divider mb-2 -mt-2" />
              <ul className="list-disc ml-10">
                <li>
                  An NPM library to safely and effortlessly read / write to URL
                  search params
                </li>
                <li>
                  Includes a variety of options to sanitize, parse, and validate
                  the search param, support server-side rendering, gracefully
                  handle errors, automatically delete empty search params, and
                  more
                </li>
                <li>
                  For a lightweight, read-only interface, see{" "}
                  <a
                    href="https://www.npmjs.com/package/use-search-param"
                    className="cursor-pointer underline"
                  >
                    use-search-param
                  </a>
                </li>
              </ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                headers={[
                  { title: "elanmed.dev", href: "https://elanmed.dev/" },
                ]}
              />
              <div className="divider mb-2 -mt-2" />
              <ul className="list-disc ml-10">
                <li>
                  A personal tech blog with 15+ articles on topics such as
                  programming with React, Next.js, and Typescript, customizing
                  NeoVim into a fully-fledged IDE, and setting up continuous
                  integration
                </li>
                <li>
                  Includes OAuth with Github (manually implemented), server-side
                  data fetching with client-side optimistic updates, shareable
                  URLs with automatic scrolling, and more
                </li>
                <li>
                  Built with Next.js, Typescript, Tailwind CSS, Prisma, React
                  Query, Framer Motion, and Playwright
                </li>
              </ul>
            </article>
          </Section>
          <Section>
            <SectionTitle>Education</SectionTitle>
            <article className="mb-10">
              <SectionSubtitle
                iconStyles={styles.hopkins}
                headers={[
                  {
                    title: "Johns Hopkins University",
                    subtitle: "Bachelor's degree in Computer Science (3.83)",
                    timeframe: "2017 - 2021",
                  },
                ]}
              />
            </article>
          </Section>
        </div>
      </Content>
    </>
  );
}

const monochromeStyles =
  APP_ENV === "screenshot" ? ["bg-base-100", "text-base-content"] : [];

type Experience = "high" | "medium" | "low";

const skillCategorytoColor: Record<Experience, string[]> = {
  high: ["bg-secondary", "text-secondary-content", ...monochromeStyles],
  medium: ["bg-accent", "text-accent-content", ...monochromeStyles],
  low: ["bg-primary", "text-primary-content", ...monochromeStyles],
};

function SkillsByLevel({
  experience,
  skills,
}: {
  experience: Experience;
  skills: string[];
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
            <CheckIcon key={index} size={30} className={tm("flex-shrink-0")} />
          );
        })}
      </div>
      <ul className="flex flex-wrap gap-1">
        {skills.map((skill, index) => (
          <Fragment key={index}>
            <li
              className={tm(
                "border-neutral border inline-block rounded-full px-3 text-sm ml-1 min-w-max",
                ...skillCategorytoColor[experience]
              )}
            >
              {skill}
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

interface Header {
  title: string;
  subtitle?: string;
  href?: string;
  timeframe?: string;
}

function SectionSubtitle({
  iconStyles,
  headers,
}: {
  iconStyles?: string;
  headers: Header[];
}) {
  return (
    <div className="flex items-start">
      {iconStyles && <a className={tm(iconStyles, "shrink-0")} />}
      <div className="flex flex-col w-full">
        {headers.map(({ title, href, subtitle, timeframe }, index) => {
          if (href) {
            return (
              <HeaderWrapper key={index} index={index}>
                <a href={href} className="ml-3">
                  <div className="cursor-pointer flex items-end group">
                    <h3 className="text-lg md:text-2xl underline mr-2">
                      {title}
                    </h3>
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
                <Timeframe>{timeframe}</Timeframe>
              </HeaderWrapper>
            );
          }
          return (
            <HeaderWrapper key={index} index={index}>
              <div className="flex flex-col ml-3 gap-1">
                <h3
                  className={tm(
                    "text-lg md:text-2xl",
                    index === 0 ? "" : "text-md md:text-lg"
                  )}
                >
                  {title}
                </h3>
                <p className="text-md md:text-lg underline underline-offset-2">
                  {subtitle}
                </p>
              </div>
              <Timeframe>{timeframe}</Timeframe>
            </HeaderWrapper>
          );
        })}
      </div>
    </div>
  );
}

const Timeframe = createClassNameWrapper(
  "Timeframe",
  "div",
  "hidden md:block md:text-sm ml-auto"
);

function HeaderWrapper({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <div className={tm("flex", index === 0 ? "mb-4" : "")}>{children}</div>
  );
}
