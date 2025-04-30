import { z } from "zod";
import { readCache, updateCache } from "src/utils/cache";

const unpatchedRepoSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  pushed_at: z.coerce.date(),
  languages_url: z.string(),
  html_url: z.string(),
});

const unpatchedReposSchema = z.array(unpatchedRepoSchema);

const languageInfoSchema = z.record(z.string(), z.number());

const patchedRepoSchema = z.intersection(
  unpatchedRepoSchema,
  z.object({
    language_info: languageInfoSchema,
  }),
);
export type Repo = z.infer<typeof patchedRepoSchema>;

export async function fetchGithubRepos() {
  const cache = readCache();
  const { cachedRepos } = cache;

  if (cachedRepos && cachedRepos.expiresAt > Date.now()) {
    return cachedRepos.repos;
  }

  const response = await fetch("https://api.github.com/users/ElanMedoff/repos");
  const reposData = await response.json();
  const repos = unpatchedReposSchema.parse(reposData);

  const patchedRepos: Repo[] = [];
  for (const repo of repos) {
    const response = await fetch(repo.languages_url);
    const languageInfoData = await response.json();

    const languageInfo = languageInfoSchema.parse(languageInfoData);
    const patchedRepo = {
      ...repo,
      language_info: languageInfo,
    };

    patchedRepos.push(patchedRepoSchema.parse(patchedRepo));
  }

  patchedRepos.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  updateCache("cachedRepos", {
    repos: patchedRepos,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  });

  return patchedRepos;
}
