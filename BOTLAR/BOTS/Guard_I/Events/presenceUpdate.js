const { Fullgüvenli } = require("../../../Helpers/function")
const roleBackup = require("../../../Database/Role");
const low = require("lowdb")
const userRoles =  require("../../../Database/web.js")
const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu, Client,Intents } = require("discord.js");

class presenceUpdate {
  Event = "presenceUpdate"
  async run(eski, yeni) {
    const utils = await low(client.adapters('guard'));
    const Approval = Object.keys(yeni.member.presence.clientStatus);
    const embed = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Web Koruması').setTimestamp()
    const kanal = client.channels.cache.find((e) => e.id === utils.get("WebLog").value());
    const roller = yeni.member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS"].some((a) => e.permissions.has(a)));
    if (!yeni.user.bot && yeni.guild.id === yeni.guild.id && ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS"].some((e) => yeni.member.permissions.has(e)) ) {
      if (await Fullgüvenli(yeni.member.id)) return;
      const sunucu = client.guilds.cache.get(yeni.member.guild.id);
      if (sunucu.ownerId === yeni.user.id) return;
      const web = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('yetkiver')
        .setLabel("Rolleri Geri Ver")
        .setStyle('SUCCESS'),
        new MessageButton()
        .setCustomId('guvenli')
        .setLabel("Güvenliye Ekle")
        .setStyle('SUCCESS'),
        new MessageButton()
        .setCustomId('yasakla')
        .setLabel("Yasakla")
        .setStyle('DANGER'),
      )
      if (Approval.find(e => e === "web")) {
        await userRoles.findOneAndUpdate({ guildID: yeni.member.guild.id, userID: yeni.member.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
        await yeni.member.roles.remove(roller.map((e) => e.id), "Web Girişi Algılandı. (Yetkili Rolleri Alındı)");
        if (kanal) kanal.send({components:[web],embeds:[embed.setDescription(`${yeni.user.toString()} tarayıcıdan giriş yaptığı için yetkileri alındı! (${roller.map((e) => `<@&${e.id}>`).join("\n")})`).setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter("Developed By Approval", client.guilds.cache.get(yeni.member.guild.id).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)]}).then(async(msg) => {
          let collector = await msg.channel.createMessageComponentCollector()
          collector.on('collect', async (i) => {
            if(i.member.id !== "416883528941436947" && i.member.id !== "852800814808694814") return;
            const buttons = i.customId;
          if(buttons == "guvenli"){
            const whiteListFull = utils.get("whiteListFull").value()
             if (whiteListFull.some(x => x.includes(yeni.member.id))) return i.reply({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede `)] })
            else {
              utils.get("whiteListFull").push(yeni.member.id).write()
              i.reply({ embeds: [embed.setDescription(`${yeni.member} adlı kullanıcı başarı ile **Full** güvenli listesine eklendi`)] })
            }
          }
          if(buttons== "yasakla"){
            await i.guild.members.ban(yeni.member.id, { reason: reason + `Web Koruması` })
            i.reply(`${yeni.member.user.username} Sunucudan Yasaklandı.`)
          }
          if(buttons == "yetkiver"){
            const veri = await userRoles.findOne({ guildID: yeni.member.guild.id, userID: yeni.member.id });
            if (!veri) return;
            if (veri.roles || veri.roles.length) {
              await veri.roles.map(e => yeni.member.roles.add(e, "(Yetkili Rolleri Geri Verild.)").then(async () => {
                await userRoles.findOneAndDelete({ guildID: yeni.member.guild.id, userID: yeni.member.id });
                if (kanal) kanal.send({embeds:[embed.setDescription(`${yeni.user.toString()} istek üzerine yetkileri verildi! (${veri.roles.map((e) => `<@&${e}>`).join("\n")})`).setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter("Developed By Approval", client.guilds.cache.get(yeni.member.guild.id).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)]});
              }).catch(() => {}));
            }
          }
          })

        })
      } 
     if ( yeni.member.presence.status == "offline") {
        await userRoles.findOneAndUpdate({ guildID: yeni.member.guild.id, userID: yeni.member.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
        await yeni.member.roles.remove(roller.map((e) => e.id), "Çevrimdışı/Görünmez oldu (Yetkili Rolleri Alındı)");
        if (kanal) kanal.send({components:[web],embeds:[embed.setDescription(`${yeni.user.toString()} Çevrimdışı/Görünmez olduğu olduğu için yetkileri alındı! (${roller.map((e) => `<@&${e.id}>`).join("\n")})`).setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter("Developed By Approval", client.guilds.cache.get(yeni.member.guild.id).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)]}).then(async(msg) => {
          let collector = await msg.channel.createMessageComponentCollector()
          collector.on('collect', async (i) => {
            if(i.member.id !== "416883528941436947" && i.member.id !== "852800814808694814") return;
            const buttons = i.customId;
          if(buttons == "guvenli"){
            const whiteListFull = utils.get("whiteListFull").value()
             if (whiteListFull.some(x => x.includes(yeni.member.id))) return i.reply({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede `)] })
            else {
              utils.get("whiteListFull").push(yeni.member.id).write()
              i.reply({ embeds: [embed.setDescription(`${yeni.member} adlı kullanıcı başarı ile **Full** güvenli listesine eklendi`)] })
            }
          }
          if(buttons== "yasakla"){
            await i.guild.members.ban(yeni.member.id, { reason: reason + `Web Koruması` })
            i.reply(`${yeni.member.user.username} Sunucudan Yasaklandı.`)
          }
          if(buttons == "yetkiver"){
            const veri = await userRoles.findOne({ guildID: yeni.member.guild.id, userID: yeni.member.id });
            if (!veri) return;
            if (veri.roles || veri.roles.length) {
              await veri.roles.map(e => yeni.member.roles.add(e, "(Yetkili Rolleri Geri Verild.)").then(async () => {
                await userRoles.findOneAndDelete({ guildID: yeni.member.guild.id, userID: yeni.member.id });
                if (kanal) kanal.send({embeds:[embed.setDescription(`${yeni.user.toString()} istek üzerine yetkileri verildi! (${veri.roles.map((e) => `<@&${e}>`).join("\n")})`).setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter("Developed By Approval", client.guilds.cache.get(yeni.member.guild.id).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)]});
              }).catch(() => {}));
            }
          }
          })

        })
      } 
    }
    if (!Approval.find(e => e === "web") & yeni.member.presence.status !== "offline") {
      const veri = await userRoles.findOne({ guildID: yeni.member.guild.id, userID: yeni.member.id });
      if (!veri) return;
      if (veri.roles || veri.roles.length) {
        await veri.roles.map(e => yeni.member.roles.add(e, "Web'ten çıkış yapıldı/tekrar aktif oldu. (Yetkili Rolleri Geri Verild.)").then(async () => {
          await userRoles.findOneAndDelete({ guildID: yeni.member.guild.id, userID: yeni.member.id });
          if (kanal) kanal.send({embeds:[embed.setDescription(`${yeni.user.toString()} tarayıcıdan çıkış yaptığı için/Tekrardan aktif olduğu için yetkileri verildi! (${veri.roles.map((e) => `<@&${e}>`).join("\n")})`).setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter("Developed By Approval", client.guilds.cache.get(yeni.member.guild.id).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)]});
        }).catch(() => {}));
      }
    }
  }
}
module.exports = presenceUpdate
