const { Fullgüvenli,ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildMemberUpdate {
  Event = "guildMemberUpdate"
  async run(oldMember, newMember) {
    const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
    const utils = await low(client.adapters('guard'));
    if (utils.get("roleGuard").value() === true) try {
      if (newMember.roles.cache.size > oldMember.roles.cache.size) {
        let entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await Fullgüvenli(entry.executor.id)) return;
        if (yetkiPermleri.some(p => !oldMember.permissions.has(p) && newMember.permissions.has(p))) {
          ytKapat(newMember.guild.id)
          const logs = client.channels.cache.get(utils.get("roleLog").value());
          newMember.roles.set(oldMember.roles.cache.map(r => r.id));
          const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Yetki Verme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından sağ tık ile rol verildi! Rol verilen kişiden rolü geri aldım.\nRol Verilen Üye: **${newMember.user.tag}** \`(${newMember.id})\``).setTimestamp()
          if (logs) { logs.send({ embeds: [log] }).catch(err => newMember.guild.owner.send({ embeds: [log] })); } else { newMember.guild.owner.send({ embeds: [log] }) }
        };
      };
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildMemberUpdate