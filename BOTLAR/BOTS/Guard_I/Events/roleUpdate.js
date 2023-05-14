const { Fullgüvenli } = require("../../../Helpers/function")
const roleBackup = require("../../../Database/Role");
const low = require("lowdb")
class RoleUpdate {
  Event = "roleUpdate"
  async run(oldRole, newRole) {
    const perms = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
    const utils = await low(client.adapters('guard'));
    if (utils.get("roleGuard").value() === true) try {
      let entry = await newRole.guild.fetchAuditLogs({ type: 'ROLE_UPDATE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || !newRole.guild.roles.cache.has(newRole.id) || await Fullgüvenli(entry.executor.id)) return;
      await newRole.guild.members.ban(entry.executor.id, { reason: "Rol Güncellediği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      if (perms.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
        newRole.setPermissions(6479482433n)
      };
      const roleData = await roleBackup.findOne({ roleID: oldRole.id })
      
      await newRole.edit({
        name: roleData ? roleData.name : oldRole.name,
        color: roleData ? roleData.hexColor : oldRole.hexColor,
        hoist: roleData ? roleData.hoist : oldRole.hoist,
        permissions: roleData ? roleData.permissions : oldRole.permissions,
        mentionable: roleData ? roleData.mentionable : oldRole.mentionable
      });
      const logs = client.channels.cache.get(utils.get("roleLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Rol Güncelleme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından rol güncellendi! Güncelleyen kişiyi sunucudan yasakladım ve rolü eski haline getirdim.\nGüncellenen Rol: **${oldRole.name}**`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => newRole.guild.owner.send({ embeds: [log] })); } else { newRole.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = RoleUpdate
