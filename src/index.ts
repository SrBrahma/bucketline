import path from "node:path"
import { program } from "@commander-js/extra-typings"
import consola, { LogLevels } from "consola"
import { uploadBaseline } from "./baseline"
import { getPlaywrightConfig } from "./utils/parsePlaywrightConfig"

program
  .option(
    "--logLevel <level>",
    "set the log level (error, warn, info, debug, silent)",
    "info",
  )
  .argument("<projectPath>")
  .action(async (projectPath, { logLevel }) => {
    consola.level =
      LogLevels[
        logLevel in LogLevels ? (logLevel as keyof typeof LogLevels) : "log"
      ]

    await main(projectPath)
  })

const main = async (projectPath: string) => {
  const targetPath = path.resolve(process.cwd(), projectPath)
  consola.info("Target path:", targetPath)

  const playwrightConfig = await getPlaywrightConfig(targetPath)

  const screenshotsDir = path.resolve(targetPath, playwrightConfig.outputDir)
  consola.info("Screenshots dir:", screenshotsDir)

  await uploadBaseline({ screenshotsDir })
}

void program.parseAsync()
