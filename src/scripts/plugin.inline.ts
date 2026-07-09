import type { AsciinemaOptions, AsciinemaPlayer as PlayerType } from "../types";

import * as AsciinemaPlayer from "asciinema-player"

var players: Array<PlayerType> = []

function asciinemaClose() {
  players.forEach((instance: PlayerType) => {
    instance.player.dispose();
    instance.container.removeEventListener("nav", asciinemaMain)
  })
}

function asciinemaLoad() {
  document.querySelectorAll('[data-asciinema-cast]').forEach((container: Element) => {
    if (container.hasChildNodes()) return;

    const castAttribute = container.getAttribute('data-asciinema-cast');
    const optionsAttribute = container.getAttribute('data-asciinema-options');

    if (castAttribute) {
      var options: AsciinemaOptions = {};
      try {
        if (optionsAttribute) {
          options = JSON.parse(optionsAttribute);
        }
      } catch {
        console.warn(`[Asciinema] Failed to parse Asciinema player options`);
      } finally {
        const player = AsciinemaPlayer.create(castAttribute, container as HTMLElement, options);
        players.push({ player: player, container: container })
      }
    }
  });
}

function asciinemaMain() {
  asciinemaClose();
  asciinemaLoad();
}

document.addEventListener("nav", asciinemaMain);
document.addEventListener("render", asciinemaMain);
