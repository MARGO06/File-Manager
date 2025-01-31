import { arch, EOL, homedir, userInfo } from "node:os";

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

export const showUser = () => {
  const user = userInfo();
  console.log(`User name: ${user.username}`);

  process.stdout.write(
    `You are currently in ${process.cwd()}\nEnter your command:`
  );
};

export const showArchitecture = () => {
  const architecture = arch();
  console.log(`Architecture: ${architecture}`);

  process.stdout.write(
    `You are currently in ${process.cwd()}\nEnter your command:`
  );
};
