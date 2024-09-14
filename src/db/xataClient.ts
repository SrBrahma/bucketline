import { type Model, XataDialect } from "@xata.io/kysely"
import consola from "consola"
import { Kysely } from "kysely"
import { envs } from "../utils/envs"
import { vars } from "../utils/vars"
import { type DatabaseSchema, XataClient } from "./xata"

const xata = new XataClient({
  databaseURL: envs.BUCKETLINE_DB_URL,
  apiKey: envs.BUCKETLINE_DB_API_KEY,
})

export const db = new Kysely<Model<DatabaseSchema>>({
  dialect: new XataDialect({ xata }),
})

// TODO column for removed and renamed files?
export const createCommitRow = async ({ file }: { file: Blob }) => {
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
