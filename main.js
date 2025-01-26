import readline from "node:readline";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import { access, constants } from "node:fs/promises";

const rl = readline.createInterface(process.stdin, process.stdout);

const farewellAndExit = (userName) => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!\n`
  );
  rl.close();
  process.exit(0);
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
      case "files":
        await changeAndVerifyDirectory(targetDir);
        break;
      default:
        process.stdout.write(
          `Operation failed: "${targetDir}".Please try again!\nYou are currently in ${process.cwd()}\nEnter your command:`
        );
    }
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
