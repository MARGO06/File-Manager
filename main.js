import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const rl = readline.createInterface(process.stdin, process.stdout);

const farewellAndExit = (userName) => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!\n`
  );
  rl.close();
  process.exit(0);
};

const handleOperationError = (input) => {
  const trimmedInput = input.trim().split(" ");
  //TODO
  if (trimmedInput[1] !== "modules") {
    return `Operation failed. Please try again!`;
  }
  return null;
};

const validCommand = (input) => {
  const trimmedInput = input.trim();
  //TODO
  if (!trimmedInput) {
    return `Invalid command. Please try again!`;
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

  rl.on("line", (input) => {
    if (input.trim() === ".exit") {
      farewellAndExit(userName);
    } else {
      const errorMessage = validCommand(input);
      const errorOperation = handleOperationError(input);
      if (errorMessage) {
        console.log(errorMessage);
      }
      if (errorOperation) {
        console.log(errorOperation);
      }
      if (!errorMessage && !errorOperation) {
        console.log(`You entered: ${input}`);
      }

      pathToWorkingDirectory();
    }
  });

  rl.on("SIGINT", () => {
    rl.write(null, { ctrl: true, name: "u" });
    farewellAndExit(userName);
  });
};

showUserName();
