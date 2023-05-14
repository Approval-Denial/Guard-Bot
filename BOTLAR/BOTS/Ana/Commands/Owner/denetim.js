const { rolVer } = require("../../../../Helpers/BackupFunction")
class Denetim extends Command {
  constructor(client) {
    super(client, {
      name: "denetim",
      aliases: ["log"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    if (!args[0] || !args[0].toLowerCase() === "rol" && !args[0].toLowerCase() === "kanal") return message.channel.send({ embeds: [embed.setDescription(`Lütfen \`rol/kanal\` olmak üzere geçerli bir eylem belirtiniz ${emojiler.dikkat}`)]})
    if (args[0].toLowerCase() === "rol") {
      const audit = await message.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(a => a.entries)
      const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60*3).map(e => `Rol id: ${e.target.id} Rol İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`)
      if (!denetim.length) return message.channel.send({ embeds: [embed.setDescription(`Son **3** saat de silinmiş herhangi bir rol bulunamadı!`)]})
      const arr = Discord.Util.splitMessage(denetim, { maxLength: 1950, char: "\n" });
    //  denetim.forEach(element => {
          message.channel.send(denetim.join("\n "));
     // });
    } else if (args[0].toLowerCase() === "kanal") {
      const audit = await message.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(a => a.entries)
      const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60*3).map(e => `Kanal id: ${e.target.id} Kanal İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`)
      if (!denetim.length) return message.channel.send({ embeds: [embed.setDescription(`Son **3** saat de silinmiş herhangi bir kanal bulunamadı!`)]})
      const arr = Discord.Util.splitMessage(denetim, { maxLength: 1950, char: "\n" });
      arr.forEach(element => {
          message.channel.send(Discord.Formatters.codeBlock("js", element));
      });
    }
  }
}

module.exports = Denetim
