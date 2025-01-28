import { writeFile, access, constants } from "fs/promises";

export const createFile = async (input) => {
  try {
    await access(`${process.cwd()}/${input}`, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeFile(input, "", "utf8");
      process.stdout.write(
        `You are currently in ${process.cwd()}\nEnter your command:`
      );
    } else {
      throw err;
    }
  }
};
