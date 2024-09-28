import { envs } from "../envs"
import { logErrorAndExit } from "../utils"
import { getGithubData } from "./github"
import { getGitlabData } from "./gitlab"
import { getLocalGitData } from "./localGit"

export type GitData = {
  branchName: string
  commitSha: string
}

export const getGitData = async (): Promise<GitData> => {
  if (envs.CI) {
    if (envs.GITLAB_CI) return getGitlabData()
    if (envs.GITHUB_ACTIONS) return getGithubData()
    logErrorAndExit("Only GitHub and GitLab are currently supported.")
  }

  return await getLocalGitData()
}

export const gitData = await getGitData()
