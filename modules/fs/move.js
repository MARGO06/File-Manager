import { unlink } from "node:fs/promises";
import { copyFile } from "./copy.js";
import { resolve } from "node:path";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const moveFile = async (directory, oldPath, newPath) => {
  const fullPath = resolve(directory, oldPath);
  try {
    await copyFile(directory, oldPath, newPath);
    await unlink(fullPath);
  } catch (err) {
    console.error("Operation failed:", err);
    pathToWorkingDirectory(directory);
  }
};
