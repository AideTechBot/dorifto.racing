import { getJob } from "utils/jobs";
import { Context } from "hono";
import { MessageComponent } from "utils/message.component";

export const jobsProgressHandler = async (c: Context) => {
  const id = c.req.param("id");
  const job = getJob(id);
  if (!job) {
    c.status(404);
    return c.html(
      <MessageComponent
        message="Job not found."
        linkTitle="Back to home page"
      />
    );
  }
  const { progress } = job;

  if (progress === 100) {
    c.header("HX-Trigger", "done");
  }

  return c.html(
    <div
      class="progress"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={progress}
      aria-labelledby="pblabel"
    >
      <div id="pb" class="progress-bar" style={`width:${progress}%`} />
    </div>
  );
};
