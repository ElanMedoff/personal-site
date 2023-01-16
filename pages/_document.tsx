import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // makes outermost page white instead of black
    <Html data-theme="emerald">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
