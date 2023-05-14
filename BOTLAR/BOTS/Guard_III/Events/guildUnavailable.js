const { ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildUnavailable {
  Event = "guildUnavailable"
  async run(guild) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value() === true && guild.id === ayarlar.guildID) try {
      ytKapat(guild.id)
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Sunucu Koruması').setDescription(`Sunucu ulaşılamaz hale geldiği için güvenlik sebebiyle yetkiler kapatıldı!`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => channel.guild.owner.send({ embeds: [log] })); } else { channel.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildUnavailable;