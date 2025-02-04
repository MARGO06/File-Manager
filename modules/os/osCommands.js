import { arch, EOL, homedir, userInfo, cpus } from "node:os";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const showEOL = (directory) => {
  console.log(
    `End-Of-Line (EOL) for the current system is: ${JSON.stringify(EOL)}`
  );

  pathToWorkingDirectory(directory);
};

export const showHomeDir = (directory) => {
  console.log(`Home directory: ${homedir()}`);

  pathToWorkingDirectory(directory);
};

export const showUser = (directory) => {
  const user = userInfo();
  console.log(`User name: ${user.username}`);

  pathToWorkingDirectory(directory);
};

export const showArchitecture = (directory) => {
  const architecture = arch();
  console.log(`Architecture: ${architecture}`);

  pathToWorkingDirectory(directory);
};

export const showCPUS = (directory) => {
  const numbersCpus = cpus().length;

  const allCpus = cpus();

  console.log(`Overall amount of CPUS: ${numbersCpus}`);

  allCpus.forEach((data, index) => {
    console.log(
      `${index + 1} Model:${data.model}. Speed: ${data.speed / 100} GHz`
    );
  });

  pathToWorkingDirectory(directory);
};
