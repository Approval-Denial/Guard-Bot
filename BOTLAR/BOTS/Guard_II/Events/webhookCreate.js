const { ChannelWhitelist,ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class WebhookUpdate {
  Event = "webhookUpdate"
  async run(channel) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      const entry = await channel.guild.fetchAuditLogs({ type: 'WEBHOOK_CREATE', }).then(audit => audit.entries.first())
      if (!entry || entry.createdTimestamp <= Date.now() - 5000 || await ChannelWhitelist(entry.executor.id)) return;
      if (entry.target) await entry.target.delete()
      ytKapat(channel.guild.id)
      channel.guild.members.ban(entry.executor.id, { reason: "Webhook Açtığı İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - WebHook Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından webhook açıldı! Webhooku açan kişiyi sunucudan attım ve webhooku sildim.`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => channel.guild.owner.send({ embeds: [log] })); } else { channel.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}
module.exports = WebhookUpdate;