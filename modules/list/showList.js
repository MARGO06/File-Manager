import { readdir, stat } from "node:fs/promises";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

const sortFiles = (filesDetails) => {
  return filesDetails.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) {
      return -1;
    } else if (b.isDirectory && !a.isDirectory) {
      return 1;
    }
    return a.name - b.name;
  });
};

export const showCurrentDirectory = async () => {
  const currentDirectory = process.cwd();

  try {
    const files = await readdir(currentDirectory, { withFileTypes: true });

    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const fileStat = await stat(file.name);
        return { name: file.name, isDirectory: fileStat.isDirectory() };
      })
    );

    const sortedFiles = sortFiles(fileDetails);

    const dataDirectory = sortedFiles.map((file) => ({
      Name: file.name,
      Type: file.isDirectory ? "directory" : "file",
    }));
    console.table(dataDirectory);
  } catch (error) {
    console.error("Error reading directory:", err);
  } finally {
    pathToWorkingDirectory(currentDirectory);
  }
};
