const { Client, Intents } = require('discord.js');
const config = require("../Settings/config.json");
let Bots = global.bots = []
module.exports = Bots
config.tokens.forEach(token => {
  let clients = new Client({
    fetchAllMembers: true,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES,
    ],  presence: {
      activities: [ayarlar.durum],
      status: ayarlar.status
    },
  });
  clients.on("ready", () => {
    Bots.push(clients);
  })
  clients.login(token).then(e => {
  }).catch(e => {
    console.log(`${token.substring(Math.floor(token.length / 2))} Bota giriş yapılamadı.`);
  });
});
