import { createReadStream, createWriteStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";
import { resolve, basename, join } from "node:path";

const pipelineAsync = promisify(pipeline);

export const copyFile = async (directory, oldPath, newPath) => {
  const oldFullPath = resolve(directory, oldPath);

  const fileName = basename(oldFullPath);
  const newFullPath = join(resolve(directory, newPath), fileName);

  try {
    await access(oldFullPath, constants.F_OK);
    const input = createReadStream(oldFullPath);
    const output = createWriteStream(newFullPath);
    await pipelineAsync(input, output);
  } catch (err) {
    console.error("Operation failed:", err);
  } finally {
    pathToWorkingDirectory(directory);
  }
};
