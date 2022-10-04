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
  let repos: UnpatchedRepo[] = [];
  try {
    const response = await fetch(
      "https://api.github.com/users/ElanMedoff/repos"
    );
    repos = await response.json();
    console.log(repos);
  } catch {}
  const exceptions = ["comics-relational-full-stack-public", "josh-css"];
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

  return patchedRepos.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );
}

export const languageToIconUrl: Record<string, string> = {
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
  SCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
  Lua: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-plain-wordmark.svg",
  Shell:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-plain.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
  "Vim Script":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-plain.svg",
};

export function isMobileUser() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator?.userAgent.match(toMatchItem);
  });
}
