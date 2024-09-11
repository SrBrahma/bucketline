import path from "node:path"
import { program } from "@commander-js/extra-typings"
import { list } from "watskeburt"
import { getPlaywrightConfig } from "./parsePlaywrightConfig"

program.argument("<projectPath>").action(async (targetFile) => {
  await main(targetFile)
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

const main = async (targetFile: string) => {
  const targetPath = path.resolve(process.cwd(), targetFile)

  console.time("Parse config")
  await getPlaywrightConfig(targetPath)
  console.timeEnd("Parse config")

  console.time("List files")
  const changedFiles = await list()

  console.timeEnd("List files")
}

void program.parseAsync()
