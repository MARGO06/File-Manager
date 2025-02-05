import { unlink, access, constants } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";
import { resolve } from "node:path";

export const deleteFile = async (directory, path) => {
  const fullPath = resolve(directory, path);
  try {
    await access(fullPath, constants.F_OK);
    await unlink(fullPath);
  } catch (err) {
    console.error("Operation failed:", err);
  } finally {
    pathToWorkingDirectory(directory);
  }
};
