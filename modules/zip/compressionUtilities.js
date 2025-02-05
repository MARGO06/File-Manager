import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { access, constants } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";
import { resolve } from "node:path";

export const transformFile = async (
  directory,
  oldPath,
  newPath,
  transformFunc
) => {
  const oldFullPath = resolve(directory, oldPath);
  const newFullPath = resolve(directory, newPath);
  try {
    await access(oldFullPath, constants.F_OK);
    const input = createReadStream(oldFullPath);
    const output = createWriteStream(newFullPath);

    const brotli = transformFunc();

    pipeline(input, brotli, output, (err) => {
      if (err) {
        console.error("Pipeline failed:", err);
      }
    });
  } catch (err) {
    console.error("Operation failed: ", err);
  } finally {
    pathToWorkingDirectory(directory);
  }
};

export const compressFile = async (directory, oldPath, newPath) => {
  await transformFile(directory, oldPath, newPath, createBrotliCompress);
};

export const decompressFile = async (directory, oldPath, newPath) => {
  await transformFile(directory, oldPath, newPath, createBrotliDecompress);
};
