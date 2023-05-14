const { BanKickWhitelist,ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildMemberRemove {
  Event = "guildMemberRemove"
  async run(member) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      let entry = await member.guild.fetchAuditLogs({ type: 'MEMBER_KICK' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || await BanKickWhitelist(entry.executor.id)) return;
      ytKapat(member.guild.id)

      if (member.id === entry.executor.id) return;
      member.guild.members.ban(entry.executor.id, { reason: "Sağ Tık Kick Attığı İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Kick Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` adlı kullanıcı sunucudan birini sağ tık ile sunucudan attı! Kullanıcıyı sunucudan yasakladım.\nAtılan Kişi: **${member.user.tag}** \`(${member.id})\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => member.guild.owner.send({ embeds: [log] })); } else { member.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }

  }
}

module.exports = GuildMemberRemove;