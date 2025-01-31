import { cpus } from "node:os";

export const showCPUS = () => {
  const numbersCpus = cpus().length;

  const allCpus = cpus();

  console.log(`Overall amount of CPUS: ${numbersCpus}`);

  allCpus.forEach((data, index) => {
    console.log(
      `${index + 1} Model:${data.model}. Speed: ${data.speed / 100} GHz`
    );
  });

  process.stdout.write(
    `You are currently in ${process.cwd()}\nEnter your command:`
  );
};
