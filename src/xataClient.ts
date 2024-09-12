import consola from "consola"
import { z } from "zod"
import { envs, logErrorAndExit } from "./utils"
import { XataClient } from "./xata"

const xata = new XataClient({
  databaseURL: envs.BUCKETLINE_DB_URL,
  apiKey: envs.BUCKETLINE_DB_API_KEY,
})

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

// TODO column for removed and renamed files?
export const createCommitRow = async ({ file }: { file: Blob }) => {
  const vars = getVars()

  const startCreate = Date.now()
  const x = await xata.db.commits.create({
    commitSha: vars.commitSha,
    branchName: vars.branchName,
  })

  consola.info(
    `Successfully created commit row in ${Date.now() - startCreate}ms`,
  )

  const startUpload = Date.now()

  await uploadFiles({ record: x.id, file })
  consola.info(
    `Successfully uploaded file of ${file.size}B in ${Date.now() - startUpload}ms`,
  )
}

const uploadFiles = async ({ record, file }: { record: string; file: Blob }) =>
  xata.files.upload({ table: "commits", column: "relevantFiles", record }, file)
