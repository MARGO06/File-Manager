import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { access, constants } from "node:fs/promises";

export const transformFile = async (oldPath, newPath, transformFunc) => {
  try {
    await access(oldPath, constants.F_OK);
    const input = createReadStream(oldPath);
    const output = createWriteStream(newPath);

    const brotli = transformFunc();

    pipeline(input, brotli, output, (err) => {
      if (err) {
        console.error("Pipeline failed:", err);
      }
    });
  } catch (err) {
    console.error("Error accessing the file:", err);
  } finally {
    process.stdout.write(
      `You are currently in ${process.cwd()}\nEnter your command:`
    );
  }
};

export const compressFile = async (oldPath, newPath) => {
  await transformFile(oldPath, newPath, createBrotliCompress);
};

export const decompressFile = async (oldPath, newPath) => {
  await transformFile(oldPath, newPath, createBrotliDecompress);
};
