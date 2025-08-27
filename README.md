# Vinit Shahdeo — Interactive 

```bash
npx vinitshahdeo
```

An interactive, delightful CLI experience to explore my digital world—right from your terminal! 🚀
Enjoy a vibrant animated banner, a dynamic profile card, and instant access to all my key links. Whether you’re in a fancy terminal or a CI pipeline, you’ll get smart fallbacks and shortcuts for a seamless journey.

![vinitshahdeo-cli demo](./assets/vinitshahdeo-cli-demo.gif)


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

- `--open=site|linkedin|github|twitter` – open a destination directly and exit
- `--no-anim` – skip the animated banner (handy on slow terminals/SSH)
- `-h`, `--help` – show help

#### Examples

- `vinitshahdeo --open=github`

- `vinitshahdeo --no-anim`

> [!TIP]
> Using npx? Replace `vinitshahdeo` with `npx vinitshahdeo`.

![Vinit Shahdeo CLI](./assets/vinitshahdeo-cli-terminal-banner.png)