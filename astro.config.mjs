import { defineConfig } from "astro/config";
import { BASE } from "./src/consts.ts";
// https://astro.build/config
export default defineConfig({
  site: "https://rogierderuijter.github.io",
  base: BASE,
});
