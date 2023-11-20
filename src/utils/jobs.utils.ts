import { writeFile } from "node:fs/promises";

export const saveFile = async (file: File, path: string) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  return writeFile(path, buffer);
};
