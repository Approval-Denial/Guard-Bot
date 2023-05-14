const CategoryChannels = require("../../../../Database/CategoryChannels");
const TextChannels = require("../../../../Database/TextChannels");
const VoiceChannels = require("../../../../Database/VoiceChannels");
class Kategori extends Command {
  constructor(client) {
    super(client, {
      name: "kategori",
      aliases: ["kategori"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    if (!args[0] || isNaN(args[0])) return message.channel.send({ embeds: [embed.setDescription("Lütfen bir kategori ID'si belirtiniz!")] });
    CategoryChannels.findOne({ channelID: args[0] }, async (err, data) => {
      if (!data) return message.channel.send({ embeds: [embed.setDescription("Belirtilen kategori ID'sine ait veri bulunamadı!")]});
      const newChannel = await message.guild.channels.create(data.name, {
        type: 'GUILD_CATEGORY',
        position: data.position,
      });
      await message.channel.send({ embeds: [embed.setDescription(`**${newChannel.name}** isimli kategori yedeği kuruluyor...`)]})
      const textChannels = await TextChannels.find({ parentID: args[0] });
      await TextChannels.updateMany({ parentID: args[0] }, { parentID: newChannel.id });
      textChannels.forEach(c => {
        const textChannel = message.guild.channels.cache.get(c.channelID);
        if (textChannel) textChannel.setParent(newChannel, { lockPermissions: false });
      });
      const voiceChannels = await VoiceChannels.find({ parentID: args[0] });
      await VoiceChannels.updateMany({ parentID: args[0] }, { parentID: newChannel.id });
      voiceChannels.forEach(c => {
        const voiceChannel = message.guild.channels.cache.get(c.channelID);
        if (voiceChannel) voiceChannel.setParent(newChannel, { lockPermissions: false });
      });
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

module.exports = Kategori