const Discord = require("discord.js");
const { ChannelWhitelist } = require("../../../Helpers/function")
const low = require("lowdb")
class ChannelOverwriteDelete {
  Event = "channelUpdate"
  async run(oldChannel, newChannel) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("channelGuard").value()) try {
      let entry = await newChannel.guild.fetchAuditLogs({ type: 'CHANNEL_OVERWRITE_DELETE' }).then(audit => audit.entries.first());
      if (!entry || entry.createdTimestamp <= Date.now() - 1000 || await ChannelWhitelist(entry.executor.id) || entry.target.id !== newChannel.id) return;
      newChannel.guild.members.ban(entry.executor.id, { reason: "Kanal İzinlerini Sildiği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      let logs = client.channels.cache.get(utils.get("channelLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Kanal İzin Silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından kanal güncellendi! Kanalı güncelleyen kişiyi sunucudan attım ve kanalı eski haline getirdim.\nGüncellenen Kanal: \`${oldChannel.name}\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => newChannel.guild.owner.send({ embeds: [log] })); } else { newChannel.guild.owner.send({ embeds: [log] }) }  
      await newChannel.permissionOverwrites.set(oldChannel.permissionOverwrites.cache.array());
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = ChannelOverwriteDelete