import { nanoid } from "nanoid";
import type { Job, JobArguments, Jobs } from "./jobs.types";
import { writeFile } from "node:fs";

import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath("./ffmpeg");
import { SONG_CLIMAXES } from "./constants";
import path from "node:path";

const _jobs: Jobs = {};

export const getJob = (id: string, jobs = _jobs): Job | undefined => jobs[id];

export const setJobProgress = (id: string, progress: number, jobs = _jobs) => {
  jobs[id] = { ...jobs[id], progress };
};

const _jobProcess = async (
  id: string,
  jobArgs: JobArguments
): Promise<string> => {
  const { video, song, climax } = jobArgs;
  const { name } = video;
  const extension = path.extname(name);
  const songPath = `./songs/${song}.mp3`;
  const startPoint = SONG_CLIMAXES[song] - climax;
  const tempSongPath = `./temp/${id}.mp3`;
  const tempVideoPath = `./temp/${id}${extension}`;
  const tempOutputVideoPath = `./temp/${id}-output${extension}`;

  const buffer = Buffer.from(await video.arrayBuffer());

  await new Promise((resolve) => writeFile(tempVideoPath, buffer, resolve));

  setJobProgress(id, 33);

  await new Promise<void>((resolve, reject) =>
    ffmpeg(songPath)
      .seekInput(startPoint)
      .on("error", reject)
      .on("end", resolve)
      .output(tempSongPath)
      .run()
  );

  setJobProgress(id, 66);

  await new Promise<void>((resolve, reject) =>
    ffmpeg(tempVideoPath)
      .input(tempSongPath)
      .videoCodec("copy")
      .audioCodec("aac")
      .on("end", () => resolve())
      .on("stderr", (stderrLine) => {
        console.log("Stderr output: " + stderrLine);
      })
      .output(tempOutputVideoPath)
      .outputOptions(["-shortest", "-map 0:v:0", "-map 1:a:0"])
      .run()
  );

  setJobProgress(id, 99);
  setTimeout(setJobProgress, 500, id, 100);

  return `${id}-output${extension}`;
};

export const startJob = (
  jobArgs: JobArguments,
  wantedId?: string,
  jobs = _jobs
): string => {
  const id = wantedId ?? nanoid();

  jobs[id] = { progress: 0, promise: _jobProcess(id, jobArgs) };
  return id;
};
