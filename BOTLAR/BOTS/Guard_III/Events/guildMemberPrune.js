const { Fullgüvenli, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildMemberPrune {
  Event = "guildMemberRemove"
  async run(member) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      const entry = await member.guild.fetchAuditLogs({ type: 'MEMBER_PRUNE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || await Fullgüvenli(entry.executor.id)) return;
      member.guild.members.ban(entry.executor.id, { reason: "Üyeleri Çıkardığı İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      ytKapat(member.guild.id)
      const logs = client.channels.cache.get(utils.get("serverLog").value());
       const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Üye Çıkarma Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` adlı kullanıcı sunucudan ${entry.extra.removed} tane üye çıkardı! Kullanıcıyı sunucudan yasakladım.`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => member.guild.owner.send({ embeds: [log] })); } else { member.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildMemberPrune;