const { Fullgüvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class EmojiDelete {
  Event = "emojiDelete"
  async run(emoji, message) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      let entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 10000 || await Fullgüvenli(entry.executor.id)) return;
      const uye = emoji.guild.members.cache.get(entry.executor.id)
      const reason = "Emoji Silme Koruması"
      await emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      await uye.setRoles(roller.cezalıRol, `Cezalı, Yetkili: ${client.user.tag}`).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const ceza = await client.cezalar(emoji.guild.id, uye.id, "JAIL", true, client.user.id, reason, Date.now());
      if (uye.voice.channel) uye.voice.kick().catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      let logKanali = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Emoji Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından emoji silindi! Emojiyi silen kişiyi cezalıya attım ve emojiyi yeniden açtım.\nCeza Numarası: (\`#${ceza.id}\`)`).setTimestamp()
      if (logKanali) { logKanali.send({ embeds: [log] }).catch(err => emoji.guild.owner.send({ embeds: [log] })); } else { emoji.guild.owner.send({ embeds: [log] }) }
      return;
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}
module.exports = EmojiDelete;