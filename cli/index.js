#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");

const name = chalk.bold.green("Vinit Shahdeo");
const work = chalk.yellowBright("Engineering Lead @ ZZAZZ • GitHub Star • ex-Postman, Novo");
const twitter = chalk.cyan("https://twitter.com/vinit_shahdeo");
const github = chalk.cyan("https://github.com/vinitshahdeo");
const portfolio = chalk.cyan("https://vinitshahdeo.com");

// Responsive box width based on terminal columns
const width = Math.min(80, Math.max(40, (process.stdout.columns || 80) - 10));

const card = boxen(
  [
    `${name}`,
    ``,
    `${work}`,
    ``,
    `${chalk.bold("Twitter (X):")} ${twitter}`,
    `${chalk.bold("GitHub:")} ${github}`,
    `${chalk.bold("Portfolio:")} ${portfolio}`,
  ].join("\n"),
  {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    width,
  }
);

// Minimal flag parsing
const argv = process.argv.slice(2);
const hasFlag = (f) => argv.includes(f);
const getFlagValue = (key) => {
  const prefix = `--${key}=`;
  const found = argv.find(a => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
};

// Env/TTY guards
const isCI = process.env.CI === 'true' || process.env.CI === '1';
const isInteractive = process.stdin.isTTY && process.stdout.isTTY;
const noAnim = hasFlag('--no-anim') || isCI || !isInteractive;

// Safe dynamic loader that works with CJS/ESM
async function load(mod) {
  try {
    const r = require(mod);
    return r.default || r;
  } catch {
    const m = await import(mod);
    return m.default || m;
  }
}

// Safer open with fallback printing
async function safeOpen(url) {
  try {
    const open = await load("open");
    await open(url);
  } catch {
    console.log(`\nCouldn’t open automatically. Here’s the link:\n${url}\n`);
  }
}

// -------------------------------------
// Animated banner (lazy figlet load)
// -------------------------------------
async function animateBanner(text, colors, cycles = 2, delay = 120) {
  for (let i = 0; i < cycles * colors.length; i++) {
    console.clear();
    console.log(colors[i % colors.length](text));
    await new Promise((r) => setTimeout(r, delay));
  }
}

const bannerColors = [
  chalk.greenBright,
  chalk.cyanBright,
  chalk.yellowBright,
  chalk.magentaBright,
  chalk.blueBright
];

// Fun greeting with optional animation
async function showGreeting() {
  if (!noAnim) {
    const figlet = await load("figlet");
    const bannerText = figlet.textSync("Hello there!", {
      font: "big",
      horizontalLayout: "default",
      verticalLayout: "default"
    });
    await animateBanner(bannerText, bannerColors, 2, 120);
  }
  console.log(chalk.bold.hex("#A3BE8C")(" Welcome to my tiny terminal tour ✨"));
  await new Promise((r) => setTimeout(r, 300));
  console.log(card);
}

// -------------------------------------
// Main
// -------------------------------------
(async () => {
  // Handle quick flags
  if (hasFlag('--help') || hasFlag('-h')) {
    console.log(`
Usage: vinit [options]

Options:
  --open=site|linkedin|github|twitter   Open a link directly and exit
  --no-anim                             Skip banner animation
  -h, --help                            Show this help
`);
    process.exit(0);
  }

  const openTarget = getFlagValue('open');
  if (openTarget) {
    const map = {
      site: portfolio.replace(chalk.cyan(''), '').replace(chalk.reset(''), ''),
      linkedin: "https://www.linkedin.com/in/vinitshahdeo/",
      github: "https://github.com/vinitshahdeo",
      twitter: "https://twitter.com/vinit_shahdeo",
    };
    const url = map[openTarget.toLowerCase()];
    if (url) {
      await safeOpen(url);
      process.exit(0);
    }
  }

  // Non-interactive fallback (e.g., CI or piped)
  if (!isInteractive) {
    console.log("\nQuick links:");
    console.log(`- Portfolio: ${portfolio}`);
    console.log(`- LinkedIn:  https://www.linkedin.com/in/vinitshahdeo/`);
    console.log(`- GitHub:    https://github.com/vinitshahdeo`);
    console.log(`- Twitter:   https://twitter.com/vinit_shahdeo\n`);
    process.exit(0);
  }

  // Graceful signal handling
  process.on('SIGTERM', () => {
    console.log("✋ Received SIGTERM. Bye!");
    process.exit(0);
  });

  try {
    await showGreeting();

    // Lazy load heavy/ESM deps just-in-time
    const inquirer = await load("inquirer");
    const ora = await load("ora");
    const cliSpinners = await load("cli-spinners");

    // Show loader before menu
    const menuLoader = ora({
      text: "Warming up the menu…",
      spinner: cliSpinners.dots,
      color: "green"
    }).start();

    setTimeout(() => {
      menuLoader.stop();

      inquirer
        .prompt([
          {
            type: "list",
            name: "action",
            message: "Where should we go next?",
            choices: [
              { name: "🌐 Visit my website", value: "site" },
              { name: "💼 See my LinkedIn", value: "linkedin" },
              { name: "🐙 Explore my GitHub", value: "github" },
              { name: "🐦 Say hi on Twitter (X)", value: "twitter" },
              { name: "👋 I’m done—exit", value: "exit" },
            ],
          },
        ])
        .then(async (answer) => {
          const showRedirectLoader = async (msg, url) => {
            const redirectLoader = ora({
              text: msg,
              spinner: cliSpinners.arrow3,
              color: "green"
            }).start();
            setTimeout(async () => {
              redirectLoader.succeed(msg);
              await safeOpen(url);
            }, 1200);
          };

          switch (answer.action) {
            case "site":
              await showRedirectLoader("Opening my portfolio—hope you like fast pages ⚡️", "https://vinitshahdeo.com");
              break;
            case "linkedin":
              await showRedirectLoader("Polishing shoes… marching to LinkedIn 👞", "https://www.linkedin.com/in/vinitshahdeo/");
              break;
            case "github":
              await showRedirectLoader("Summoning repos and stars ⭐️—to GitHub we go!", "https://github.com/vinitshahdeo");
              break;
            case "twitter":
              await showRedirectLoader("Tweet engines engaged—let’s connect on Twitter (X)! 🚀", "https://twitter.com/vinit_shahdeo");
              break;
            default:
              console.log("👋 Thanks for stopping by—see you around!");
          }
        })
        .catch((err) => {
          if (err && err.isTtyError) {
            console.log("Looks like this terminal can’t do interactive prompts. No worries!");
          } else if (err && err.message && err.message.includes("SIGINT")) {
            console.log("✋ Caught Ctrl+C. Take care and have a great day!");
          } else {
            console.log("Prompt closed. Until next time! 👋");
          }
          process.exitCode = 0;
        });

    }, 900);
  } catch (err) {
    if (err && err.message && err.message.includes("SIGINT")) {
      console.log("✋ Caught Ctrl+C. Take care and have a great day!");
      process.exitCode = 0;
    } else {
      console.log("Prompt closed. Until next time! 👋");
      process.exitCode = 0;
    }
  }
})();