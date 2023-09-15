import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { homePageHandler } from "./routes/home-page/home-page.handler";

const app = new Hono();

// Serve static files from the `public` folder
// app.use("/styles/*", serveStatic({ root: "./public" }));
app.use("*", serveStatic({ root: "./public" }));
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

// Log all requests
app.use("*", logger());

// Map all route endpoint handlers
app.get("/", homePageHandler);

export default app;
