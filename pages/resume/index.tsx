import Head from "next/head";
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
      <PrinterIcon
        size={70}
        className="cursor-pointer hover:bg-base-200 rounded-full p-3"
        onClick={handleClick}
        style={{
          ...transitionProperties,
          transitionProperty: "transform, background",
        }}
      />
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
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-8 flex-wrap">
                <div className="relative h-24 w-24 rounded-full border-4 border-primary overflow-hidden">
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
                  "Next.js /pages",
                  "Next.js /app",
                  "React Query",
                  "Redux",
                  "Node.js",
                  "Deno",
                  "Git",
                ]}
              />
              <SkillsByLevel
                experience="medium"
                skills={[
                  "Bash",
                  "Lua",
                  "Ruby",
                  "Redux Toolkit",
                  "MongoDB",
                  "Prisma",
                  "Jenkins",
                ]}
              />
              <SkillsByLevel
                experience="low"
                skills={["Java", "Python", "OCaml", "Ruby on Rails"]}
              />
            </div>
          </Section>
          <Section>
            <SectionTitle>Work Experience</SectionTitle>
            <article>
              <SectionSubtitle
                iconStyles={styles.wealthfront}
                headers={[
                  {
                    title: "Senior Software Engineer (Wealthfront)",
                    timeframe: "January 2024 - present",
                    subtitle: "Web Platform Lead",
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
              <p>Oversaw quarterly web infrastructure initiatives</p>
              <Ul>
                <li>
                  Identified legacy patterns and oversaw projects for
                  improvement
                </li>
                <li>
                  Emphasized improvements that were feasible, impactful, and had
                  a clear migration path
                </li>
              </Ul>
              <p>
                Collaborated with a team of engineers, designers, and project
                managers to develop investment products
              </p>
              <Ul>
                <li>
                  Led engineering work for investment initiatives, including
                  stock movement, and redesigned marketing pages
                </li>
                <li>
                  Developed other products including bond ETF portfolios, bond
                  ladder strategies, and individual stock trading
                </li>
              </Ul>
              <p>
                Standardized data fetching patterns in the web codebase with
                React Query and custom utilities
              </p>
              <Ul>
                <li>
                  Improved the user experience with caching, retries on network
                  errors, and background data revalidation
                </li>
                <li>
                  Reduced code complexity by automatically rendering loading /
                  error indicators and minimizing null checks
                </li>
              </Ul>
              <p>Participated in other web engineering responsibilities</p>
              <Ul>
                <li>Led the weekly web platform meeting</li>
                <li>
                  Triaged, investigated, and resolved critical production issues
                  as part of the on-call rotation
                </li>
                <li>
                  Conducted interviews for prospective engineers, assessing
                  their coding and conceptual skills
                </li>
              </Ul>
            </article>
          </Section>
          <Section>
            <SectionTitle>Personal Projects</SectionTitle>
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
              <Ul>
                <li>
                  An open-source NPM library to seamlessly read and write URL
                  search params as React state
                </li>
                <li>
                  Includes options to sanitize, parse, and validate the search
                  param. Also supports server-side rendering
                </li>
              </Ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                headers={[
                  {
                    title: "use-search-param",
                    href: "https://www.npmjs.com/package/use-search-param",
                  },
                ]}
              />
              <div className="divider mb-2 -mt-2" />
              <Ul>
                <li>
                  An open-source NPM library to safely read initial state from
                  URL search params
                </li>
                <li>
                  Similar configuration to{" "}
                  <a
                    href="https://www.npmjs.com/package/use-search-param-state"
                    className="cursor-pointer underline"
                  >
                    use-search-param-state
                  </a>
                  , but with a simpler API and lighter footprint
                </li>
              </Ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                headers={[
                  {
                    title: "use-stable-reference",
                    href: "https://www.npmjs.com/package/use-stable-reference",
                  },
                ]}
              />
              <div className="divider mb-2 -mt-2" />
              <Ul>
                <li>
                  An open-source NPM library to access referentially stable,
                  up-to-date versions of non-primitives in React
                </li>
              </Ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                headers={[
                  { title: "elanmed.dev", href: "https://elanmed.dev/" },
                ]}
              />
              <div className="divider mb-2 -mt-2" />
              <Ul>
                <li>
                  A tech blog with 15+ articles. Includes topics such as:
                  programming with React, Next.js, and Typescript, customizing
                  NeoVim into a fully-fledged IDE, and setting up continuous
                  integration
                </li>
                <li>
                  Featured by several javascript newsletters, including Bytes,
                  React Newsletter, and React Digest
                </li>
                <li>
                  Built with Next.js, Typescript, Tailwind, Prisma, React Query,
                  Framer Motion, and Playwright
                </li>
              </Ul>
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

type Experience = "high" | "medium" | "low";

const skillCategorytoColor: Record<Experience, string[]> = {
  high: ["bg-secondary", "text-secondary-content"],
  medium: ["bg-accent", "text-accent-content"],
  low: ["bg-primary", "text-primary-content"],
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
                <p className="text-md md:text-xl">{subtitle}</p>
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

const Ul = createClassNameWrapper("Ul", "ul", "list-disc ml-12");

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
