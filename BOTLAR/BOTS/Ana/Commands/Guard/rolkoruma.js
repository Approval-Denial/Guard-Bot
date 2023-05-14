const low = require("lowdb")
class RolKoruma extends Command {
  constructor(client) {
    super(client, {
      name: "rolkoruma",
      aliases: ["rolkoruma"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const yazı = ` - Rol Koruma`
    if (!args[0] || args[0].toLowerCase() !== "aç" && args[0].toLowerCase() !== "kapat" && args[0].toLowerCase() !== "log") {
      message.channel.send({
        embeds: [embed.setDescription(`
  ${emojiler.dikkat} eksik veya hatalı bir arguman girdin. [\`aç, kapat, log\`]

 Rol koruma şuanda; ${utils.get("roleGuard").value() ? `**Açık**` : `**Kapalı**`}
 `)]
      })
    } else if (args[0].toLowerCase() === "aç") {
      if (utils.get("roleGuard").value()) return message.channel.send({ embeds: [embed.setDescription(`Rol koruma sistemi zaten açık ${emojiler.dikkat}`)] })
      else {
        await utils.set('roleGuard', true).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Rol koruma sistemi başarı ile açıldı ${emojiler.mavionay}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setTimestamp()]
        })
      }

    } else if (args[0].toLowerCase() === "kapat") {
      if (utils.get("roleGuard").value() === false) return message.channel.send({ embeds: [embed.setDescription(`Rol koruma sistemi zaten kapalı ${emojiler.dikkat}`)] })
      await utils.set('roleGuard', false).write();
      message.channel.send({
        embeds: [new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
          .setDescription(`Rol koruma sistemi başarı ile kapatıldı ${emojiler.mavionay}`)
          .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setTimestamp()]
      })
    } else if (args[0].toLowerCase() === "log") {
      const rol = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
      if (!rol) return message.channel.send({ embeds: [embed.setDescription(`Lütfen geçerli bir log kanalı belirleyin`)] })
      if (rol) {
        await utils.set('roleLog', rol.id).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`<#${rol.id}> isimli kanal rol log kanalı olarak ayarlandı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }
    }
  }
}

module.exports = RolKoruma