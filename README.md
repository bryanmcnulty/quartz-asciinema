# quartz-asciinema

This plugin allows you to easily embed terminal session recordings (Asciinema casts) directly within your Quartz v5 site pages. It processes standard Markdown images referencing `.cast` files and passes the URL and optional player settings to [the official Asciinema player](https://docs.asciinema.org/manual/player/).

---

## Installation

To add this plugin to your Quartz project, run the following command in your terminal:

```bash
npx quartz plugin add github:bryanmcnulty/quartz-asciinema

```

---

## Usage

The plugin automatically detects and intercepts markdown image elements where either:

- The target URL file path ends with `.cast`
- The target is a [data: URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data) with the content type `application/x-asciicast`

### Embedding Casts

To embed a terminal cast URL, use standard Markdown image syntax:

```markdown
![](/assets/test.cast)
```

If you want to bundle short recordings directly inside your page without referencing external assets, you can embed them completely inline using a data: URL with the `application/x-asciicast` content type:

```markdown
![](data:application/x-asciicast;base64,eyJ2ZXJzaW9uIjozLCJ0ZXJtIjp7ImNvbHMiOjk2LCJyb3dzIjo4LCJ0eXBlIjoieHRlcm0tMjU2Y29sb3IiLCJ2ZXJzaW9uIjoibGlidnRlcm0oMC4zKSJ9LCJ0aW1lc3RhbXAiOjE3ODM1MTYwMTQsImNvbW1hbmQiOiJzaCIsImVudiI6e319ClswLjAwMiwgIm8iLCAiJCAiXQpbMC43MjAsICJvIiwgImUiXQpbMC4xNzgsICJvIiwgImMiXQpbMC4wNDUsICJvIiwgImgiXQpbMC4xNDcsICJvIiwgIm8iXQpbMC4wNTgsICJvIiwgIiAiXQpbMC4xMjQsICJvIiwgIjEiXQpbMC4xMTUsICJvIiwgIlxyXG4iXQpbMC4wMDAsICJvIiwgIjFcclxuJCAiXQpbMC42NTYsICJvIiwgIlxyXG4iXQpbMC4wMDAsICJ4IiwgIjAiXQo=)
```

### Configuration

Configuration options are applied with the following priority:

1. [Inline configuration](#inline-configuration) options are the highest priority and will override per-page and global settings
2. [Frontmatter configuration](#frontmatter-configuration) is scoped per markdown source and preferred over global configuration
3. [Global configuration](#global-configuration) is the lowest priority and acts as a generic configuration fallback

#### Inline Configuration

You can tweak players per-instance by passing configuration options as a JSON dictionary inside the alt text portion of the markdown image element:

```markdown
![{"speed": 1.5, "theme": "dracula"}](https://asciinema.org/a/180370.cast)
```

#### Frontmatter Configuration

Override global configuration options across an entire page by declaring them in the `asciinema` key in markdown frontmatter:

```yaml
---
title: "Terminal Configuration Reference"
asciinema:
  terminalFontFamily: "'FiraCode Nerd Font', monospace"
  theme: "dracula"
  loop: true
  autoplay: true
---
```

#### Global Configuration

Configure site-wide Asciinema player behavior in the Quartz configuration file

```yaml
plugins:
  # ...

  - source: github:bryanmcnulty/quartz-asciinema
    enabled: true
    options:
      autoplay: true
      loop: 2
      style: "border: 1px solid var(--lightgray) !important;" # add border (same as code blocks)
      terminalFontFamily: "'FiraCode Nerd Font', monospace"
    order: 50
```

---

## Options

Below are the options available to configure the player. You can pass these globally in your plugin registration, at the page level via frontmatter, or line-by-line via JSON alt fields.

| Option               | Type        | Description                                                                 |
| -------------------- | ----------- | --------------------------------------------------------------------------- |
| `cols`               | `number`    | Width of the terminal pane in columns.                                      |
| `rows`               | `number`    | Height of the terminal pane in rows.                                        |
| `autoplay`           | `boolean`   | Starts playback automatically when the player loads.                        |
| `loop`               | `boolean    | number`                                                                     | Enables infinite looping or specifies an exact number of loops. |
| `speed`              | `number`    | Adjusts playback speed multiplier (e.g., `2` for double speed).             |
| `idleTimeLimit`      | `number`    | Limits long pauses/idle times to a specific duration in seconds.            |
| `theme`              | `string`    | Applies a built-in terminal color theme (e.g., `"dracula"`).                |
| `poster`             | `string`    | Defines text or a frame image to display prior to playback.                 |
| `fit`                | `"width"    | "height"                                                                    | "both"                                                          | "none"                                                                     | false` | Sets how the terminal container behaves to fit within parent bounds. |
| `controls`           | `"auto"     | true                                                                        | false`                                                          | Controls visibility behavior of the interactive player controls dashboard. |
| `keystrokeOverlay`   | `boolean`   | Displays a visual overlay representing real-time keyboard inputs.           |
| `pauseOnMarkers`     | `boolean`   | Automatically halts playback when reaching predefined video timeline marks. |
| `terminalFontSize`   | `string`    | Defines CSS-compatible font sizing for terminal text outputs.               |
| `terminalFontFamily` | `string`    | Assigns CSS-compatible font families to rendering elements.                 |
| `terminalLineHeight` | `number`    | Custom spacing height configuration factor for text layout grids.           |
| `cursorMode`         | `"blinking" | "steady"                                                                    | "hidden"`                                                       | Styles the interactive shell input text cursor behavior.                   |
| `style`              | `string`    | Appends custom raw CSS styling directly onto individual container elements. |

---

## License

This plugin is available as open-source software under the terms of the **MIT License**.
