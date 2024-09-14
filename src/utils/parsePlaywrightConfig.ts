import path from "node:path"
import fse from "fs-extra"
import z from "zod"
import { logErrorAndExit } from "./utils"

const playwrightConfigSchema = z.object({
  default: z.object({
    testDir: z.string({ message: "The property `testDir` is missing." }),
    outputDir: z.string({ message: "The property `outputDir is missing." }),
    updateSnapshots: z
      .string({
        message:
          "The property `updateSnapshots` is missing. Its value must be 'all'.",
      })
      .refine((val) => val === "all", {
        message: "The property `updateSnapshots` must be 'all'.",
      }),
  }),
})

// Register ts-node to allow TypeScript imports
// register()

// // Use createRequire to dynamically import the TypeScript file
// const requireTS = createRequire(import.meta.url)

// const loadTsFile = (filePath: string) => {
//   // Dynamically import the TypeScript file
//   const config = requireTS(filePath)
// }

export const getPlaywrightConfig = async (
  projectPath: string,
): Promise<Zod.infer<typeof playwrightConfigSchema>["default"]> => {
  const playwrightConfigPath = path.resolve(projectPath, "playwright.config.ts")

  if (!fse.existsSync(playwrightConfigPath))
    logErrorAndExit('No "playwright.config.ts" found in the project directory')

  let playwrightConfigFile: unknown

  try {
    playwrightConfigFile = await import(playwrightConfigPath)
  } catch (error) {
    console.error('Error while importing "playwright.config.ts"')
    throw error
  }

  const schemaParseResult =
    playwrightConfigSchema.safeParse(playwrightConfigFile)

  if (schemaParseResult.error)
    logErrorAndExit(
      `playwright.config.ts is not valid:\n${schemaParseResult.error.errors.map((err) => ` - ${err.message}`).join("\n")}`,
    )

  return schemaParseResult.data.default
}
