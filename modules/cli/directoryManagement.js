export const pathToWorkingDirectory = () => {
  process.stdout.write(
    `You are currently in ${process.cwd()}\nEnter your command:`
  );
};

export const manageFileOperation = async (command, executeFileOperation) => {
  const oldPath = command[1];
  const newPath = command[2];

  if (!oldPath || !newPath) {
    console.log(
      "Invalid input: both the path to the file and the new name of the file must be provided."
    );
    pathToWorkingDirectory();
    return;
  }
  await executeFileOperation(oldPath, newPath);
};

export const manageOSFileOperation = async (
  command,
  executeOSFileOperation
) => {
  const argument = command[1];

  if (!argument) {
    console.log("Invalid input: please enter second argument.");
    pathToWorkingDirectory();
    return;
  }
  await executeOSFileOperation(argument);
};
