import { writeFile, access, constants, mkdir } from "fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

const checkPathExists = async (name) => {
  try {
    await access(`${process.cwd()}/${name}`, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
  }
};

const handleFileCreation = async (input, createFunc) => {
  const exists = await checkPathExists(input);
  if (!exists) {
    await createFunc(input);
    pathToWorkingDirectory();
  } else {
    throw new Error(`The file or directory "${input}" already exists.`);
  }
};

export const createFile = async (input) => {
  await handleFileCreation(input, writeFile.bind(null, input, "", "utf8"));
};

export const createDirectory = async (input) => {
  await handleFileCreation(input, mkdir.bind(null, input, { recursive: true }));
};
