const Discord = require('discord.js');

const dotenv = require('dotenv');

dotenv.config();

/* Commands */
const play = require('./commands/play');
const stop = require('./commands/stop');
const queue = require('./commands/queue');
const help = require('./commands/help');
const clear = require('./commands/clear');
const notFound = require('./commands/notFound');

const Servers = require('./servers');

const bot = new Discord.Client();
const prefix = process.env.PREFIX;

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity(`${prefix}help`);
});

bot.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  if (!Servers.has(message.guild.id)) {
    Servers.add(message.guild.id, message);
  }

  const args = message.content.trim().split(' ');
  const cmd = args.shift().toLowerCase();

  switch (cmd) {
    case `${prefix}play`:
      await play(message, args);
      break;

    case `${prefix}stop`:
      await stop(message, args);
      break;

    case `${prefix}queue`:
      await queue(message);
      break;

    case `${prefix}help`:
      await help(message, args);
      break;

    case `${prefix}clear`:
      await clear(message, args);
      break;

    default:
      await notFound(message, args);
      break;
  }
});

process.on('SIGINT', () => {
  bot.destroy();

  console.log('\x1b[31mSIGINT\x1b[0m');

  process.exit(1);
});

process.on('SIGUSR2', () => {
  bot.destroy();

  console.log('\x1b[31mSIGUSR2\x1b[0m');

  process.exit(1);
});

bot.login(process.env.BOT_TOKEN);
