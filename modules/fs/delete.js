import { unlink, access, constants } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const deleteFile = async (nameFile) => {
  try {
    await access(nameFile, constants.F_OK);
    await unlink(nameFile);
  } catch (err) {
    console.error("Error this file does not exist:", err);
  } finally {
    pathToWorkingDirectory();
  }
};
