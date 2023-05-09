import { twMerge as tm } from "tailwind-merge";
import Content from "components/blog/Content";
import Head from "next/head";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { isFeatureEnabled } from "utils/featureHelpers";
import { useRouter } from "next/router";

export default function PostPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
        <div className="flex flex-col gap-10 mt-8">
          <h1 className="text-6xl font-bold">Elan Medoff</h1>
          <section className="flex flex-col gap-4">
            <h2 className="text-3xl">Skills</h2>
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
          </section>
          <h2 className="text-3xl">Experience</h2>
          <h2 className="text-3xl">Education</h2>
        </div>
      </Content>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-3 bg-primary"
        style={{ scaleX, transformOrigin: "0%" }}
      />
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
