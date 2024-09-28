import { beforeAll } from "bun:test"
import { cleanAllTables } from "../db/xataClient"

beforeAll(async () => {
  await cleanAllTables()
})
