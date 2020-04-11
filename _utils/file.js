/**
 * https://github.com/mathdroid/covid-19-api/blob/master/util/file.ts
 */
import { writeFile } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import { promisify } from "util";
import { tmpdir } from "os";
const writeFileAsync = promisify(writeFile);

export async function writeTempFile(name, contents) {
  const fileName =
    createHash("md5")
      .update(name)
      .digest("hex") + ".html";
  const filePath = join(tmpdir(), fileName);
  await writeFileAsync(filePath, contents);
  return filePath;
}

export function pathToFileURL(path) {
  const fileUrl = "file://" + path;
  return fileUrl;
}
