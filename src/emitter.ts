import type { QuartzEmitterPlugin, BuildCtx, FilePath } from "@quartz-community/types";
import { joinSegments } from "@quartz-community/types";
import { mkdir, writeFile } from "fs/promises";

// @ts-expect-error - inline script import handled by Quartz bundler
import asciinemaScript from "./scripts/plugin.inline.js";
import asciinemaStyle from "./styles/plugin.scss";

export const AsciinemaEmitter: QuartzEmitterPlugin = () => {
  return {
    name: "AsciinemaEmitter",
    async *emit(ctx: BuildCtx) {
      const dirPath: FilePath = joinSegments(ctx.argv.output, "static");
      const scriptPath: FilePath = joinSegments(dirPath, "asciinema-run.js");
      const stylePath: FilePath = joinSegments(dirPath, "asciinema-style.css");

      await mkdir(dirPath, { recursive: true });
      await writeFile(scriptPath, asciinemaScript);
      yield scriptPath;
      await writeFile(stylePath, asciinemaStyle);
      yield stylePath;
    }
  }
}
