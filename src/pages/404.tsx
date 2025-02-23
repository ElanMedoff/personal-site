import { Footer } from "src/components/reusable/Footer";
import { MyLink } from "src/components/reusable/MyLink";

export default function Custom404() {
  return (
    <div className="flex flex-col h-screen text-center">
      <p className="text-left p-4 text-3xl">
        <span className="text-base-content">elanmed</span>
        <span className="hidden sm:inline text-primary">.dev</span>
      </p>
      <h1 className="text-9xl mt-44">404</h1>
      <p className="text-3xl">
        go <MyLink href="/">home</MyLink>
      </p>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
