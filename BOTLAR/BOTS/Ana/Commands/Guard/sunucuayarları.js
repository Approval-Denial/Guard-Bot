class Ayarlar extends Command {
      constructor(client) {
            super(client, {
                  name: "sunucuayarları",
                  aliases: ['ayarlar', 'sunucuayarları'],
                  ownerOnly: true,
            });
      }
      async run(client, message, args, embed) {
            const utils = await low(client.adapters('guard'));
            if (utils.get("guildID").value() !== message.guild.id) return message.channel.send(embed.setDescription(`Bu sunucuya ait veri bulunamadı ${emojiler.dikkat}`))
            let serverGuard = utils.get("serverGuard").value() ? `**Açık**` : `**Kapalı**`
            let channelGuard = utils.get("channelGuard").value() ? `**Açık**` : `**Kapalı**`
            let roleGuard = utils.get("roleGuard").value() ? `**Açık**` : `**Kapalı**`
            let yeniHesap = utils.get("yeniHesap").value() ? `**Açık**` : `**Kapalı**`
            let yasakliTag = utils.get("yasakliTag").value() ? `**Açık**` : `**Kapalı**`
            let taglıAlım = utils.get("TagliAlim").value() ? `**Açık**` : `**Kapalı**`
            let swearGuard = utils.get("swearGuard").value() ? `**Açık**` : `**Kapalı**`
            let capsGuard = utils.get("capsGuard").value() ? `**Açık**` : `**Kapalı**`
            let urlGuard = utils.get("urlGuard").value() ? `**Açık**` : `**Kapalı**`

            //
            let serverLog = utils.get("serverLog").value() ? `<#${utils.get("serverLog").value()}>` : `**Kapalı**`
            let channelLog = utils.get("channelLog").value() ? `<#${utils.get("channelLog").value()}>` : `**Kapalı**`
            let roleLog = utils.get("roleLog").value() ? `<#${utils.get("roleLog").value()}>` : `**Kapalı**`
            let banLog = kanallar.banLog ? `<#${kanallar.banLog}>` : `**Kapalı**`
            let muteLog = kanallar.muteLog ? `<#${kanallar.muteLog}>` : `**Kapalı**`
            let jailLog = kanallar.jailLog ? `<#${kanallar.jailLog}>` : `**Kapalı**`


            const sunucuAyarlar = new Discord.MessageEmbed()
                  .setAuthor(`${message.guild.name} - Sunucu Ayarları`, message.guild.iconURL({ dynamic: true }))
                  .setThumbnail(message.guild.iconURL({ dynamic: true }))
                  .setDescription(`${message.guild.name} Sunucusunda aktif olan sistemler aşağıda gösterilmiştir.`)
                  .addFields(
                        {name: "Guard Ayarları", value:`Sunucu koruması: ${serverGuard}\nKanal Koruması: ${channelGuard}\nRol Koruması: ${roleGuard}`,inline:true},
                        {name: "Guard Log", value:`Sunucu koruması: ${serverLog}\nKanal Koruması: ${channelLog}\nRol Koruması: ${roleLog}`,inline:true},
                        {name: "Register Ayarları", value: `Yeni Hesap: ${yeniHesap}\nYasaklı Tag: ${yasakliTag}\nTaglı Alım: ${taglıAlım}`,inline:false},
                        {name: "Chat Guard", value:`Caps Engel: ${capsGuard}\nLink Engel: ${urlGuard}\nKüfür Engel: ${swearGuard}`,inline:false}
                        )
                 /* .addFields(
                                               { name: ' Küfür Engel', value: `${swearGuard}`, inline: true },
                        { name: ' Caps Engel', value: `${capsGuard}`, inline: true },
                        { name: ' Url Engel', value: `${urlGuard}`, inline: true },
                        { name: `Guard ayarları`, value: `** **`, inline: true },
                        {name: `Sunucu Koruma: ${serverGuard}`, value: `** **`,inline:true},
                        { name: `Kanal Koruma: ${channelGuard}`, value: `** **`, inline: true },
                        { name: `Rol Koruma: ${channelGuard}`, value: `** **`, inline: true },
                        { name: `Register ayarları`, value: `** **`, inline: true },
                        { name: `Yeni Hesap: ${yeniHesap}`, value: `** **`, inline: true },
                        { name: `Yasaklı Tag: ${yasakliTag}`, value: `** **`, inline: true },
                        { name: `Taglı Alım: ${taglıAlım}`, value: `** **`, inline: true },
                        { name: `Chat Guard`, value: `** **`, inline: true },
                        )
                 .addFields(
                        { name: ' Sunucu Koruma ', value: `${serverGuard}`, inline: true },
                        { name: ' Kanal Koruma ', value: `${channelGuard}`, inline: true },
                        { name: ' Rol Koruma ', value: `${roleGuard}`, inline: true },
                        { name: ' Yeni Hesap', value: `${yeniHesap}`, inline: true },
                        { name: ' Yasaklı Tag', value: `${yasakliTag}`, inline: true },
                        { name: ' Taglı Alım', value: `${taglıAlım}`, inline: true },
                        { name: ' Küfür Engel', value: `${swearGuard}`, inline: true },
                        { name: ' Caps Engel', value: `${capsGuard}`, inline: true },
                        { name: ' Url Engel', value: `${urlGuard}`, inline: true },
                        { name: ' Sunucu Koruma Log', value: `${serverLog}`, inline: true },
                        { name: ' Kanal Koruma Log', value: `${channelLog}`, inline: true },
                        { name: ' Rol Koruma Log', value: `${roleLog}`, inline: true },
                        { name: ' Ban Log', value: `${banLog}`, inline: true },
                        { name: ' Jail Log', value: `${jailLog}`, inline: true },
                        { name: ' Chat Mute Log', value: `${muteLog}`, inline: true },
                  )*/.setFooter(`${ayarlar.altbaslik}`, message.guild.iconURL({ dynamic: true })).setTimestamp().setColor("RANDOM")
            message.channel.send({ embeds: [sunucuAyarlar] })
      }

}

module.exports = Ayarlar