import Head from "next/head";
import { Fragment, ReactNode } from "react";
import { BsFillCheckCircleFill as CheckIcon, BsPrinter as PrinterIcon } from "react-icons/bs";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import Image from "next/legacy/image";
import styles from "src/styles/icons.module.scss";
import { Content } from "src/components/blog/Content";
import { generateUrlPrefix } from "src/loaders/helpers";
import { cn, createClassNameWrapper, transitionProperties } from "src/utils/style";
import { Header } from "src/components/root/Header";
import { Spacing } from "src/components/design-system/Spacing";
import { Copy } from "src/components/design-system/Copy";
import { Heading } from "src/components/design-system/Heading";

export default function Resume() {
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
          transitionProperty: "background-color",
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
        <Spacing vertical lg>
          <section>
            <Spacing sm horizontal items="center" justify="between">
              <div className="flex items-center gap-4 md:gap-8 flex-wrap">
                <div className="relative h-24 w-24 rounded-full border-4 border-primary overflow-hidden">
                  <Image
                    alt="resume profile image"
                    src="/profile/profile.png"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Heading xl>Elan Medoff</Heading>
                <Spacing horizontal sm items="center">
                  <a className={styles.github} href="https://github.com/ElanMedoff" />
                  <a className={styles.linkedin} href="https://www.linkedin.com/in/elan-medoff/" />
                  <a className={styles.gmail} href="mailto:info@elanmed.dev" />
                  <Spacing horizontal xs items="end">
                    <Copy subtext>
                      <span className="text-primary">[</span>
                      <span>mailto</span>
                      <span className="text-primary">]</span>
                    </Copy>
                  </Spacing>
                  <span className="block lg:hidden">{renderPrinter()}</span>
                </Spacing>
              </div>
              <div className="hidden lg:block">{renderPrinter()}</div>
            </Spacing>
          </section>
          <Section>
            <SectionTitle>Skills</SectionTitle>
            <Spacing vertical sm>
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
                skills={["Bash", "Lua", "Ruby", "Redux Toolkit", "MongoDB", "Prisma", "Jenkins"]}
              />
              <SkillsByLevel
                experience="low"
                skills={["Java", "Python", "OCaml", "Ruby on Rails"]}
              />
            </Spacing>
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
                <li>Identified legacy patterns and oversaw projects for improvement</li>
                <li>
                  Emphasized improvements that were feasible, impactful, and had a clear migration
                  path
                </li>
              </Ul>
              <p>
                Collaborated with a team of engineers, designers, and project managers to develop
                investment products
              </p>
              <Ul>
                <li>
                  Led engineering work for investment initiatives, including stock movement, and
                  redesigned marketing pages
                </li>
                <li>
                  Developed other products including bond ETF portfolios, bond ladder strategies,
                  and individual stock trading
                </li>
              </Ul>
              <p>
                Standardized data fetching patterns in the web codebase with React Query and custom
                utilities
              </p>
              <Ul>
                <li>
                  Improved the user experience with caching, retries on network errors, and
                  background data revalidation
                </li>
                <li>
                  Reduced code complexity by automatically rendering loading / error indicators and
                  minimizing null checks
                </li>
              </Ul>
              <p>Participated in other web engineering responsibilities</p>
              <Ul>
                <li>Led the weekly web platform meeting</li>
                <li>
                  Triaged, investigated, and resolved critical production issues as part of the
                  on-call rotation
                </li>
                <li>
                  Conducted interviews for prospective engineers, assessing their coding and
                  conceptual skills
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
                  An open-source NPM library to seamlessly read and write URL search params as React
                  state
                </li>
                <li>
                  Includes options to sanitize, parse, and validate the search param. Also supports
                  server-side rendering
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
                  An open-source NPM library to safely read initial state from URL search params
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
                  An open-source NPM library to access referentially stable, up-to-date versions of
                  non-primitives in React
                </li>
              </Ul>
            </article>
            <article>
              <SectionSubtitle
                iconStyles={styles.star}
                headers={[{ title: "elanmed.dev", href: "https://elanmed.dev/" }]}
              />
              <div className="divider mb-2 -mt-2" />
              <Ul>
                <li>
                  A tech blog with 15+ articles. Includes topics such as: programming with React,
                  Next.js, and Typescript, customizing NeoVim into a fully-fledged IDE, and setting
                  up continuous integration
                </li>
                <li>
                  Featured by several javascript newsletters, including Bytes, React Newsletter, and
                  React Digest
                </li>
                <li>
                  Built with Next.js, Typescript, Tailwind, Prisma, React Query, Framer Motion, and
                  Playwright
                </li>
              </Ul>
            </article>
          </Section>
          <Section>
            <SectionTitle>Education</SectionTitle>
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
          </Section>
        </Spacing>
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

function SkillsByLevel({ experience, skills }: { experience: Experience; skills: string[] }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1 w-[98px] justify-end flex-shrink-0">
        {Array.from(
          experience === "high" ? Array(3) : experience === "medium" ? Array(2) : Array(1),
        ).map((_, index) => {
          return <CheckIcon key={index} size={30} className={cn("flex-shrink-0")} />;
        })}
      </div>
      <ul className="flex flex-wrap gap-1">
        {skills.map((skill, index) => (
          <Fragment key={index}>
            <li
              className={cn(
                "border-neutral border inline-block rounded-full px-3 text-sm ml-1 min-w-max",
                ...skillCategorytoColor[experience],
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
  return (
    <Spacing vertical md>
      {children}
    </Spacing>
  );
}
function SectionTitle({ children }: { children: ReactNode }) {
  return <Heading lg>{children}</Heading>;
}

interface Header {
  title: string;
  subtitle?: string;
  href?: string;
  timeframe?: string;
}

function SectionSubtitle({ iconStyles, headers }: { iconStyles?: string; headers: Header[] }) {
  return (
    <Spacing horizontal sm items="start">
      {iconStyles && <a className={cn(iconStyles, "shrink-0")} />}
      <Spacing vertical none className="w-full">
        {headers.map(({ title, href, subtitle, timeframe }, index) => {
          if (href) {
            return (
              <HeaderWrapper key={index} index={index}>
                <a href={href}>
                  <Spacing horizontal xs items="end" className="cursor-pointer group">
                    <Heading base underline className="font-normal">
                      {title}
                    </Heading>
                    <span
                      className={cn(
                        "rounded-full p-1 border border-transparent",
                        "group-hover:border-neutral",
                        "group-active:scale-[90%]",
                      )}
                      style={{
                        ...transitionProperties,
                        transitionProperty: "scale, border-color",
                      }}
                    >
                      <LinkIcon size={20} />
                    </span>
                  </Spacing>
                </a>
                <Timeframe>{timeframe}</Timeframe>
              </HeaderWrapper>
            );
          }

          return (
            <HeaderWrapper key={index} index={index}>
              <Spacing vertical xs>
                <Heading {...(index === 0 ? { base: true } : { sm: true })} className="font-normal">
                  {title}
                </Heading>
                <Heading sm>{subtitle}</Heading>
              </Spacing>
              <Timeframe>{timeframe}</Timeframe>
            </HeaderWrapper>
          );
        })}
      </Spacing>
    </Spacing>
  );
}

const Timeframe = createClassNameWrapper("Timeframe", "div", "hidden md:block md:text-sm ml-auto");

const Ul = createClassNameWrapper("Ul", "ul", "list-disc ml-12");

function HeaderWrapper({ index, children }: { index: number; children: ReactNode }) {
  return <div className={cn("flex", index === 0 ? "mb-4" : "")}>{children}</div>;
}
