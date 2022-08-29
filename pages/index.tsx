import "atropos/css";
// import Comics from "../components/Comics";
import Profile from "../components/Profile";

export default function About() {
  return (
    <div className="flex flex-col gap-16">
      <Profile />
      {/* <p className="text-4xl font-extrabold text-center "> */}
      {/*   outside of work, I spend most of my time reading. Here's a few{" "} */}
      {/*   <span className="border-b-8 border-b-primary">series</span> I've read */}
      {/*   recently: */}
      {/* </p> */}
      {/* <p className="text-4xl font-extrabold text-center "> */}
      {/*   and a few of my favorite{" "} */}
      {/*   <span className="border-b-8 border-b-primary">comics</span>: */}
      {/* </p> */}
      {/* <Comics /> */}
      {/* <p className="text-2xl font-extrabold text-center"> */}
      {/*   {" "} */}
      {/*   these days, I'm especially interested in web authentication, the */}
      {/*   resurgence of server-side rendering, and tinkering with my Neovim */}
      {/*   config. */}
      {/* </p> */}
      {/* <p className="text-4xl font-extrabold text-center"> */}
      {/*   Check out some of recent{" "} */}
      {/*   <span className="border-b-8 border-b-primary">projects</span>: */}
      {/* </p> */}
      {/* <p className="text-4xl font-extrabold text-center"> */}
      {/*   interested in what I have to say? Check out these recent{" "} */}
      {/*   <span className="border-b-8 border-b-primary">blog posts</span>: */}
      {/* </p> */}
    </div>
  );
}
