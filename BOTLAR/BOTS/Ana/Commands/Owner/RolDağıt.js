const { rolVer } = require("../../../../Helpers/BackupFunction")
class rolDagit extends Command {
  constructor(client) {
    super(client, {
      name: "herkeserol",
      aliases: ["roldağıt"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!role) return message.channel.send(cevaplar.rolBelirt)
    else if (role) {
      await message.channel.send({ embeds: [embed.setDescription(`${role} isimli rol sunucuda dağıtılmaya başlandı`)] })
      rolVer(message.guild, role)
    }
  }
}

module.exports = rolDagit
