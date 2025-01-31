import { createReadStream, createWriteStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pipelineAsync = promisify(pipeline);

export const copyFile = async (oldPath, newPath) => {
  try {
    await access(oldPath, constants.F_OK);
    const input = createReadStream(oldPath);
    const output = createWriteStream(newPath);
    await pipelineAsync(input, output);
  } catch (err) {
    console.error("Error copy file:", err);
  } finally {
    process.stdout.write(
      `You are currently in ${process.cwd()}\nEnter your command:`
    );
  }
};
