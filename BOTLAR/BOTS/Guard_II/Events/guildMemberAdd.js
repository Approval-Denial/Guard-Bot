const { Fullgüvenli, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildMemberAdd {
  Event = "guildMemberAdd"
  async run(member) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value() === true) try {
      const entry = await member.guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first());
      if (!entry || entry.createdTimestamp <= Date.now() - 5000 || await Fullgüvenli(entry.executor.id)) return;
      ytKapat(member.guild.id)
      if (member) member.ban({ reason: "Sunucuya İzinsiz Eklenen Bot" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      member.guild.members.ban(entry.executor.id, { reason: "Sunucuya Bot Eklediği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("2fc893").setTitle(client.user.username + ' - Bot Koruması').setDescription(`${entry.executor} \`(${entry.executor.id})\` tarafından sunucuya bot eklendi! Sunucuya bot ekleyen kullanıcıyı ve botu sunucudan yasakladım.\nEklenen Bot: ${member} \`(${member.id})\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => channel.guild.owner.send({ embeds: [log] })); } else { channel.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildMemberAdd;