import path from "node:path"
import fse from "fs-extra"
import z from "zod"
import { logErrorAndExit } from "./utils"

const playwrightConfigSchema = z.object({
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
})

export const getPlaywrightConfig = async (
  projectPath: string,
): Promise<Zod.infer<typeof playwrightConfigSchema>> => {
  console.time("a")
  const playwrightConfigPath = path.resolve(projectPath, "playwright.config.ts")

  if (!fse.existsSync(playwrightConfigPath))
    logErrorAndExit('No "playwright.config.ts" found in the project directory')

  let playwrightConfigFile: unknown

  console.timeLog("a", "exists")

  try {
    playwrightConfigFile = await import(playwrightConfigPath)
  } catch (error) {
    console.error('Error while importing "playwright.config.ts"')
    throw error
  }
  console.timeLog("a", "import")

  if (
    !playwrightConfigFile ||
    typeof playwrightConfigFile !== "object" ||
    !("default" in playwrightConfigFile)
  )
    logErrorAndExit('"playwright.config.ts" has no default export')
  console.timeLog("a")

  const schemaParseResult = playwrightConfigSchema.safeParse(
    playwrightConfigFile.default,
  )

  console.timeLog("a")

  if (schemaParseResult.error)
    logErrorAndExit(
      `playwright.config.ts is not valid:\n${schemaParseResult.error.errors.map((err) => ` - ${err.message}`).join("\n")}`,
    )
  console.timeEnd("a")

  return schemaParseResult.data
}
