# Vinit Shahdeo — Interactive CLI

A tiny, friendly terminal tour that launches Vinit’s links with flair.  
It features an animated banner, a responsive profile card, smart fallbacks for CI/non-TTY, and quick flags to jump straight to your destination.

```bash
npx vinitshahdeo
```


## ✨ Features

- Color-cycling banner (disable with `--no-anim`)
- Interactive menu (Inquirer) with smooth loaders
- One-shot flags to open a link directly
- Non-interactive fallback (prints quick links in CI/no-TTY)
- Safer URL opening with copyable fallback
- Responsive card width based on your terminal size
- Clean exit codes and signal handling


## 🔧 Requirements

- **Node.js 18+**
- A terminal that supports Unicode for best results (emoji/box drawing)


## 🚀 Quick Start

### Run without installing
```bash
npx vinitshahdeo
```


### Install globally
```
npm i -g vinitshahdeo
```

The global binary is exposed as `vinitshahdeo`.


### 🧭 Usage

`vinitshahdeo [options]`

#### Options
	•	--open=site|linkedin|github|twitter – open a destination directly and exit
	•	--no-anim – skip the animated banner (handy on slow terminals/SSH)
	•	-h, --help – show help

#### Examples

vinitshahdeo --open=github
vinitshahdeo --no-anim

> [!TIP]
> Using npx? Replace vinitshahdeo with `npx vinitshahdeo`.


## 🧪 Non-interactive / CI mode

When there’s no interactive TTY (e.g., CI pipelines or piped output), the CLI:
	•	Prints Quick Links to the console
	•	Exits with code 0

## 🎨 Colors

Respects common color environment variables:
	•	NO_COLOR – disable colors
	•	FORCE_COLOR=1 – force colors on

## 🐞 Troubleshooting
	•	“Couldn’t open automatically”
Don’t worry—we print the URL so you can copy/paste it.
	•	Weird card wrapping
Narrow terminals may wrap the profile card. Resize the window or zoom out, or just use --no-anim for a simpler experience.
	•	Signals (Ctrl+C, CI timeouts)
The CLI exits cleanly and returns 0 for graceful stops.


## 🔒 License

MIT © Vinit Shahdeo

