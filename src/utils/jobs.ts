import { nanoid } from "nanoid";

type Job = {
  progress: number;
};

const _jobs: Record<string, Job> = {};

export const getJob = (id: string, jobs = _jobs): Job | undefined => jobs[id];

export const startJob = (wantedId?: string, jobs = _jobs): string => {
  const id = wantedId ?? nanoid();
  jobs[id] = { progress: 0 };

  const fakeProcess = () => {
    const oldProgress = jobs?.[id]?.progress;
    if (oldProgress < 100) {
      jobs[id] = { progress: oldProgress + 5 };
      setTimeout(fakeProcess, 600);
    }
  };

  fakeProcess();
  return id;
};
