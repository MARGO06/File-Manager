import { rename, access, constants } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const renameFile = async (oldFile, newFile) => {
  try {
    await access(oldFile, constants.F_OK);

    const directory = dirname(oldFile);
    const newFilePath = join(directory, newFile);

    try {
      await access(newFilePath, constants.F_OK);
      console.error(`Cannot rename: "${newFilePath}" already exists.`);
      return;
    } catch (err) {
      if (err.code === "ENOENT") {
        await rename(oldFile, newFilePath);
      }
    }
  } catch (err) {
    console.error("Operation failed:", err);
  } finally {
    pathToWorkingDirectory();
  }
};
