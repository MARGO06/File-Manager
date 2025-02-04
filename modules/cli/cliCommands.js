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
} from "./directoryManagement.js";
import {
  showArchitecture,
  showCPUS,
  showEOL,
  showHomeDir,
  showUser,
} from "../os/osCommands.js";
import { homedir } from "node:os";

let currentDir = homedir();

export const getUserName = () => {
  const commands = process.argv.slice(2);

  return commands.find((item) => item.startsWith("--username=")).split("=")[1];
};

export const manageOSFileOperation = async (
  command,
  executeOSFileOperation
) => {
  const argument = command.slice(1).join(" ");

  if (!argument) {
    console.log("Invalid input: please enter second argument.");
    pathToWorkingDirectory(currentDir);
    return;
  }
  await executeOSFileOperation(currentDir, argument);
};

export const changeAndVerifyDirectory = async (directory) => {
  const newDirectory = path.resolve(currentDir, directory);

  try {
    await access(newDirectory, constants.F_OK);
    process.chdir(newDirectory);
    currentDir = newDirectory;
    pathToWorkingDirectory(newDirectory);
    return newDirectory;
  } catch (err) {
    console.error(`Operation failed: "${newDirectory}".Please try again!`, err);
    pathToWorkingDirectory(currentDir);
  }
};

export const goUp = async () => {
  const newDir = path.resolve(currentDir, "..");

  const finalDirectory = homedir().split("\\").slice(0, 2).join("\\");

  if (newDir === finalDirectory) {
    console.log("You are already at the root directory. Cannot go up.");
    pathToWorkingDirectory(currentDir);
    return;
  }

  try {
    await access(newDir, constants.F_OK);
    process.chdir(newDir);
    currentDir = newDir;
    return newDir;
  } catch (err) {
    console.error("Cannot access parent directory.", err);
  } finally {
    pathToWorkingDirectory(newDir);
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

export const moveOnFolders = async (directory, folderName) => {
  try {
    if (folderName) {
      const newDir = await changeAndVerifyDirectory(folderName);
      if (newDir !== undefined) {
        currentDir = newDir;
      }
    } else {
      console.log(
        `Operation failed:"${folderName}" does not exist or cannot be accessed.`
      );
      pathToWorkingDirectory(directory);
    }
  } catch (err) {
    console.error(`Operation failed: "${folderName}".Please try again!`);
    pathToWorkingDirectory(directory);
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
