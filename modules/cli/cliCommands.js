import path from "node:path";
import { access, constants } from "node:fs/promises";
import { decompressFile, compressFile } from "./../zip/compressionUtilities.js";
import { calcHash } from "../hash/calcHash.js";
import { deleteFile } from "../fs/delete.js";
import { moveFile } from "../fs/move.js";
import { copyFile } from "../fs/copy.js";
import { renameFile } from "../fs/rename.js";
import { createDirectory, createFile } from "../fs/create.js";
import { readFile } from "../fs/read.js";
import { showCurrentDirectory } from "../list/showList.js";
import {
  pathToWorkingDirectory,
  manageFileOperation,
  manageOSFileOperation,
} from "./directoryManagement.js";
import {
  showArchitecture,
  showCPUS,
  showEOL,
  showHomeDir,
  showUser,
} from "../os/osCommands.js";

export const getUserName = () => {
  const commands = process.argv.slice(2);

  return commands.find((item) => item.startsWith("--username=")).split("=")[1];
};

const changeAndVerifyDirectory = async (directory) => {
  const dirname = process.cwd();
  const newDirectory = path.resolve(dirname, directory);
  try {
    await access(newDirectory, constants.F_OK);
    process.chdir(newDirectory);
  } catch (err) {
    console.error(`Failed to change directory to "${newDirectory}":`, err);
  } finally {
    pathToWorkingDirectory();
  }
};

export const goUp = async () => {
  const dirname = process.cwd();
  const newDir = path.resolve(dirname, "..");

  if (dirname.endsWith("File-Manager")) {
    console.log("You are already at the root directory. Cannot go up.");
    pathToWorkingDirectory();
    return;
  }

  try {
    await access(newDir, constants.F_OK);
    process.chdir(newDir);
  } catch (err) {
    console.error("Cannot access parent directory.", err);
  } finally {
    pathToWorkingDirectory();
  }
};

export const showOSDetails = (argument) => {
  switch (argument) {
    case "--EOL":
      showEOL(argument);
      break;
    case "--cpus":
      showCPUS(argument);
      break;
    case "--homedir":
      showHomeDir(argument);
      break;
    case "--username":
      showUser(argument);
      break;
    case "--architecture":
      showArchitecture(argument);
      break;
    default:
      console.log(
        `Invalid input ${argument}. Please use '--EOL', '--cpus', '--homedir', '--username', or '--architecture'.`
      );
      pathToWorkingDirectory();
  }
};

export const moveOnFolders = async (folderName) => {
  const validFolders = ["modules", "list", "fs", "files", "zip", "cli", "os"];

  if (validFolders.includes(folderName)) {
    await changeAndVerifyDirectory(folderName);
  } else {
    console.log(`Operation failed: "${folderName}".Please try again!`);
    pathToWorkingDirectory();
  }
};

export const changeDirectory = async (input) => {
  const command = input
    .trim()
    .split(" ")
    .filter((item) => item.length !== 0);

  switch (command[0]) {
    case "cd":
      await manageOSFileOperation(command, moveOnFolders);
      break;
    case "up":
      await goUp();
      break;
    case "ls":
      await showCurrentDirectory();
      break;
    case "cat":
      await manageOSFileOperation(command, readFile);
      break;
    case "add":
      await manageOSFileOperation(command, createFile);
      break;
    case "mkdir":
      await manageOSFileOperation(command, createDirectory);
      break;
    case "rn":
      await manageFileOperation(command, renameFile);
      break;
    case "cp":
      await manageFileOperation(command, copyFile);
      break;
    case "mv":
      await manageFileOperation(command, moveFile);
      break;
    case "rm":
      await manageOSFileOperation(command, deleteFile);
      break;
    case "os":
      await manageOSFileOperation(command, showOSDetails);
      break;
    case "hash":
      await manageOSFileOperation(command, calcHash);
      break;
    case "compress":
      await manageFileOperation(command, compressFile);
      break;
    case "decompress":
      await manageFileOperation(command, decompressFile);
      break;
    default:
      console.log(`Operation failed: "${command[0]}".Please try again!`);
      pathToWorkingDirectory();
  }
};
