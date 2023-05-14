const { BanKickWhitelist,ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
const userRoles =  require("../../../Database/web")
const discord = require("discord.js")
class GuildMemberRemove {
  Event = "guildMemberRemove"
  async run(member) {
    console.log(member.id)

    const kanal = member.guild.channels.cache.get(require("../../../Settings/guard.json").serverLog);

     const veri = await userRoles.findOne({ guildID: member.guild.id, userID: member.id });
     if (!veri) return;
     if (veri.roles || veri.roles.length) {
       await userRoles.findOneAndDelete({ guildID: member.guild.id, userID: member.id });
 if(kanal) kanal.send({embeds:[new discord.MessageEmbed().setDescription(`${member} sunucudan çıkış yaptı, yetkili rolleri bulundu ve verilerden silindi.`).setTimestamp()]})
     }
  }
}

module.exports = GuildMemberRemove;