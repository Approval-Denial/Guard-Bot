const Discord = require("discord.js");
const { ChannelWhitelist } = require("../../../Helpers/function")
const low = require("lowdb")
class channelUpdate {
  Event = "channelUpdate"
  async run(oldChannel, newChannel) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("channelGuard").value()) try {
      let entry = await newChannel.guild.fetchAuditLogs({ type: 'CHANNEL_UPDATE' }).then(audit => audit.entries.first());
      if (!entry || entry.createdTimestamp <= Date.now() - 5000 || !newChannel.guild.channels.cache.has(newChannel.id) || await ChannelWhitelist(entry.executor.id)) return;
      await newChannel.guild.members.ban(entry.executor.id, { reason: "Kanal Ayarlarını Güncellediği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      if (newChannel.type !== "GUILD_CATEGORY" && newChannel.parentId !== oldChannel.parentId) newChannel.setParent(oldChannel.parentId);
      if (newChannel.type === "GUILD_CATEGORY") {
        await newChannel.edit({
          position: oldChannel.position,
          name: oldChannel.name,
        });
      } else if (newChannel.type === "GUILD_TEXT" || (newChannel.type === 'GUILD_NEWS')) {
        await newChannel.edit({
          name: oldChannel.name,
          position: oldChannel.position,
          topic: oldChannel.topic,
          nsfw: oldChannel.nsfw,
          rateLimitPerUser: oldChannel.rateLimitPerUser,
        });
      } else if (newChannel.type === "GUILD_VOICE") {
        await newChannel.edit({
          name: oldChannel.name,
          position: oldChannel.position,
          bitrate: oldChannel.bitrate,
          userLimit: oldChannel.userLimit,
        });
      };
      const logs = client.channels.cache.get(utils.get("channelLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Kanal Güncelleme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından kanal güncellendi! Kanalı güncelleyen kişiyi sunucudan attım ve kanalı eski haline getirdim.\nGüncellenen Kanal: \`${oldChannel.name}\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => newChannel.guild.owner.send({ embeds: [log] })); } else { newChannel.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = channelUpdate