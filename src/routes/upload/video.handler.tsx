import { startJob } from "utils/jobs";
import type { Context } from "hono";

export const videoHandler = async (
  c: Context,
  song: number,
  climax: number,
  video: File
) => {
  // TODO: rate limit this
  // TODO: max file size here
  // TODO: limit file formats
  const id = startJob({ song, climax, video });
  return c.html(
    <div
      hx-trigger="done"
      hx-get={`/jobs/${id}`}
      hx-swap="outerHTML"
      hx-target="this"
    >
      <h1 role="status" id="pblabel" tabindex="-1" autofocus>
        Processing video...
      </h1>
      <div
        hx-get={`/jobs/${id}/progress`}
        hx-trigger="every 600ms"
        hx-target="this"
        hx-swap="innerHTML"
      >
        <div
          class="progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
          aria-labelledby="pblabel"
        >
          <div id="pb" class="progress-bar" style="width:0%" />
        </div>
      </div>
    </div>
  );
};
