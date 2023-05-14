const { BanKickWhitelist, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildBanAdd {
  Event = "guildBanAdd"
  async run(ban) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      let entry = await ban.guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' }).then(audit => audit.entries.first());
      if (!entry || entry.createdTimestamp <= Date.now() - 5000 || await BanKickWhitelist(entry.executor.id)) return;
      ytKapat(entry.guild.id)

      const logs = client.channels.cache.get(utils.get("serverLog").value());
      ban.guild.members.ban(entry.executor.id, { reason: "Sağ Tık Ban Attığı İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      ban.guild.members.unban(ban.user.id, "Sağ Tık İle Banlandığı İçin Açıldı").catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Ban Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` adlı kullanıcı sağ tık ile birini sunucudan yasakladı! Üyenin yasağını kaldırdım ve atan kişiyi sunucudan yasakladım.\nYasaklanan Üye: **${ban.user.tag}** \`(${ban.user.id})\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => ban.guild.owner.send({ embeds: [log] })); } else { ban.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildBanAdd;