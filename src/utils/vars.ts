import { z } from "zod"
import { envs } from "./envs"
import { logErrorAndExit } from "./utils"

type Vars = {
  branchName: string
  commitSha: string
}

const getVars = (): Vars => {
  if (envs.GITLAB_CI) {
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

  if (envs.GITHUB_ACTIONS) {
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

  if (envs.CI) {
    logErrorAndExit(
      "Only GitHub and GitLab are currently supported. Please file an issue.",
    )
  }

  return {
    branchName: "main",
    commitSha: "a",
  }
}

export const vars = getVars()
