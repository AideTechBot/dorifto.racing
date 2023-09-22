import { getJob } from "utils/jobs";
import { Context } from "hono";

export const jobsHandler = async (c: Context) => {
  const id = c.req.param("id");
  const job = getJob(id);
  if (!job) {
    c.status(404);
    return c.html(<div>Job not found.</div>);
  }

  return c.html(<div>{`Job ID ${id} is done.`}</div>);
};
