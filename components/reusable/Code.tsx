import { twMerge as tm } from "tailwind-merge";
import React from "react";
import Highlight, { defaultProps, Language, Prism } from "prism-react-renderer";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
import github from "prism-react-renderer/themes/github";
import styles from "./Code.module.scss";

// @ts-ignore
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-vim");
require("prismjs/components/prism-lua");
require("prismjs/components/prism-bash");

export default function Code({
  code,
  language,
}: {
  code: string;
  language: Language;
}) {
  const { enabled } = useContext(ThemeContext);

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={github}
      Prism={Prism}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={tm(
            "px-6 py-1 rounded-xl overflow-x-auto my-6",
            enabled ? "bg-[#dadbe3]" : "bg-base-200",
            className
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i}>
              <div {...getLineProps({ line, key: i })} className="inline-block">
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
              {/* padding right breaks with overflow  */}
              <span className="w-6 inline-block" />
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
