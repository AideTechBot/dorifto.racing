import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { homePageHandler } from "./routes/home-page/home-page.handler";
import { otherUploadHandler } from "./routes/other-upload/other-upload.handler";
import { uploadHandler } from "./routes/upload/upload.handler";
import { jobsProgressHandler } from "./routes/jobs/jobs-progress.handler";
import { jobsHandler } from "./routes/jobs/jobs.handler";

const app = new Hono();

// Serve static files from the `public` folder
app.use("*", serveStatic({ root: "./public" }));
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

// Log all requests
app.use("*", logger());

// Map all route endpoint handlers
app.get("/", homePageHandler);
app.get("/other-upload", otherUploadHandler);
app.post("/upload", uploadHandler);
app.get("/jobs/:id/progress", jobsProgressHandler);
app.get("/jobs/:id", jobsHandler);

export default app;
