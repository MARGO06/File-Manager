import readline from "node:readline";

const rl = readline.createInterface(process.stdin, process.stdout);

const farewellAndExit = (userName) => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!\n`
  );
  rl.close();
  process.exit(0);
};

const showUserName = () => {
  const commands = process.argv.slice(2);

  const userName = commands
    .find((item) => item.startsWith("--username="))
    .split("=")[1];

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

  rl.on("line", (input) => {
    if (input.trim() === ".exit") {
      farewellAndExit(userName);
    }
  });

  rl.on("SIGINT", () => {
    farewellAndExit(userName);
  });
};

showUserName();
