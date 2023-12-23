import type { Context } from "hono";
import { MessageComponent } from "utils/message.component";
import { SONG_ALLOWED_TYPES, VIDEO_ALLOWED_TYPES } from "utils/constants";
import path from "node:path";
import { log } from "utils/logger";

const _ipList: Record<string, number> = {};

export const errorHandler = async (
  c: Context,
  song?: any,
  climax?: any,
  video?: any,
  audio?: any,
  drop?: any
) => {
  // Only works behind nginx
  var ip = c.req.header("X-Real-IP") || null;

  // 5 minute cooldown on this endpoint based on IP
  if (ip && _ipList[ip] && Date.now() - _ipList[ip] < 300000) {
    log(`Blocked IP ${ip}`);
    return c.html(
      <MessageComponent message="You can only upload once every 5 minutes." />
    );
  } else if (ip) {
    _ipList[ip] = Date.now();
    log(`Upload by IP ${ip} at ${_ipList[ip]}`);
  }

  if (!song || !climax || !video) {
    // Validate if params exist
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

  // Check for audio
  if ((audio && !drop) || (!audio && drop)) {
    return c.html(
      <MessageComponent message="Missing either uploaded audio or drop." />
    );
  }

  // Video type extension check
  if (!VIDEO_ALLOWED_TYPES.has(path.extname((video as File)?.name ?? ""))) {
    return c.html(<MessageComponent message="Video file type not allowed." />);
  }

  // Audio type extension check
  if (
    audio &&
    !SONG_ALLOWED_TYPES.has(path.extname((audio as File)?.name ?? ""))
  ) {
    return c.html(<MessageComponent message="Song file type not allowed." />);
  }

  // Video size check
  if ((video as File).size * 0.000001 > 100) {
    return c.html(
      <MessageComponent message="Video file too large. (>100MB)" />
    );
  }

  // Audio size check
  if (audio && (audio as File).size * 0.000001 > 100) {
    return c.html(
      <MessageComponent message="Audio file too large. (>100MB)" />
    );
  }

  return null;
};
