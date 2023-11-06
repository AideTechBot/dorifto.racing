export const SONG_OPTIONS = {
  "DEJA VU": 64,
  "RUNNING IN THE 90S": 24,
  "NIGHT OF FIRE": 41,
  "BACK ON THE ROCKS": 27,
  "DANCING (COOL VIBRATIONS)": 30,
  DOGFIGHT: 6,
  HEARTBEAT: 74,
  "I NEED YOUR LOVE": 32,
  "LOVE IS IN DANGER": 38,
  "NO ONE SLEEP IN TOKYO": 154,
  "RAGE YOUR DREAMS": 31,
  "REMEMBER ME": 28,
  OTHER: -1,
};

export const SONGS = Object.keys(SONG_OPTIONS);
export const SONG_CLIMAXES = Object.values(SONG_OPTIONS);

export const ALLOWED_TYPES = new Set([
  ".avi",
  ".flv",
  ".gif",
  ".h264",
  ".hevc",
  ".mov",
  ".mp4",
  ".mpeg",
  ".mkv",
  ".webm",
  ".wmv",
]);

export const TEMP_FILE_DIRECTORY = "./temp";
