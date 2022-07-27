import BlogCard from "../../components/BlogCard";
import { fetchAllMetadata, Metadata } from "../../utils/postHelpers";

export default function Blog({ allMetadata }: { allMetadata: Metadata[] }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl">blog posts</h1>
      </div>
      {allMetadata.map((metadata, index) => (
        <BlogCard metadata={metadata} key={index} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allMetadata: fetchAllMetadata(),
    },
  };
}
