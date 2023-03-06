const { Telegraf } = require('telegraf');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const { loadlib, createJsonBase } = require('./index')(bot);

loadlib('profile', "/test");

createJsonBase()

bot
.launch({dropPendingUpdates: true})
.then(() => console.log('Бот запущен!!'))
.catch((err) => console.error(err));