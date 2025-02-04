export const pathToWorkingDirectory = (currentDirectory) => {
  process.stdout.write(
    `You are currently in ${currentDirectory}\nEnter your command:`
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
