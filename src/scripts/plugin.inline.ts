import * as AsciinemaPlayer from "asciinema-player";
import type { AsciinemaPlayerOptions } from "../types";

export function asciinemaMain() {
  document.querySelectorAll('[data-asciinema-cast]').forEach((container: Element) => {
    const castAttribute = container.getAttribute('data-asciinema-cast');
    const optionsAttribute = container.getAttribute('data-asciinema-options');

    if (castAttribute) {
      var options: AsciinemaPlayerOptions = {};
      try {
        if (optionsAttribute) {
          options = JSON.parse(optionsAttribute);
        }
      } catch {
        console.warn(`[Asciinema] Failed to parse Asciinema player options`);
      } finally {
        AsciinemaPlayer.create(castAttribute, container as HTMLElement, options);
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", asciinemaMain);
