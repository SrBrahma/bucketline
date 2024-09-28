import { z } from "zod"

export const getGithubData = () => {
  const githubVars = z
    .object({
      GITHUB_REF_NAME: z.string(),
      GITHUB_SHA: z.string(),
    })
    .parse(process.env)

  return {
    branchName: githubVars.GITHUB_REF_NAME,
    commitSha: githubVars.GITHUB_SHA,
  }
}
