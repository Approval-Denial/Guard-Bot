const low = require("lowdb")
class SunucuKoruma extends Command {
  constructor(client) {
    super(client, {
      name: "sunucukoruma",
      aliases: ["sunucukoruma"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const yazı = ` - Sunucu Koruma`
    if (!args[0] || args[0].toLowerCase() !== "aç" && args[0].toLowerCase() !== "kapat" && args[0].toLowerCase() !== "log") {
      message.channel.send({
        embeds: [embed.setDescription(`
  ${emojiler.dikkat} eksik veya hatalı bir arguman girdin. [\`aç, kapat, log\`]

 Sunucu koruma şuanda; ${utils.get("serverGuard").value() ? `**Açık**` : `**Kapalı**`}
 `)]
      })
    } else if (args[0].toLowerCase() === "aç") {
      if (utils.get("serverGuard").value() === true) return message.channel.send({ embeds: [embed.setDescription(`Sunucu koruma sistemi zaten açık ${emojiler.dikkat}`)] })
      else {
        await utils.set('serverGuard', true).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Sunucu koruma sistemi başarı ile açıldı ${emojiler.mavionay}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setTimestamp()]
        })
      }

    } else if (args[0].toLowerCase() === "kapat") {
      if (utils.get("serverGuard").value() === true) return message.channel.send({ embeds: [embed.setDescription(`Sunucu koruma sistemi zaten kapalı ${emojiler.dikkat}`)] })
      else {
        await utils.set('serverGuard', false).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Sunucu koruma sistemi başarı ile kapatıldı ${emojiler.mavionay}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setTimestamp()]
        })
      }
    } else if (args[0].toLowerCase() === "log") {
      const sunucu = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
      if (!sunucu) return message.channel.send({ embeds: [embed.setDescription(`Lütfen geçerli bir log kanalı belirleyin`)] })
      if (sunucu) {
        await utils.set('serverLog', sunucu.id).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`<#${sunucu.id}> isimli kanal sunucu log kanalı olarak ayarlandı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }
    }

  }
}

module.exports = SunucuKoruma