import { createReadStream } from "node:fs";
import { access, constants } from "node:fs/promises";

export const readFile = async (input) => {
  try {
    await access(input, constants.F_OK);

    const fileName = createReadStream(input);

    fileName.on("data", (chunk) =>
      process.stdout.write(
        `${chunk}\nYou are currently in ${process.cwd()}\nEnter your command:`
      )
    );

    fileName.on("error", (err) => {
      console.error("Error reading the file:", err);
    });
  } catch (err) {
    console.error("No such file or directory:", err);
    throw err;
  }
};
