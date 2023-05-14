const Discord = require("discord.js");
const { ChannelWhitelist, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class channelCreate {
  Event = "channelCreate"
  async run(channel) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("channelGuard").value() === true) try {
      let entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || await ChannelWhitelist(entry.executor.id)) return;
      await channel.delete({ reason: "Kanal Oluşturma Koruması" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      ytKapat(channel.guild.id)
      await channel.guild.members.ban(entry.executor.id, { reason: "Kanal Açtığı İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      const logs = client.channels.cache.get(utils.get("channelLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Kanal Oluşturma Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından kanal oluşturuldu! Kanalı oluşturan kişiyi sunucudan attım ve kanalı sildim.\nOluşturulan Kanal: \`${channel.name}\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => channel.guild.owner.send({ embeds: [log] })); } else { channel.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}
module.exports = channelCreate;