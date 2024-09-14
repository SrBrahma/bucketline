import consola from "consola"

// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
export function logErrorAndExit(message: string, exitCode = 1): never {
  consola.error(message)
  process.exit(exitCode)
}
