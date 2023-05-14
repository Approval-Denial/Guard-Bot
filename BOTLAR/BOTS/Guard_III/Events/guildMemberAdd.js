const { Fullgüvenli, ytKapat } = require("../../../Helpers/function")
const low = require("lowdb")
const userRoles =  require("../../../Database/web.js")
const discord = require("discord.js")

class GuildMemberAdd {
  Event = "guildMemberAdd"
  async run(member) {
if(member.user.bot) return;
    const kanal = member.guild.channels.cache.get(require("../../../Settings/guard.json").serverLog);
    const veri = await userRoles.findOne({ guildID: member.guild.id, userID: member.id });
    if (!veri) return;
    if (veri.roles || veri.roles.length) {
      await userRoles.findOneAndDelete({ guildID: member.guild.id, userID: member.id });
      if(kanal) kanal.send({embeds:[new discord.MessageEmbed().setDescription(`${member}, yetkili rolleri bulundu. ve verilerden silindi.`).setTimestamp()]})
     } 
     setInterval(async() => {
      const roller = member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS"].some((a) => e.permissions.has(a)));
      await member.roles.remove(roller.map((e) => e.id), "Web giriş datası tarafından verilen roller alındı.");
     }, 5000);
  }
}

module.exports = GuildMemberAdd;