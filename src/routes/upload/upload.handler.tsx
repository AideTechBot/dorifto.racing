import type { Context } from "hono";
import { errorHandler } from "./error.handler";
import { videoHandler } from "./video.handler";

export const uploadHandler = async (c: Context) => {
  const {
    song,
    ["climax-time"]: climax,
    video,
    audio,
    ["song-drop"]: drop,
  } = await c.req.parseBody();

  const error = await errorHandler(c, song, climax, video, audio, drop);

  // validate default input
  if (error) {
    return error;
  }

  return videoHandler(
    c,
    +song,
    +climax,
    video as File,
    audio && drop
      ? {
          audio: audio as File,
          drop: +drop,
        }
      : undefined
  );
};
