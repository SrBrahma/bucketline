import simpleGit from "simple-git"
import type { GitData } from "./data"

export const git = simpleGit()

export const getLocalGitData = async (): Promise<GitData> => {
  const branchSummary = await git.branch()
  const commitHash = await git.revparse("HEAD")

  return {
    branchName: branchSummary.current,
    commitSha: commitHash,
  }
}
