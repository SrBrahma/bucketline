import { z } from "zod"

export const getGitlabData = () => {
  const gitlabVars = z
    .object({
      CI_COMMIT_REF_NAME: z.string(),
      CI_COMMIT_SHA: z.string(),
    })
    .parse(process.env)

  return {
    branchName: gitlabVars.CI_COMMIT_REF_NAME,
    commitSha: gitlabVars.CI_COMMIT_SHA,
  }
}
