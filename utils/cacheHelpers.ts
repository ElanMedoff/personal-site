import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Repo } from "utils/githubHelpers";

const path = join(process.cwd(), "cache/data.json");

interface Cache {
  cachedRepos?: {
    repos: Repo[];
    expiresAt: number;
  };
}

const createOrCleanCache = () => {
  if (!existsSync(path)) {
    writeFileSync(path, "{}");
    return;
  }

  if (readFileSync(path).toString() === "") {
    writeFileSync(path, "{}");
    return;
  }
};

export const updateCache = (key: keyof Cache, value: Cache[keyof Cache]) => {
  createOrCleanCache();

  const currCache: Cache = JSON.parse(readFileSync(path).toString());
  currCache[key] = value;
  writeFileSync(path, JSON.stringify(currCache));
};

export const readCache = () => {
  createOrCleanCache();

  const cache: Cache = JSON.parse(readFileSync(path).toString());
  return cache;
};
