import { readCache, updateCache } from "src/utils/cache";

interface UnpatchedRepo {
  name: string;
  fork: boolean;
  description: string;
  owner: {
    avatar_url: string;
  };
  created_at: Date;
  pushed_at: Date;
  clone_url: string;
  languages_url: string;
  html_url: string;
}

export interface Repo extends UnpatchedRepo {
  language_info: Record<string, number>;
}

export async function fetchGithubRepos() {
  const cache = readCache();
  const { cachedRepos } = cache;

  if (cachedRepos && cachedRepos.expiresAt > Date.now()) {
    return cachedRepos.repos;
  }

  const response = await fetch("https://api.github.com/users/ElanMedoff/repos");
  const repos: UnpatchedRepo[] = await response.json();
  const exceptions = [
    "comics-relational-full-stack-public",
    "josh-css",
    "deno-boiler",
    "starter-dot-files",
  ];
  const filteredRepos = (Array.isArray(repos) ? repos : []).filter(
    (repo) => !repo.fork && !exceptions.includes(repo.name)
  );

  let languageInfos: Record<string, number>[] = [];
  for (let repo of filteredRepos) {
    const response = await fetch(repo.languages_url);
    const languageInfo = await response.json();
    languageInfos.push(languageInfo);
  }

  const patchedRepos: Repo[] = filteredRepos.map((repo, index) => {
    return {
      ...repo,
      language_info: languageInfos[index],
    };
  });

  patchedRepos.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );

  updateCache("cachedRepos", {
    repos: patchedRepos,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  });

  return patchedRepos;
}
