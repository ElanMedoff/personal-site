import { readdirSync } from "fs";
import { join } from "path";

export function fetchPublicImages(category: "comics" | "books" | "movies") {
  const dir = join(process.cwd(), `public/${category}`);
  const paths = readdirSync(dir);
  return paths.filter((path) => path !== ".DS_Store");
}
