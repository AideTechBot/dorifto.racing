export type Job = {
  progress: number;
  promise: Promise<string>;
};

export type JobArguments = {
  song: number;
  climax: number;
  video: File;
  otherSong?: { audio: File; drop: number };
};

export type Jobs = Record<string, Job>;
