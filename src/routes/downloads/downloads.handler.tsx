import { TEMP_FILE_DIRECTORY } from "utils/constants";
import { Context, Next } from "hono";

export const downloadsHandler = async (c: Context, next: Next) => {
  const fileName = c.req.param("file");
  const file = Bun.file(`${TEMP_FILE_DIRECTORY}/${fileName}`);
  if (!(await file.exists())) {
    c.status(404);
    return c.body("File not found");
  }
  return new Response(file, {
    headers: {
      "Content-Disposition": `attachment; filename=\"${fileName}\"`,
      "Content-Length": `${file.size}`,
      "Content-Type": `application/stream`,
      "Cache-Control": `private`,
    },
  });
};
