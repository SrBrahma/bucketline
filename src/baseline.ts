import os from "os"
import path from "path"
import compressing from "compressing"
import consola from "consola"
import fse from "fs-extra"
import { list } from "watskeburt"
import { createCommitRow } from "./db/xataClient"

export const uploadBaseline = async (props: { screenshotsDir: string }) => {
  const changedFiles = await list()

  const changedFilesFiltered = changedFiles.filter((file) =>
    file.name.endsWith(".png"),
  )
  consola.info("Changed files", changedFilesFiltered)

  const tempFilePath = path.join(os.tmpdir(), `output-${Date.now()}.zip`)
  consola.info("Temp file path:", tempFilePath)

  await compressing.zip.compressDir(props.screenshotsDir, tempFilePath)
  await createCommitRow({ file: await fse.openAsBlob(tempFilePath) })
}
