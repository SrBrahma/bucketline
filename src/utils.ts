export const logErrorAndExit = (message: string, exitCode = 1): never => {
  console.error(message)
  process.exit(exitCode)
}
