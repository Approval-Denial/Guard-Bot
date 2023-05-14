
module.exports = async (client) => {

  const emojiler = global.emojiler = require("../Settings/emojiler.json")
  const kanallar = global.kanallar = require("../Settings/kanallar.json")
  const ayarlar = global.ayarlar = require("../Settings/ayarlar.json")
  const cevaplar = global.cevaplar = require("../Settings/replys")

 
  const capsEngel = global.capsEngel = /[^A-ZĞÜŞİÖÇ]/g;
  const emojiEngel = global.emojiEngel = /<a?:.+?:\d+>|[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
  const etiketEngel = global.etiketEngel = /<@!?&?\d+>/g;
  const urlEngel = global.urlEngel = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
  const inviteEngel = global.inviteEngel = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
 
  const Penalties = global.Penalties = require("../Database/Penalties")

  const Discord = global.Discord = require("discord.js");
  const Command = global.Command = require("./Command")
  const voice = global.voice = require("@discordjs/voice")
  const low = global.low = require("lowdb")

  client.handler = require('./Handler')
  client.logger = require("./Logger")

  Discord.Collection.prototype.array = function () {
    return [...this.values()]
  }
  Array.prototype.clear = function () {
    this.splice(0, this.length);
  }

  Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
    if (!format) {
      format = "dd MM yyyy - HH:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };

  client.Penalties = async (guildID, userID, Ceza, Aktif = true, Yetkili, Sebep, Zaman, Sure, kalkmazamani = undefined) => {
    let id = await Penalties.find({ guildID });
    id = id ? id.length + 1 : 1;
    return await new Penalties({ id, guildID, userID, Ceza, Aktif, Yetkili, Sebep, Zaman, Sure, kalkmazamani }).save();
  };

  Discord.GuildMember.prototype.setRoles = function (roles) {
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles)
  };

  Discord.GuildMember.prototype.kayıtRol = function (roles) {
    let newRoles;
    if (this.roles.cache.has(roller.tagRol) && this.roles.cache.has(roller.vipRol)) {
      newRoles = this.roles.cache.clone().filter(x => x.managed).map(x => x.id).concat(roles).concat(roller.tagRol).concat(roller.vipRol).concat(roller.etkinlik).concat(roller.çekiliş)
    } else if (this.roles.cache.has(roller.vipRol)) {
      newRoles = this.roles.cache.clone().filter(x => x.managed).map(x => x.id).concat(roles).concat(roller.vipRol).concat(roller.etkinlik).concat(roller.çekiliş)
    } else if (this.roles.cache.has(roller.tagRol)) {
      newRoles = this.roles.cache.clone().filter(x => x.managed).map(x => x.id).concat(roles).concat(roller.tagRol).concat(roller.etkinlik).concat(roller.çekiliş)
    } else {
      newRoles = this.roles.cache.clone().filter(x => x.managed).map(x => x.id).concat(roles).concat(roller.etkinlik).concat(roller.çekiliş)
    };
    return this.roles.set(newRoles)
  };

  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.bans.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  Discord.Guild.prototype.log = async function log(action, user, admin, channel, ceza, reason, Time) {
    const author = client.users.cache.get(admin)
    const uye = client.users.cache.get(user)
    channel = client.channels.cache.get(channel);
    const sure = Time || `-`
    if (channel) {
      channel.send({ embeds: [new Discord.MessageEmbed().setAuthor(author.tag, author.avatarURL({ dynamic: true })).setColor("RANDOM").setTitle(action).setDescription(`**Üye:** ${uye.tag} (${uye.id})\n**Yetkili:** ${author.tag} (${author.id})\n**Tarih:** ${new Date(Date.now()).toTurkishFormatDate()}\n**Süre:** ${sure}\n**Sebep:** ${reason}`).setThumbnail(uye.avatarURL({ dynamic: true })).setTimestamp().setFooter(`Kasa Numarası: #${ceza}`, client.user.avatarURL())] })
    }
  }

  Discord.Guild.prototype.unlog = async function unlog(action, user, admin, channel, ceza) {
    const author = client.users.cache.get(admin)
    const uye = client.users.cache.get(user)
    channel = client.channels.cache.get(channel);
    if (channel) {
      channel.send({ embeds: [new Discord.MessageEmbed().setAuthor(author.tag, author.avatarURL({ dynamic: true })).setTitle(action).setColor("RANDOM").setDescription(`**Üye:** ${uye.tag} (${uye.id})\n**Yetkili:** ${author.tag} (${author.id})\n**Tarih:** ${new Date(Date.now()).toTurkishFormatDate()}`).setThumbnail(uye.avatarURL({ dynamic: true })).setTimestamp().setFooter(`Kasa Numarası: #${ceza}`, client.user.avatarURL())] })
    }
  }

  Array.prototype.chunk = function (chunk_size) {
    let myArray = Array.from(this);
    let tempArray = [];
    for (let index = 0; index < myArray.length; index += chunk_size) {
      let chunk = myArray.slice(index, index + chunk_size);
      tempArray.push(chunk);
    }
    return tempArray;
  }

}
