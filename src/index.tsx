import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();

// Serve static files from the `public` folder
app.use("/styles/*", serveStatic({ root: "./public" }));
app.use("/public/*", serveStatic({ root: "./public" }));
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

// Log all requests
app.use("*", logger());

// Map all route endpoint handlers
app.get("/", (c) => c.html(<div>Hello World!</div>));

export default app;
