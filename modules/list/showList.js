import { readdir, stat } from "node:fs/promises";

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

    process.stdout.write(`Index Name Type\n`);

    sortedFiles.forEach((file, index) => {
      const directory = file.isDirectory ? "directory" : "file";
      process.stdout.write(`${index} ${file.name} ${directory}\n`);
    });

    process.stdout.write(
      `You are currently in ${process.cwd()}\nEnter your command:`
    );
  } catch (error) {
    console.error("Error reading directory:", err);
  }
};
