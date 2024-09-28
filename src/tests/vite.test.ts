import { test } from "bun:test"
import path from "path"
import simpleGit from "simple-git"
import { testsPath } from "../utils/consts"

const vitePath = path.resolve(testsPath, "vite")
const shell = Bun.$.cwd(vitePath)
const git = simpleGit().cwd(vitePath)

const setup = async () => {
  await git.init()
  await git.commit("initial commit", [], { "--allow-empty": null })
}

test("vite works", async () => {
  await setup()
  console.log("fine")
})
