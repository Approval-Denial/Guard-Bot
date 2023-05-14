const { Fullgüvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class EmojiUpdate {
  Event = "emojiUpdate"
  async run(oldEmoji, newEmoji) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      let entry = await oldEmoji.guild.fetchAuditLogs({ type: "EMOJI_UPDATE" }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 10000 || await Fullgüvenli(entry.executor.id)) return;
      const uye = oldEmoji.guild.members.cache.get(entry.executor.id)
      const reason = "Emoji Güncelleme Koruması"
      await newEmoji.setName(oldEmoji.name)
      await uye.setRoles(roller.cezalıRol, `Cezalı, Yetkili: ${client.user.tag}`).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const ceza = await client.cezalar(oldEmoji.guild.id, uye.id, "JAIL", true, client.user.id, reason, Date.now());
      if (uye.voice.channel) uye.voice.kick().catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      let logKanali = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Emoji Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından emoji güncellendi! Emojiyi güncelleyen kişiyi cezalıya attım ve emojiyi eski haline getirdim.\nCeza Numarası: (\`#${ceza.id}\`)`).setTimestamp()
      if (logKanali) { logKanali.send({ embeds: [log] }).catch(err => oldEmoji.guild.owner.send({ embeds: [log] })); } else { oldEmoji.guild.owner.send({ embeds: [log] }) }
      return;
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}
module.exports = EmojiUpdate;