import { EOL, homedir } from "node:os";

export const showEOL = () => {
  console.log(
    `End-Of-Line (EOL) for the current system is: ${JSON.stringify(EOL)}`
  );

  process.stdout.write(
    `You are currently in ${process.cwd()}\nEnter your command:`
  );
};

export const showHomeDir = () => {
  console.log(`Home directory: ${homedir()}`);

  process.stdout.write(
    `You are currently in ${process.cwd()}\nEnter your command:`
  );
};
