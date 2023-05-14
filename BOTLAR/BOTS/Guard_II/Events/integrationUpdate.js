const { Fullgüvenli, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class IntegrationsUpdate {
  Event = "guildIntegrationsUpdate"
  async run(guild) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      let entry = await guild.fetchAuditLogs({ type: 'INTEGRATION_UPDATE' }).then(audit => audit.entries.first())
      if (!entry || entry.createdTimestamp <= Date.now() - 5000 || await Fullgüvenli(entry.executor.id)) return;
      ytKapat(guild.id)

      guild.members.ban(entry.executor.id, { reason: "Entegrasyon Güncellediği İçin" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Entegrasyon Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından bir entegrasyon güncellendi! Entegrasyonu güncelleyen kişiyi sunucudan yasakladım!`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => guild.owner.send({ embeds: [log] })); } else { guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = IntegrationsUpdate