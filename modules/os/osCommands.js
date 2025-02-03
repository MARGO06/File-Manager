import { arch, EOL, homedir, userInfo, cpus } from "node:os";
import { pathToWorkingDirectory } from "../cli/directoryManagement.js";

export const showEOL = () => {
  console.log(
    `End-Of-Line (EOL) for the current system is: ${JSON.stringify(EOL)}`
  );

  pathToWorkingDirectory();
};

export const showHomeDir = () => {
  console.log(`Home directory: ${homedir()}`);

  pathToWorkingDirectory();
};

export const showUser = () => {
  const user = userInfo();
  console.log(`User name: ${user.username}`);

  pathToWorkingDirectory();
};

export const showArchitecture = () => {
  const architecture = arch();
  console.log(`Architecture: ${architecture}`);

  pathToWorkingDirectory();
};

export const showCPUS = () => {
  const numbersCpus = cpus().length;

  const allCpus = cpus();

  console.log(`Overall amount of CPUS: ${numbersCpus}`);

  allCpus.forEach((data, index) => {
    console.log(
      `${index + 1} Model:${data.model}. Speed: ${data.speed / 100} GHz`
    );
  });

  pathToWorkingDirectory();
};
