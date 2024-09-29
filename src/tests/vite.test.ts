import { test } from "bun:test"
import path from "path"
import fse from "fs-extra"
import simpleGit from "simple-git"
import { testsPath } from "../utils/consts"

const vitePath = path.resolve(testsPath, "vite")
const viteE2ePath = path.resolve(vitePath, "e2e")
const shell = Bun.$.cwd(vitePath)
const git = simpleGit().cwd(vitePath)

const setup = async () => {
  await git.init()
  if (!(await git.status()).isClean())
    throw new Error("vite test git is not clean!")
  await git.commit("initial commit", [], { "--allow-empty": null })
  await fse.remove(viteE2ePath)
}

test("vite works", async () => {
  await setup()
  await shell`bun playwright test`
})
