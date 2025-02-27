import { readdirSync } from "fs";
import { join } from "path";

export function fetchPublicImages(category: "comics" | "books" | "movies") {
  const dir = join(process.cwd(), `public/${category}`);
  return readdirSync(dir);
}
