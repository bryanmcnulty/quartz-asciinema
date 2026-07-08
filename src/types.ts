import type { CSSResource, JSResource } from "@quartz-community/types";

/**
 * Asciinema player options.
 * See the Asciinema docs for more info: https://docs.asciinema.org/manual/player/options/
 **/
export interface AsciinemaPlayerOptions {
  cols?: number,
  rows?: number,
  autoplay?: boolean,
  loop?: boolean | number,
  speed?: number,
  idleTimeLimit?: number,
  theme?: string,
  poster?: string,
  fit?: "width" | "height" | "both" | "none" | false,
  controls?: "auto" | true | false,
  keystrokeOverlay?: boolean,
  pauseOnMarkers?: boolean,
  terminalFontSize?: string,
  terminalFontFamily?: string,
  terminalLineHeight?: number,
  cursorMode?: "blinking" | "steady" | "hidden",
}

/**
 * All options
 **/
export interface AsciinemaOptions extends AsciinemaPlayerOptions {
  /// Custom stylesheet to apply to asciicast containers
  style?: string,
}

/**
 * Options passed in markdown frontmatter
 **/
export interface AsciinemaFrontmatterOptions {
  asciinema?: AsciinemaOptions | boolean,
}
