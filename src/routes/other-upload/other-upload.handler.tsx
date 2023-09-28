import type { Context } from "hono";
import { OtherUpload } from "./other-upload.component";

export const otherUploadHandler = (c: Context) => {
  // TODO: implement this
  // If other is selected
  if (c.req.query("song") === "12") {
    return c.html(<OtherUpload />);
  }
  return c.html(<></>);
};
