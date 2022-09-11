import { Octokit } from "@octokit/core";

export async function fetchGithubRepos() {
  const octokit = new Octokit({
    auth: process.env.AUTH_KEY,
  });

  await octokit.request("GET /repos/ElanMedoff/neovim-config", {
    owner: "ElanMedoff",
    repo: "neovim-config",
  });
}
