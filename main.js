import readline from "node:readline";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import { access, constants } from "node:fs/promises";
import { showCurrentDirectory } from "./modules/list/showList.js";
import { readFile } from "./modules/fs/read.js";
import { createFile, createDirectory } from "./modules/fs/create.js";
import { renameFile } from "./modules/fs/rename.js";
import { copyFile } from "./modules/fs/copy.js";
import { moveFile } from "./modules/fs/move.js";
import { deleteFile } from "./modules/fs/delete.js";
import {
  showArchitecture,
  showEOL,
  showHomeDir,
  showUser,
} from "./modules/os/getEOL.js";
import { showCPUS } from "./modules/os/getCpus.js";
import { calcHash } from "./modules/hash/calcHash.js";
import { compressFile } from "./modules/zip/compress.js";

const rl = readline.createInterface(process.stdin, process.stdout);

const farewellAndExit = (userName) => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!\n`
  );
  rl.close();
  process.exit(0);
};

const goUp = async () => {
  const dirname = process.cwd();
  const newDir = path.resolve(dirname, "..");

  if (dirname.endsWith("File-Manager")) {
    process.stdout.write(
      `You are already at the root directory. Cannot go up.\nYou are currently in ${process.cwd()}\nEnter your command:`
    );
    return;
  }

  try {
    await access(newDir, constants.F_OK);
    process.chdir(newDir);
    process.stdout.write(
      `You are currently in ${process.cwd()}\nEnter your command:`
    );
  } catch (err) {
    process.stdout.write(`Cannot access parent directory.\n`);
    throw err;
  }
};

const changeAndVerifyDirectory = async (directory) => {
  const dirname = process.cwd();
  const newDirectory = path.resolve(dirname, directory);
  try {
    await access(newDirectory, constants.F_OK);
    process.chdir(newDirectory);
    process.stdout.write(
      `You are currently in ${process.cwd()}\nEnter your command:`
    );
  } catch (err) {
    process.stdout.write(`Directory "${targetDir}" does not exist.`);
    throw err;
  }
};

const changeDirectory = async (input) => {
  const command = input.trim().split(" ");

  if (command[0] === "cd") {
    const targetDir = command[1];

    if (!targetDir) {
      console.log("Please specify a directory to change to.");
      return;
    }
    switch (targetDir) {
      case "modules":
      case "list":
      case "fs":
      case "files":
      case "os":
        await changeAndVerifyDirectory(targetDir);
        break;
      default:
        process.stdout.write(
          `Operation failed: "${targetDir}".Please try again!\nYou are currently in ${process.cwd()}\nEnter your command:`
        );
    }
  } else if (command[0] === "up") {
    await goUp();
  } else if (command[0] === "ls") {
    await showCurrentDirectory();
  } else if (command[0] === "cat") {
    const targetDir = command[1];

    if (!targetDir) {
      console.log("Please specify a directory to change to.");
      return;
    }
    await readFile(targetDir);
  } else if (command[0] === "add") {
    const targetDir = command[1];

    if (!targetDir) {
      console.log("Please specify a directory to change to.");
      return;
    }
    await createFile(targetDir);
  } else if (command[0] === "mkdir") {
    const targetDir = command[1];

    if (!targetDir) {
      console.log("Please specify a directory to change to.");
      return;
    }
    await createDirectory(targetDir);
  } else if (command[0] === "rn") {
    const oldFile = command[1];
    const newFile = command[2];

    if (!oldFile || !newFile) {
      console.log(
        "Both the path to the file and the new name of the file must be provided."
      );
      return;
    }
    await renameFile(oldFile, newFile);
  } else if (command[0] === "cp") {
    const oldPath = command[1];
    const newPath = command[2];

    if (!oldPath || !newPath) {
      console.log(
        "Both the path to the file and the new name of the file must be provided."
      );
      return;
    }
    await copyFile(oldPath, newPath);
  } else if (command[0] === "mv") {
    const oldPath = command[1];
    const newPath = command[2];

    if (!oldPath || !newPath) {
      console.log(
        "Both the path to the file and the new name of the file must be provided."
      );
      return;
    }
    await moveFile(oldPath, newPath);
  } else if (command[0] === "rm") {
    const targetDir = command[1];

    if (!targetDir) {
      console.log("Please specify a directory to change to.");
      return;
    }
    await deleteFile(targetDir);
  } else if (command[0] === "os") {
    const argument = command[1];

    if (!argument) {
      console.log("Please enter '--EOL'");
      return;
    }
    if (argument === "--EOL") {
      showEOL(argument);
    } else if (argument === "--cpus") {
      showCPUS(argument);
    } else if (argument === "--homedir") {
      showHomeDir(argument);
    } else if (argument === "--username") {
      showUser(argument);
    } else if (argument === "--architecture") {
      showArchitecture(argument);
    }
  } else if (command[0] === "hash") {
    const targetDir = command[1];

    if (!targetDir) {
      console.log("Please specify a directory to change to.");
      return;
    }
    await calcHash(targetDir);
  } else if (command[0] === "compress") {
    const oldPath = command[1];
    const newPath = command[2];

    if (!oldPath || !newPath) {
      console.log(
        "Both the path to the file and the new name of the file must be provided."
      );
      return;
    }
    await compressFile(oldPath, newPath);
  }
};

/*const handleOperationError = (input) => {
  const trimmedInput = input.trim().split(" ");
  //TODO
  if (trimmedInput[1] !== "modules") {
    return `Operation failed. Please try again!`;
  }
  return null;
};*/

const validCommand = (input) => {
  const trimmedInput = input.trim();
  //TODO
  if (!trimmedInput) {
    return `Invalid command. Please try again!\n`;
  }
  return null;
};

const pathToWorkingDirectory = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  process.stdout.write(
    `You are currently in ${__dirname}\nEnter your command:`
  );
};

const showUserName = () => {
  const commands = process.argv.slice(2);

  const userName = commands
    .find((item) => item.startsWith("--username="))
    .split("=")[1];

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

  pathToWorkingDirectory();

  rl.on("line", async (input) => {
    if (input.trim() === ".exit") {
      farewellAndExit(userName);
    } else {
      const errorMessage = validCommand(input);
      if (errorMessage) {
        console.log(errorMessage);
      }
      await changeDirectory(input);
    }
  });

  rl.on("SIGINT", () => {
    rl.write(null, { ctrl: true, name: "u" });
    farewellAndExit(userName);
  });
};

showUserName();
