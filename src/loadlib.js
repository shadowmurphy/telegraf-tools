const fs = require('fs');

const logDirectory = `${process.mainModule.path}/logs`;

if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

const logFile = fs.createWriteStream(`${logDirectory}/loadLib.log`, { flags: 'a' });

const log = (level, message) => {
  const timestamp = new Date().toISOString(),
    log = `\x1b[2m${timestamp}\x1b[0m \x1b[90m[\x1b[0m${level}\x1b[90m] ${message}`;
  logFile.write(`${removeAnsi(log)}\n`);
  console.log(log)
};
const info = (message) => log('\x1b[31mINFO', message);
const error = (message) => log('\x1b[31mERROR', message);

const removeAnsi = (text) => text.replace(/[\u001b][[()#;?]*([0-9]{1,2}(;[0-9]{1,2})*)?[0-9A-PR-T]*[@-~]/g, '');

module.exports = (bot) => {
  const loadlib = function(filename, defaultPath){
    info(`\x1b[2mLoading library: ${filename}\x1b[0m...`);
    const result = require(`${process.mainModule.path}${defaultPath ?? ''}/${filename}.js`)(bot);
    if (result) bot.context[filename] = result;
    info(`\x1b[32mLibrary \x1b[90m[\x1b[36m\x1b[1m${filename}\x1b[0m\x1b[90m]\x1b[32m loaded successfully.\x1b[0m`);
  };
  return {
    loadlib,
    createJsonBase: () => loadlib("jsonbase", `/node_modules/telegraf-tools/src`)
  }
};