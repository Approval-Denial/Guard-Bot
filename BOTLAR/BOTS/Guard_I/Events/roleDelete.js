const { Fullgüvenli, ytKapat } = require("../../../Helpers/function")
const { rolKur } = require("../../../Helpers/BackupFunction")
const low = require("lowdb")
const roleBackup = require("../../../Database/Role");
class RoleDelete {
  Event = "roleDelete"
  async run(role) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("roleGuard").value() === true) try {
      const entry = await role.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_DELETE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || await Fullgüvenli(entry.executor.id)) return;
      ytKapat(role.guild.id)
      role.guild.members.ban(entry.executor.id, { reason: "Rol Sildiği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const roleData = await roleBackup.findOne({ roleID: role.id })
      const newRole = await role.guild.roles.create({

        name: roleData ? roleData.name : role.name,
        color: roleData ? roleData.color : role.color,
        hoist: roleData ? roleData.hoist : role.hoist,
        position: roleData ? roleData.position : role.rawPosition,
        permissions: roleData ? roleData.permissions : role.permissions,
        mentionable: roleData ? roleData.mentionable : role.mentionable,

        reason: "Tekrar Oluşturuldu!"
      });
      await roleBackup.findOne({ roleID: role.id }, async (err, data) => {
        if (!data) return client.logger.error(`[${role.id}] ID'li rol silindi fakat herhangi bir veri olmadığı için işlem yapılmadı.`);
        setInterval(() => {
          rolKur(role.id, newRole)
         }, 5000);
      });
      const logs = client.channels.cache.get(utils.get("roleLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Rol Silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından rol silindi! silen kişiyi banladım. Rolü tekrar oluşturdum, üyelerine dağıtılmaya ve izinleri kanallara eklenmeye **5 saniye** sonra başlanıyor.\nSilinen Rol: **${role.name}** \`(${role.id})\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => role.guild.owner.send({ embeds: [log] })); } else { role.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = RoleDelete