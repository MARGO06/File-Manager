import { unlink, access, constants } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const deleteFile = async (directory, path) => {
  const fullPath = `${directory}/${path}`;
  try {
    await access(fullPath, constants.F_OK);
    await unlink(fullPath);
  } catch (err) {
    console.error("Operation failed:", err);
  } finally {
    pathToWorkingDirectory(directory);
  }
};
