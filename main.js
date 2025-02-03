import readline from "node:readline";
import { getUserName, changeDirectory } from "./modules/cli/cliCommands.js";
import { pathToWorkingDirectory } from "./modules/cli/directoryManagement.js";

const rl = readline.createInterface(process.stdin, process.stdout);

const farewellAndExit = (userName) => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!\n`
  );
  rl.close();
  process.exit(0);
};

const validCommand = (input) => {
  const trimmedInput = input.trim();
  //TODO
  if (!trimmedInput) {
    return `Invalid command. Please try again!\n`;
  }
  return null;
};

const showUserName = () => {
  const userName = getUserName();

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
