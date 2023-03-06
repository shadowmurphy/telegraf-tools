<div align="center">

  <p>
    <img src="https://cdn-icons-png.flaticon.com/512/9898/9898172.png" alt="icon" width="128" height="128">
  </p>

  <h1>Telegraf-tools</h1>

  <p>Пакет который включает в себя множество дополнений для удобной работы с библиотекой Telegraf, данный пакет упростит работу с кодом, а так-же улучшит его функциональность.</p>
</div>


## Установка

Установка через node:

```shell
$ npm i telegraf-tools
```

Импортируйте модуль:

```js
const { loadlib, logger } = require('telegraf-tools')(bot);
```

Пример использования loadlib:

```js
const { Telegraf } = require('telegraf');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const { loadlib } = require('telegraf-tools')(bot);

// Важно, если путь к файлу в корне проекта то не используйте path, если он находится в какой либо папке "/path/path"
// with path

loadlib('filename', "/path");

// withou path

loadlib('filename');

bot
.launch({dropPendingUpdates: true})
.then(() => console.log('Бот запущен!'))
.catch((err) => console.error(err));
```

Пример использования logger:

```js
const { Telegraf } = require('telegraf');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const { logger } = require('telegraf-tools');

logger.log("Привет, меня зовут murphyy", {
    red: "Привет,",
    blue: "меня зовут murphyy"
})

bot
.launch({dropPendingUpdates: true})
.then(() => console.log('Бот запущен!'))
.catch((err) => console.error(err));
```

Пример использования JsonBase:

```js
const { Telegraf } = require('telegraf');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const { createJsonBase } = require('telegraf-tools');

createJsonBase()

bot.context.user = bot.context.tools.Users(() => {
    is_admin: false,
    // etc
})

bot.context.chats = bot.context.tools.JsonBase("filename", [])

// Создается файл filename.json с пустым массивом в папку database, если ее нету создает собственоручно

bot
.launch({dropPendingUpdates: true})
.then(() => console.log('Бот запущен!'))
.catch((err) => console.error(err));
```

Так-же вы можете упростить задачу транспартировки базы данных:

```js
bot
.use((ctx, next) => {
    if (!ctx.from) return;
    ctx.user = ctx.users.get(ctx.from, true);
    return next();
})
```

методы JsonBase:

```js
const user = ctx.users.get(ctx.from, true); // если нужно создавать пользователя true, если нет ничего не пишем

user.edit("key", "value"); // изменить параметр в базе данных пользователя

users.getArray(); // получить базу данных пользователей в виде массива
```
