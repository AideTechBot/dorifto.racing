import type { Context } from "hono";
import { HomePage } from "./home-page.component";

export const homePageHandler = (c: Context) => {
  return c.html(<HomePage />);
};
