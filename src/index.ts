import os from "node:os"
import path from "node:path"
import { program } from "@commander-js/extra-typings"
import compressing from "compressing"
import consola, { LogLevels } from "consola"
import fse from "fs-extra"
import { list } from "watskeburt"
import { getPlaywrightConfig } from "./parsePlaywrightConfig"
import { createCommitRow } from "./xataClient"

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

// import { join } from 'path';
// import { createRequire } from 'module';
// import { register } from 'ts-node';

// // Register ts-node to allow TypeScript imports
// register();

// // Use createRequire to dynamically import the TypeScript file
// const requireTS = createRequire(import.meta.url);

// // Dynamically import the TypeScript file
// const config = requireTS(join(__dirname, './config.ts')).default;

const main = async (projectPath: string) => {
  const targetPath = path.resolve(process.cwd(), projectPath)

  consola.info("Cwd:", process.cwd())
  consola.info("Target path:", targetPath)

  const playwrightConfig = await getPlaywrightConfig(targetPath)

  const screenshotsDir = path.join(targetPath, playwrightConfig.outputDir)

  consola.info("Screenshots dir:", screenshotsDir)

  const changedFiles = await list({})

  const changedFilesFiltered = changedFiles.filter((file) =>
    file.name.endsWith(".png"),
  )

  consola.info("Changed files", changedFilesFiltered)

  // Generate a temp file path
  const tempFilePath = path.join(os.tmpdir(), `output-${Date.now()}.zip`)

  consola.info("Temp file path:", tempFilePath)
  // Compress the directory and save it to the temporary file
  await compressing.zip.compressDir(screenshotsDir, tempFilePath)

  await createCommitRow({ file: await fse.openAsBlob(tempFilePath) })
}

void program.parseAsync()
