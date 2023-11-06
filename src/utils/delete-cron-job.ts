import fs from "node:fs";
import { TEMP_FILE_DIRECTORY } from "./constants";

export const DELETE_JOB_CALLBACK = async () => {
  const files = await fs.promises.readdir(TEMP_FILE_DIRECTORY);

  // create promises to find stats about all files
  const statPromises: Promise<[string, fs.Stats]>[] = [];
  for (let i = 0; i < files.length; i += 1) {
    console.log(files[i]);
    const newPromise = new Promise<[string, fs.Stats]>((resolve) => {
      const filePath = `${TEMP_FILE_DIRECTORY}/${files[i]}`;
      fs.stat(filePath, (_, stats) => resolve([filePath, stats]));
    });
    statPromises.push(newPromise);
  }

  const stats = await Promise.all(statPromises);

  const deletePromises = [];
  for (let i = 0; i < stats.length; i += 1) {
    const [filePath, stat] = stats[i];
    const { mtime: lastModTime } = stat;
    // if more than 1 hr old
    if ((Date.now() - lastModTime.getTime()) / 36e5 > 1) {
      console.log(`[${Date.now().toString()}] Deleting ${filePath}`);
      deletePromises.push(fs.promises.unlink(filePath));
    }
  }

  await Promise.all(deletePromises);
};
