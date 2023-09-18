import type { Context } from "hono";
import { ErrorComponent } from "./error.component";

export const errorHandler = async (
  c: Context,
  song?: string,
  climax?: string,
  video?: File
) => {
  // validate default input
  if (!song || !climax || !video) {
    if (!video) {
      return c.html(<ErrorComponent message="No video specified." />);
    }
    if (!song) {
      return c.html(<ErrorComponent message="No song specified." />);
    }
    if (!climax) {
      return c.html(<ErrorComponent message="No climax specified." />);
    }
  }

  return null;
};
