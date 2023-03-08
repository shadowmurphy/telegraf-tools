const { Telegraf } = require('telegraf');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const { loadlib, createJsonBase, logger } = require('./index')(bot);

loadlib('test', "/test");

loadlib('jsonbase', "/src");

bot.context.users = new bot.context.jsonbase.Users(() => ({
    is_admin: false
}))

bot
.use(async (ctx, next) => {
    if (!ctx.from) return;
    ctx.user = ctx.users.get(ctx.from, true)
    return next()
})

bot
.launch({dropPendingUpdates: true})
.then(logger.log('Бот запущен!', {
    red: "Бот запущен!"
}))
.catch((err) => console.error(err));