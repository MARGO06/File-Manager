import { writeFile, access, constants, mkdir } from "fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";
import { resolve } from "path";

const checkPathExists = async (path) => {
  try {
    await access(`${path}`, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
  }
};

const handleFileCreation = async (directory, input, createFunc) => {
  const fullPath = resolve(directory, input);
  const exists = await checkPathExists(fullPath);
  if (!exists) {
    await createFunc(fullPath);
    pathToWorkingDirectory(directory);
  } else {
    throw new Error(`The file or directory "${input}" already exists.`);
  }
};

export const createFile = async (directory, input) => {
  await handleFileCreation(directory, input, (fullPath) =>
    writeFile(fullPath, "", "utf8")
  );
};

export const createDirectory = async (directory, input) => {
  await handleFileCreation(directory, input, (fullPath) =>
    mkdir(fullPath, { recursive: true })
  );
};
