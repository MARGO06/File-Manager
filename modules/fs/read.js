import { createReadStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";
import { resolve } from "node:path";

export const readFile = async (directory, input) => {
  const pathToFile = resolve(directory, input);
  try {
    await access(pathToFile, constants.F_OK);

    const fileName = createReadStream(pathToFile);

    fileName.on("data", (chunk) =>
      process.stdout.write(
        `${chunk}\nYou are currently in ${directory}\nEnter your command:`
      )
    );

    fileName.on("error", (err) => {
      console.error("Error reading the file:", err);
    });
  } catch (err) {
    console.error("Operation failed:", err);
    pathToWorkingDirectory(directory);
  }
};
