export const pathToWorkingDirectory = (currentDirectory) => {
  process.stdout.write(
    `You are currently in ${currentDirectory}\nEnter your command:`
  );
};
