const { BanKickWhitelist, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class InviteDelete {
  Event = "inviteDelete"
  async run(invite) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      const entry = await invite.guild.fetchAuditLogs({ type: 'INVITE_DELETE' }).then(audit => audit.entries.first())
      if (!entry || entry.createdTimestamp <= Date.now() - 10000 || await BanKickWhitelist(entry.executor.id)) return;
      ytKapat(invite.guild.id)
      const uye = invite.guild.members.cache.get(entry.executor.id)
      const reason = "Invite Silme Koruması"
      await uye.setRoles(roller.cezalıRol, `Cezalı, Yetkili: ${client.user.tag}`).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const ceza = await client.cezalar(invite.guild.id, uye.id, "JAIL", true, client.user.id, reason, Date.now());
      if (uye.voice.channel) uye.voice.kick()
      let logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Invite Silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından bir invite silindi! Inviteyi silen kişiyi sunucuda cezalıya attım!(\`#${ceza.id}\`)`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => invite.guild.owner.send({ embeds: [log] })); } else { invite.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = InviteDelete