import { Footer } from "components/reusable/Footer";
import { MyLink } from "components/reusable/MyLink";
import Spacing from "components/reusable/Spacing";

export default function Custom404() {
  return (
    <Spacing vertical xs className="h-screen text-center">
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
    </Spacing>
  );
}
