const { Client, Intents } = require('discord.js')
const FileSync = require('lowdb/adapters/FileSync');
const ayarlar = require("../../Settings/ayarlar.json")
const client = global.client = new Client({
  fetchAllMembers: true,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],  presence: {
    activities: [ayarlar.durum],
    status: ayarlar.status
  },
});
const config = require("../../Settings/config.json");
client.adapters = file => new FileSync(`../../Settings/${file}.json`);
require("../../Helpers/Utils")(client)
require("../../Helpers/Mongo").Mongoose.Connect()
client.handler.events(client, '/Events/', __dirname);
client.login(config.guard_1).then(() =>
  client.logger.log(`${client.user.tag} olarak giriş yapıldı!`)).catch((error) =>
    client.logger.error("Discord API Botun tokenini doğrulayamadı." + error));
client
  .on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
  .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info));
process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
});
process.on("unhandledRejection", err => {
  console.error("Promise Hatası: ", err);
});
