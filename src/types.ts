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
 * All options including custom stylesheet definition
 * ```
 * style: "border: 1px solid var(--lightgray) !important;" # add border
 * ```
 **/
export interface AsciinemaOptions extends AsciinemaPlayerOptions {
  /// Custom stylesheet to apply to asciicast containers
  style?: string,
}

/**
 * Options passed in markdown frontmatter. See example below
 * ```yaml
 * ---
 * asciinema:
 *   terminalFontFamily: "'FiraCode Nerd Font', monospace"
 *   theme: "dracula"
 *   loop: true
 *   autoplay: true
 * created: 2026-07-08
 * title: "Example note"
 * ---
 * ```
 **/
export interface AsciinemaFrontmatterOptions {
  asciinema?: AsciinemaOptions | boolean,
}
