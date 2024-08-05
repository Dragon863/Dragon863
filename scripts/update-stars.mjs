// update-stars.mjs

import { Octokit } from "@octokit/core";
import { promises as fs } from "fs";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getTotalStars() {
  const username = "Dragon863";
  const response = await octokit.request('GET /users/{username}/repos', {
    username
  });

  const repos = response.data;
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  await fs.writeFile("stars.json", JSON.stringify({ totalStars }));
}

getTotalStars();
