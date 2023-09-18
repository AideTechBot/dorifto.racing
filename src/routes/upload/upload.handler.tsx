import type { Context } from "hono";
import { errorHandler } from "./error.handler";

export const uploadHandler = async (c: Context) => {
  const {
    song,
    ["climax-time"]: climax,
    video,
    audio,
    ["song-drop"]: drop,
  } = await c.req.parseBody();

  const error = await errorHandler(
    c,
    song as string | undefined,
    climax as string | undefined,
    video as File | undefined
  );

  // validate default input
  if (error) {
    return error;
  }

  // case if song was uploaded
  if (audio && drop) {
    return c.html(<>Audio & Video</>);
  }

  return c.html(<>Video</>);
};
