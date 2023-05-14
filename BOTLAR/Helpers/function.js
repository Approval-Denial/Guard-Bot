const Users = require("../Database/Users");
const fetch = require("node-fetch");
const roleBackup = require("../Database/Role")
const allowedFormats = ["webp", "png", "jpg", "jpeg", "gif"];
const allowedSizes = Array.from({ length: 9 }, (e, i) => 2 ** (i + 4));
const voiceUser = require("../Database/Stats/voiceUser");
const voiceGuild = require("../Database/Stats/voiceGuild");
const guildChannel = require("../Database/Stats/voiceGuildChannel");
const userChannel = require("../Database/Stats/voiceUserChannel");
const userParent = require("../Database/Stats/voiceUserParent");
const {whiteListFull, whiteListRoles, whiteListChannels, bankickwh, Bots} = require("../Settings/guard.json")
const low = require("lowdb")
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  async Fullgüvenli(kisiID) {
    const guild = await client.guilds.cache.get(ayarlar.guildID)
    const uye = await client.users.cache.get(kisiID);
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId || whiteListFull.some(g => g.includes(uye.id)) || Bots.some(g => g.includes(uye.id))) return true
    else return false;
  }, async ownSafe(kisiID) {
    const guild = await client.guilds.cache.get(ayarlar.guildID)
    const uye = await client.users.cache.get(kisiID);
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId || require("../Settings/ayarlar.json").Owners.some(g => g.includes(uye.id)) || Bots.some(g => g.includes(uye.id))) return true
    else return false;
  },
  async RolWhitelist(kisiID) {
    const guild = await client.guilds.cache.get(ayarlar.guildID)
    const uye = await client.users.cache.get(kisiID);
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId || whiteListFull.some(g => g.includes(uye.id)) || whiteListRoles.some(g => g.includes(uye.id)) || Bots.some(g => g.includes(uye.id))) return true
    else return false;
  },
  async ChannelWhitelist(kisiID) {
    const guild = await client.guilds.cache.get(ayarlar.guildID)
    const uye = await client.users.cache.get(kisiID);
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId || whiteListFull.some(g => g.includes(uye.id)) || whiteListChannels.some(g => g.includes(uye.id)) || Bots.some(g => g.includes(uye.id))) return true
    else return false;
  },
  async BanKickWhitelist(kisiID) {
    const guild = await client.guilds.cache.get(ayarlar.guildID)
    const uye = await client.users.cache.get(kisiID);
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId|| whiteListFull.some(g => g.includes(uye.id)) || bankickwh.some(g => g.includes(uye.id))|| Bots.some(g => g.includes(uye.id))) return true
    else return false;
  },
  async ytKapat(guildID) {
    const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"]
    const guild = client.guilds.cache.get(guildID)
    guild.roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));
  },
  checkDays(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " gün" : " gün") + " önce";
  },
  sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  }
}