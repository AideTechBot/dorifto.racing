import type { Context } from "hono";
import { MessageComponent } from "utils/message.component";
import { ALLOWED_TYPES } from "utils/constants";
import path from "node:path";

export const errorHandler = async (
  c: Context,
  song?: any,
  climax?: any,
  video?: any
) => {
  // validate default input
  if (!song || !climax || !video) {
    if (!video || typeof video === "string") {
      return c.html(<MessageComponent message="No video specified." />);
    }
    if (!song || typeof song !== "string") {
      return c.html(<MessageComponent message="No song specified." />);
    }
    if (!climax || typeof climax !== "string") {
      return c.html(<MessageComponent message="No climax specified." />);
    }
  }

  if (!ALLOWED_TYPES.has(path.extname((video as File)?.name ?? ""))) {
    return c.html(<MessageComponent message="File type not allowed." />);
  }
  return null;
};
