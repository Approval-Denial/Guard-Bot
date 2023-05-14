const low = require("lowdb")
class Kanalkoruma extends Command {
  constructor(client) {
    super(client, {
      name: "kanalkoruma",
      aliases: ["kanalkoruma"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const yazı = ` - Kanal Koruma`
    const utils = await low(client.adapters('guard'));
    if (!args[0] || args[0].toLowerCase() !== "aç" && args[0].toLowerCase() !== "kapat" && args[0].toLowerCase() !== "log") {
      message.channel.send({
        embeds: [embed.setDescription(`
 ${emojiler.dikkat} eksik veya hatalı bir arguman girdin. [\`aç, kapat, log\`]

 Kanal koruma şuanda; ${utils.get("channelGuard").value() ? `**Açık**` : `**Kapalı**`}
 `)]
      })
    } else if (args[0].toLowerCase() === "aç") {
      if (utils.get("channelGuard").value() === true) return message.channel.send({ embeds: [embed.setDescription(`Kanal koruma sistemi zaten açık ${emojiler.dikkat}`)] })
      else {
        await utils.set('channelGuard', true).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Kanal koruma sistemi başarı ile açıldı ${emojiler.mavionay}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setTimestamp()]
        })
      }

    } else if (args[0].toLowerCase() === "kapat") {
      if (utils.get("channelGuard").value() === false) return message.channel.send({ embeds: [embed.setDescription(`Kanal koruma sistemi zaten kapalı ${emojiler.dikkat}`)] })
      else {
        await utils.set('channelGuard', false).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Kanal koruma sistemi başarı ile kapatıldı ${emojiler.mavionay}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setTimestamp()]
        })
      }
    } else if (args[0].toLowerCase() === "log") {
      const kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
      if (!kanal) return message.channel.send({ embeds: [embed.setDescription(`Lütfen geçerli bir kanal belirtiniz!`)] })
      if (kanal) {
        await utils.set('channelLog', kanal.id).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`<#${kanal.id}> isimli kanal kanal koruma log kanalı olarak ayarlandı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }
    }

  }
}

module.exports = Kanalkoruma