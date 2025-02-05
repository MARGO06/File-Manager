import { rename, access, constants } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const renameFile = async (currentDirectory, oldFile, newFile) => {
  const fullPath = resolve(currentDirectory, oldFile);

  try {
    await access(fullPath, constants.F_OK);

    const directory = dirname(fullPath);
    const newFilePath = join(directory, newFile);

    try {
      await access(newFilePath, constants.F_OK);
      console.error(`Cannot rename: "${newFilePath}" already exists.`);
      return;
    } catch (err) {
      if (err.code === "ENOENT") {
        await rename(fullPath, newFilePath);
      }
    }
  } catch (err) {
    console.error("Operation failed:", err);
  } finally {
    pathToWorkingDirectory(currentDirectory);
  }
};
