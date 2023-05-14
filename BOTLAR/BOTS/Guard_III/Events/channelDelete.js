const Discord = require("discord.js");
const { Fullgüvenli, ytKapat } = require("../../../Helpers/function")
const TextChannels = require("../../../Database/TextChannels");
const VoiceChannels = require("../../../Database/VoiceChannels");
const low = require("lowdb")
class channelDelete {
  Event = "channelDelete"
  async run(channel) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("channelGuard").value() === true) try {
      let entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || await Fullgüvenli(entry.executor.id)) return;
      ytKapat(ayarlar.guildID)
      channel.guild.members.ban(entry.executor.id, { reason: "Kanal Silme Koruması Tarafından Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      let logs = client.channels.cache.get(utils.get("channelLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Kanal Silme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından kanal silindi! Silen kişiyi sunucudan yasakladım ve silinen kanalı tekrar açtım.\nSilinen Kanal: \`${channel.name}\`,\`(${channel.id})\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => channel.guild.owner.send({ embeds: [log] })); } else { channel.guild.owner.send({ embeds: [log] }) }
      let newChannel;
      if ((channel.type === 'GUILD_TEXT') || (channel.type === 'GUILD_NEWS')) {
        newChannel = await channel.guild.channels.create(channel.name, {
          type: channel.type,
          topic: channel.topic,
          nsfw: channel.nsfw,
          parent: channel.parent,
          position: channel.position + 1,
          rateLimitPerUser: channel.rateLimitPerUser
        });
      }
      if (channel.type === 'GUILD_VOICE') {
        newChannel = await channel.guild.channels.create(channel.name, {
          type: channel.type,
          bitrate: channel.bitrate,
          userLimit: channel.userLimit,
          parent: channel.parent,
          position: channel.position + 1
        });
      }
      if (channel.type === 'GUILD_CATEGORY') {
        newChannel = await channel.guild.channels.create(channel.name, {
          type: channel.type,
          position: channel.position + 1
        });
        const textChannels = await TextChannels.find({ parentID: channel.id });
        await TextChannels.updateMany({ parentID: channel.id }, { parentID: newChannel.id });
        textChannels.forEach(c => {
          const textChannel = channel.guild.channels.cache.get(c.channelID);
          if (textChannel) textChannel.setParent(newChannel, { lockPermissions: false });
        });
        const voiceChannels = await VoiceChannels.find({ parentID: channel.id });
        await VoiceChannels.updateMany({ parentID: channel.id }, { parentID: newChannel.id });
        voiceChannels.forEach(c => {
          const voiceChannel = channel.guild.channels.cache.get(c.channelID);
          if (voiceChannel) voiceChannel.setParent(newChannel, { lockPermissions: false });
        });
      };
      channel.permissionOverwrites.cache.forEach(perm => {
        let thisPermOverwrites = {};
        perm.allow.toArray().forEach(p => {
          thisPermOverwrites[p] = true;
        });
        perm.deny.toArray().forEach(p => {
          thisPermOverwrites[p] = false;
        });
        newChannel.permissionOverwrites.create(perm.id, thisPermOverwrites);
      });
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = channelDelete