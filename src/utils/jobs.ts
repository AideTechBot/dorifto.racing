import { nanoid } from "nanoid";
import type { Job, JobArguments, Jobs } from "./jobs.types";

import ffmpeg from "fluent-ffmpeg";
import { SONG_CLIMAXES, TEMP_FILE_DIRECTORY } from "utils/constants";
import path from "node:path";
import { saveFile } from "utils/jobs.utils";
import { log } from "utils/logger";

const _jobs: Jobs = {};

export const getJob = (id: string, jobs = _jobs): Job | undefined => jobs[id];

export const setJobProgress = (id: string, progress: number, jobs = _jobs) => {
  jobs[id] = { ...jobs[id], progress };
};

const _jobProcess = async (
  id: string,
  jobArgs: JobArguments
): Promise<string> => {
  log(`[${id}] Started job`);

  const { video, song, climax, otherSong } = jobArgs;
  const hasUploadedSong = song === 12 && !!otherSong;
  const { name } = video;
  const extension = path.extname(name);
  const startPoint = hasUploadedSong
    ? otherSong.drop - climax
    : SONG_CLIMAXES[song] - climax;
  const tempSongPath = `${TEMP_FILE_DIRECTORY}/${id}.mp3`;
  const songPath = hasUploadedSong
    ? `${TEMP_FILE_DIRECTORY}/${id}-upload.mp3`
    : `./songs/${song}.mp3`;
  const tempVideoPath = `${TEMP_FILE_DIRECTORY}/${id}${extension}`;
  const tempOutputVideoPath = `${TEMP_FILE_DIRECTORY}/${id}-output${extension}`;

  await Promise.all([
    saveFile(video, tempVideoPath),
    hasUploadedSong ? saveFile(otherSong.audio, songPath) : Promise.resolve(),
  ]);

  setJobProgress(id, 33);

  await new Promise<void>((resolve, reject) =>
    ffmpeg(songPath)
      .seekInput(startPoint)
      .on("error", reject)
      .on("start", (commandLine) => {
        log(`[${id}] Spawned FFMPEG with command: ${commandLine}`);
      })
      .on("stderr", (stderrLine) => {
        log(`[${id}] FFMPEG: ${stderrLine}`);
      })
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
      .on("stderr", (stderrLine) => {
        log(`[${id}] FFMPEG: ${stderrLine}`);
      })
      .on("end", () => resolve())
      .output(tempOutputVideoPath)
      .outputOptions(["-shortest", "-map 0:v:0", "-map 1:a:0"])
      .run()
  );

  setJobProgress(id, 99);
  setTimeout(setJobProgress, 500, id, 100);

  const returnFile = `${id}-output${extension}`;
  log(`[${id}] Ended job with file ${returnFile}`);
  return returnFile;
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
