const low = require("lowdb")
class WhiteList extends Command {
  constructor(client) {
    super(client, {
      name: "whitelist",
      aliases: ["whitelist", "güvenli"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const member = message.mentions.users.first() || await client.fetchUser(args[1]);
    const utils = await low(client.adapters('guard'));
  if(!args[0]) return message.channel.send({embeds:[embed.setDescription(`**${message.guild.name}** Adlı sunucu için whitelist kategorileri:
   \`1.\` Bots : Botlar eklenir ve sınırla sayıda işlem yapabilirler.
   \`2.\` Full: Tüm izinlere sahip olurlar
   \`3.\` Rol: Sadece rol verme iznine sahip olurlar
   \`4.\` Kanal: Sadece kanal düzenleme iznine sahip olurlar
   \`5.\` Ban & Kick: Sınırlı sayıda sağ tık yasaklama ve atma işlemi uygulayablirler.
   `).setFooter("g.güvenli <Full - Bot - rol - kanal - ban/kick> ekle/çıkar @Approval/ID")]});
    if(args[0]=== "göster"){
      const whiteListFull = utils.get("whiteListFull").value()
var full;
var sayi = 0;
if(!whiteListFull){ full = "**Full** Kategorisinde kimse bulunamadı.";} else { full = whiteListFull.slice(0, 3).map(e => `<@!${e}>`).join(", "); whiteListFull.map(e => `\`${sayi++}-\``).join(", ")}
const WhitelistBots = utils.get("Bots").value()
var Botswl;
var botsayi = 0;
if(!WhitelistBots){ Botswl = "**Bot** Kategorisinde Hiç Bot Bulunamadı";} else { Botswl = WhitelistBots.slice(0, 3).map(e => `<@!${e}>`).join(", "); WhitelistBots.map(e => `\`${botsayi++}-\``).join(", ")}
const whiteListRoles = utils.get("whiteListRoles").value()
var rolewl;
var rolsayi = 0;
if(!whiteListRoles){ rolewl = "**Bot** Kategorisinde Hiç Bot Bulunamadı";} else { rolewl = whiteListRoles.slice(0, 3).map(e => `<@!${e}>`).join(", "); whiteListRoles.map(e => `\`${rolsayi++}-\``).join(", ")}
const whiteListChannels = utils.get("whiteListChannels").value()
var channelwl;
var channelsayi = 0;
if(!whiteListChannels){ channelwl = "**Bot** Kategorisinde Hiç Bot Bulunamadı";} else { channelwl = whiteListChannels.slice(0, 3).map(e => `<@!${e}>`).join(", "); whiteListChannels.map(e => `\`${channelsayi++}-\``).join(", ")}
const banAndKick = utils.get("bankickwh").value()
var bankickwh;
var bankicksayi = 0;
if(!banAndKick){ bankickwh = "**Bot** Kategorisinde Hiç Bot Bulunamadı";} else { bankickwh = banAndKick.slice(0, 3).map(e => `<@!${e}>`).join(","); banAndKick.map(e => `\`${bankicksayi++}-\``).join(", ")}
message.channel.send({
  embeds: [embed
    .setDescription(`
**${message.guild.name}** Sunucusunda Toplam **${sayi + rolsayi + channelsayi + bankicksayi}** (\`+${botsayi} Bot\`) Kişi Güvenli Listede Bulunuyor!
Güvenli listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli <full, bot, role, channel, ban&kick> ekle/çıkar @üye/üyeid\`
\`•❯\` __Not__: **Her kategoride ilk 3 güvenli kişi gösterilmiştir.**

\`••❯\` Full ${sayi}: ${full}
\`••❯\` Botlar ${botsayi}:${Botswl}
\`••❯\` Rol İzinleri ${rolsayi}: ${rolewl}
\`••❯\` Kanal İzinleri ${channelsayi}:${channelwl}
\`••❯\` Sağ Tık Ban & Kick ${bankicksayi}:${bankickwh}

`)]
})
    }
   else if(args[0]=== "full") {
    const whiteListFull = utils.get("whiteListFull").value()
    if (!args[1] || args[1].toLowerCase() !== "ekle" && args[1].toLowerCase() !== "çıkar") {
      var sayi = 1
      if (!whiteListFull) return message.channel.send({ embeds: [embed.setDescription(`Güvenli listede herhangi bir üye bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}güvenli ekle @üye/üyeid`)] })
      let güvenli = whiteListFull.map(e => `<@!${e}>`).join("\n")
      whiteListFull.map(e => `\`${sayi++}-\``).join("\n")
      message.channel.send({
        embeds: [embed
          .setDescription(`
   Toplam **${sayi - 1}** Kişi  **Full** Güvenli Listesinde Bulunuyor!
   listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli full ekle/çıkar @üye/üyeid\`

    ${güvenli}
    `)]
      })
    } 
      if (args[1]=== "ekle") {
      if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
      if (!member) return message.channel.send(cevaplar.üyeBelirt)
      else if (whiteListFull.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede ${emojiler.dikkat}`)] })
      else {
        utils.get("whiteListFull").push(member.id).write()
        message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Full** güvenli listesine eklendi ${emojiler.mavionay}`)] })
      }
    } else if (args[1]=== "çıkar") {
      if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
      if (!member) return message.channel.send(cevaplar.üyeBelirt)
      else if (!whiteListFull.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojiler.dikkat}`)] })
      else {
        utils.get("whiteListFull").pull(member.id).write()
        message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Full** güvenli listesinden çıkarıldı ${emojiler.kirmizionay}`)] })
      }
    }
} else if(args[0]=== "bot"){
  const WhitelistBots = utils.get("Bots").value()
  if (!args[1] || args[1].toLowerCase() !== "ekle" && args[1].toLowerCase() !== "çıkar") {
    var sayi = 1
    if (!WhitelistBots) return message.channel.send({ embeds: [embed.setDescription(`Güvenli listede herhangi bir üye bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}güvenli ekle @üye/üyeid`)] })
    let güvenli = WhitelistBots.map(e => `<@!${e}>`).join("\n")
    WhitelistBots.map(e => `\`${sayi++}-\``).join("\n")
    message.channel.send({
      embeds: [embed
        .setDescription(`
  Toplam **${sayi - 1}** **Bot** Güvenli Listesinde bulunuyor!
  **Bot** Güvenli listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli bot ekle/çıkar @Bot/botid\`

  ${güvenli}
  `)]
    })
  } 
    if (args[1]=== "ekle") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (WhitelistBots.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu **Bot** zaten güvenli listede ${emojiler.dikkat}`)] })
    else {
      utils.get("Bots").push(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı **Bot** başarı ile güvenli listesine eklendi ${emojiler.mavionay}`)] })
    }
  } else if (args[1]=== "çıkar") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (!WhitelistBots.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojiler.dikkat}`)] })
    else {
      utils.get("Bots").pull(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı **Bot** başarı ile güvenli listesinden çıkarıldı ${emojiler.kirmizionay}`)] })
    }
  }
}else if (args[0]=== "role" || args[0]=== "roles" || args[0]=== "rol"){
  const whiteListRoles = utils.get("whiteListRoles").value()
  if (!args[1] || args[1].toLowerCase() !== "ekle" && args[1].toLowerCase() !== "çıkar") {
    var sayi = 1
    if (!whiteListRoles) return message.channel.send({ embeds: [embed.setDescription(`Güvenli listede herhangi bir üye bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}güvenli ekle @üye/üyeid`)] })
    let güvenli = whiteListRoles.map(e => `<@!${e}>`).join("\n")
    whiteListRoles.map(e => `\`${sayi++}-\``).join("\n")
    message.channel.send({
      embeds: [embed
        .setDescription(`
 Toplam **${sayi - 1}** Kişi **Rol** Güvenli Listede Bulunuyor! (Rol Verme İzni Sadece)
 **Rol** Güvenli listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli ekle/çıkar @üye/üyeid\`

  ${güvenli}
  `)]
    })
  } 
    if (args[1]=== "ekle") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (whiteListRoles.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede ${emojiler.dikkat}`)] })
    else {
      utils.get("whiteListRoles").push(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Rol** güvenli listesine eklendi ${emojiler.mavionay}`)] })
    }
  } else if (args[1]=== "çıkar") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (!whiteListRoles.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojiler.dikkat}`)] })
    else {
      utils.get("whiteListRoles").pull(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Rol** güvenli listesinden çıkarıldı ${emojiler.kirmizionay}`)] })
    }
  }
}
else if (args[0]=== "channel" || args[0]=== "channels" || args[0]=== "kanal"){
  const whiteListChannels = utils.get("whiteListChannels").value()
  if (!args[1] || args[1].toLowerCase() !== "ekle" && args[1].toLowerCase() !== "çıkar") {
    var sayi = 1
    if (!whiteListChannels) return message.channel.send({ embeds: [embed.setDescription(`Güvenli listede herhangi bir üye bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}güvenli ekle @üye/üyeid`)] })
    let güvenli = whiteListChannels.map(e => `<@!${e}>`).join("\n")
    whiteListChannels.map(e => `\`${sayi++}-\``).join("\n")
    message.channel.send({
      embeds: [embed
        .setDescription(`
 Toplam **${sayi - 1}** Kişi **Kanal** Güvenli Listede Bulunuyor! (Sadece Kanal Ayarları)
 **Kanal** Güvenli listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli ekle/çıkar @üye/üyeid\`

  ${güvenli}
  `)]
    })
  } 
    if (args[1]=== "ekle") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (whiteListChannels.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede ${emojiler.dikkat}`)] })
    else {
      utils.get("whiteListChannels").push(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Kanal** güvenli listesine eklendi ${emojiler.mavionay}`)] })
    }
  } else if (args[1]=== "çıkar") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (!whiteListChannels.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojiler.dikkat}`)] })
    else {
      utils.get("whiteListChannels").pull(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Kanal** güvenli listesinden çıkarıldı ${emojiler.kirmizionay}`)] })
    }
  }
}
else if (args[0]=== "ban" || args[0]=== "kick" || args[0]=== "ban&kick"){
  const banAndKick = utils.get("bankickwh").value()
  if (!args[1] || args[1].toLowerCase() !== "ekle" && args[1].toLowerCase() !== "çıkar") {
    var sayi = 1
    if (!banAndKick) return message.channel.send({ embeds: [embed.setDescription(`Güvenli listede herhangi bir üye bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}güvenli ekle @üye/üyeid`)] })
    let güvenli = banAndKick.map(e => `<@!${e}>`).join("\n")
    banAndKick.map(e => `\`${sayi++}-\``).join("\n")
    message.channel.send({
      embeds: [embed
        .setDescription(`
 Toplam **${sayi - 1}** Kişi Güvenli Listede Bulunuyor!
  Güvenli listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli ekle/çıkar @üye/üyeid\`

  ${güvenli}
  `)]
    })
  } 
    if (args[1]=== "ekle") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (banAndKick.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede ${emojiler.dikkat}`)] })
    else {
      utils.get("bankickwh").push(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Ban & Kick** güvenli listesine eklendi ${emojiler.mavionay}`)] })
    }
  } else if (args[1]=== "çıkar") {
    if (!args[2]) return message.channel.send(cevaplar.üyeBelirt)
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    else if (!banAndKick.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojiler.dikkat}`)] })
    else {
      utils.get("bankickwh").pull(member.id).write()
      message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile **Ban & Kick** güvenli listesinden çıkarıldı ${emojiler.kirmizionay}`)] })
    }
  }
} else{
  return;
}
  }
}
module.exports = WhiteList