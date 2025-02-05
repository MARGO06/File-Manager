import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";
import { resolve } from "node:path";

export const calcHash = async (directory, path) => {
  const fullPath = resolve(directory, path);
  const hash = createHash("sha256");
  try {
    await access(fullPath, constants.F_OK);

    await new Promise((resolve, reject) => {
      const input = createReadStream(fullPath);
      input.on("data", (chunk) => hash.update(chunk));

      input.on("end", () => {
        console.log(`Hash:${hash.digest("hex")}`);
        resolve();
      });

      input.on("error", (err) => {
        console.error("Error reading the file:", err);
        reject();
      });
    });
  } catch (err) {
    console.error("Operation failed: ", err);
  } finally {
    pathToWorkingDirectory(directory);
  }
};
