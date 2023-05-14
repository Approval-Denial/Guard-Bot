const { RolWhitelist } = require("../../../Helpers/function")
const low = require("lowdb")
class RoleCreate {
  Event = "roleCreate"
  async run(role) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("roleGuard").value() === true) try {
      const entry = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || await RolWhitelist(entry.executor.id)) return;
      const logs = client.channels.cache.get(utils.get("roleLog").value());
      await role.guild.members.ban(entry.executor.id, { reason: "Rol Açtığı İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      await role.delete({ reason: "Rol Oluşturma Koruması" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Rol Oluşturma Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından bir rol oluşturuldu! Rolü oluşturan kişiyi sunucudan yasakladım ve oluşturduğu rolü sildim.`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => role.guild.owner.send({ embeds: [log] })); } else { role.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = RoleCreate