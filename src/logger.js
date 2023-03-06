exports = {};

const log = (text, extra = {}) => {
  return console.log(text);
};

const ansiColors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
  darkGrey: "\x1b[90m",
};

exports = {};

exports.log = (text, extra = {}) => {
  if (typeof text !== 'string') return console.error('\x1b[31m', 'Error: First argument must be a string', '\x1b[0m');
  if (typeof extra !== 'object' || extra === null) return console.error('\x1b[31m', 'Error: Second argument must be an object', '\x1b[0m');

  let output = text;

  for (let color in extra) {
    if (!ansiColors[color]) {
      console.error('\x1b[31m', `Error: Invalid color "${color}"`, '\x1b[0m');
      continue;
    }

    const regex = new RegExp(`(${extra[color].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g');
    output = output.replace(regex, `${ansiColors[color]}$1${ansiColors.reset}`);
  }

  console.log(output);
};

module.exports = exports;