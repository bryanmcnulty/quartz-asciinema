import type { Options, Player } from "asciinema-player";

/**
 * All options including custom stylesheet definition
 * ```
 * style: "border: 1px solid var(--lightgray) !important;" # add border
 * ```
 **/
export interface AsciinemaOptions extends Options {
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

export interface AsciinemaPlayer {
  player: Player
  container: Element
}
export interface AsciinemaRuntime {
  players: Array<Player>
}
