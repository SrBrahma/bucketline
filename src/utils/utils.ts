import consola from "consola"

export const logErrorAndExit: (message: string, exitCode?: number) => never = (
  message,
  exitCode = 1,
) => {
  consola.error(message)
  process.exit(exitCode)
}
