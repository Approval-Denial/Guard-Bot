const TextChannels = require("../../../../Database/TextChannels");
class Sohbet extends Command {
  constructor(client) {
    super(client, {
      name: "sohbet",
      aliases: ["sohbet"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    if (!args[0] || isNaN(args[0])) return message.channel.send({ embeds: [embed.setDescription("Lütfen bir kanal ID'si belirtiniz!")] });
    TextChannels.findOne({ channelID: args[0] }, async (err, data) => {
      if (!data) return message.channel.send({ embeds: [embed.setDescription("Belirtilen kanal ID'sine ait veri bulunamadı!")] });
      const newChannel = await message.guild.channels.create(data.name, {
        type: 'GUILD_TEXT',
        nsfw: data.nsfw,
        parentID: data.parentID,
        position: data.position + 1,
        rateLimit: data.rateLimit,
      });
      await message.channel.send({ embeds: [embed.setDescription(`**${newChannel.name}** isimli kanal yedeği kuruluyor...`)] })
      const newOverwrite = [];
      for (let index = 0; index < data.overwrites.length; index++) {
        const veri = data.overwrites[index];
        newOverwrite.push({
          id: veri.id,
          allow: new Discord.Permissions(veri.allow).toArray(),
          deny: new Discord.Permissions(veri.deny).toArray()
        });
      }
      await newChannel.permissionOverwrites.set(newOverwrite);
      data.channelID = newChannel.id
      data.save()
    });
  }
}

module.exports = Sohbet