import { unlink } from "node:fs/promises";
import { copyFile } from "./copy.js";

export const moveFile = async (oldPath, newPath) => {
  try {
    await copyFile(oldPath, newPath);
    await unlink(oldPath);
  } catch (err) {
    console.error("Error moving file:", err);
  }
};
