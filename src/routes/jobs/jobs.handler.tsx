import { getJob } from "utils/jobs";
import { Context, Next } from "hono";
import { MessageComponent } from "utils/message.component";

export const jobsHandler = async (c: Context, next: Next) => {
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

  const fileName = await job.promise;
  return c.html(
    <>
      <h2 class="download-button">
        <a href={`/downloads/${fileName}`}>Download</a>
      </h2>
      <h3 hx-boost="true">
        <a href="/">Upload another file</a>
      </h3>
    </>
  );
};
