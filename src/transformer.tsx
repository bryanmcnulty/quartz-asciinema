import type { AsciinemaOptions } from "./types";
import type { Image, Root } from "mdast"
import type { PluggableList } from "unified";
import type { QuartzTransformerPlugin, QuartzPluginData } from "@quartz-community/types";
import type { VFile } from "vfile";

import { visit } from "unist-util-visit";

const defaultOptions: AsciinemaOptions = {
  theme: 'quartz',
  style: 'border: 1px solid var(--lightgray) !important;',
}

export const AsciinemaTransformer: QuartzTransformerPlugin<Partial<AsciinemaOptions>> = (
  userOptions?: Partial<AsciinemaOptions>,
) => {
  const globalOptions: AsciinemaOptions = {
    ...defaultOptions,
    ...userOptions,
  }
  return {
    name: "AsciinemaTransformer",
    markdownPlugins(): PluggableList {
      const plugins: PluggableList = [
        () => {
          return (tree: Root, file: VFile) => {
            const fileLevelOptions: AsciinemaOptions = {
              ...globalOptions,
              ...file.data.frontmatter?.asciinema as AsciinemaOptions,
            }
            visit(tree, "image", (node: Image) => {

              if (/^(?:data:application\/x-asciicast;)|(?:[^?#]*\.cast(?:[#?]|$))/.test(node.url)) {
                file.data.asciinemaEnabled = true;
                node.data = node.data || {};

                const element = node.data as Record<string, any>;
                let instanceLevelOptions: AsciinemaOptions | undefined;

                try {
                  instanceLevelOptions = node.alt && JSON.parse(node.alt);
                } catch (error) {
                  if (!(error instanceof SyntaxError)) {
                    console.error(error);
                  }
                }
                const { style, ...options } = { ...fileLevelOptions, ...instanceLevelOptions };
                element.hName = "div";
                element.hProperties = {
                  "data-asciinema-cast": node.url,
                  "data-asciinema-options": JSON.stringify(options),
                  style, src: undefined, alt: undefined,
                }
              }
            });
          }
        },
      ];
      return plugins;
    },
    externalResources() {
      return {
        js: [
          {
            contentType: "external",
            spaPreserve: true,
            src: "/static/asciinema-run.js",
            loadTime: "afterDOMReady"
          }
        ],
        css: [
          {
            inline: false,
            content: "/static/asciinema-style.css",
            spaPreserve: true,
          }
        ],
        additionalHead: []
      };
    },
  };
};
