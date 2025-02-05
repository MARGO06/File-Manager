import readline from "node:readline";
import { getUserName, changeDirectory } from "./modules/cli/cliCommands.js";
import { pathToWorkingDirectory } from "./modules/cli/directoryManagement.js";
import { homedir } from "node:os";

const rl = readline.createInterface(process.stdin, process.stdout);

const farewellAndExit = (userName) => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!\n`
  );
  rl.close();
  process.exit(0);
};

const showUserName = () => {
  const userName = getUserName();
  const currentDirectory = homedir();

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

  pathToWorkingDirectory(currentDirectory);

  rl.on("line", async (input) => {
    if (input.trim() === ".exit") {
      farewellAndExit(userName);
    } else {
      await changeDirectory(input);
    }
  });

  rl.on("SIGINT", () => {
    rl.write(null, { ctrl: true, name: "u" });
    farewellAndExit(userName);
  });
};

showUserName();
