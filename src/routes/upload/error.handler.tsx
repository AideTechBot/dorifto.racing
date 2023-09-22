import type { Context } from "hono";
import { ErrorComponent } from "./error.component";

export const errorHandler = async (
  c: Context,
  song?: any,
  climax?: any,
  video?: any
) => {
  // validate default input
  if (!song || !climax || !video) {
    if (!video || typeof video === "string") {
      return c.html(<ErrorComponent message="No video specified." />);
    }
    if (!song || typeof song !== "string") {
      return c.html(<ErrorComponent message="No song specified." />);
    }
    if (!climax || typeof climax !== "string") {
      return c.html(<ErrorComponent message="No climax specified." />);
    }
  }

  return null;
};
