const { Octokit } = require("@octokit/core");
const fs = require("fs");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getTotalStars() {
  const response = await octokit.request('GET /users/Dragon863/repos', {
    username
  });

  const repos = response.data;
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  fs.writeFileSync("stars.json", JSON.stringify({ totalStars }));
}

getTotalStars();
