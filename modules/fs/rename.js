import { rename, access, constants } from "node:fs/promises";
import { dirname, join } from "node:path";

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
        process.stdout.write(
          `You are currently in ${process.cwd()}\nEnter your command:`
        );
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.error("Do not rename", err);
    throw err;
  }
};
