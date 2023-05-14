const { ytKapat } = require("../../../../Helpers/function")
class YetkiKapat extends Command {
  constructor(client) {
    super(client, {
      name: "yetkikapat",
      aliases: ["yetkikapat", "ytkapat"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    ytKapat(message.guild.id)
    message.channel.send({ embeds: [embed.setDescription(`Tüm rollerin yetkileri ${message.author} tarafından kapatıldı`)] })
    const logs = client.channels.cache.get(kanallar.denetimBilgi);
    if (logs) {
      logs.send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('İzinler Kapatıldı!').setDescription(`Tüm rollerin yetkileri ${message.author} tarafından kapatıldı`).setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL()).setTimestamp()] })
    }
  }
}

module.exports = YetkiKapat
