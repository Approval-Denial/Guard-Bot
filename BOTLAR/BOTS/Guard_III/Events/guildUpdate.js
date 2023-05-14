const { Fullgüvenli,ownSafe } = require("../../../Helpers/function")
const request = require('request');
const low = require("lowdb")
class GuildUpdate {
  Event = "guildUpdate"
  async run(oldGuild, newGuild) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value() === true) try {
      const entry = await newGuild.fetchAuditLogs({ type: 'GUILD_UPDATE' }).then(audit => audit.entries.first());
      if (entry.createdTimestamp <= Date.now() - 5000 || await ownSafe(entry.executor.id)) return;
      if (newGuild.vanityURLCode && (newGuild.vanityURLCode !== ayarlar.sunucuUrl)) {
        request({
          url: `https://discord.com/api/v6/guilds/${newGuild.id}/vanity-url`,
          body: {
            code: ayarlar.sunucuUrl
          },
          json: true,
          method: 'PATCH',
          headers: {
            "Authorization": `Bot ${client.token}`
          }
        }, (err, res, body) => {
          if (err) {
            client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + err + ``)
          }
        });
      }
      await newGuild.members.ban(entry.executor.id, { reason: "Sunucu Ayarlarını Güncellediği İçin Uzaklaştırıldı" }).catch();
      if (oldGuild.banner !== newGuild.banner) {
        await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
      }
      if (oldGuild.icon !== newGuild.icon) {
        await newGuild.setIcon(oldGuild.iconURL({ size: 4096, dynamic: true }));
      }
      await newGuild.edit({
        name: ayarlar.sunucuisim,
        region: oldGuild.region,
        verificationLevel: oldGuild.verificationLevel,
        explicitContentFilter: oldGuild.explicitContentFilter,
        afkChannel: oldGuild.afkChannel,
        systemChannel: oldGuild.systemChannel,
        afkTimeout: oldGuild.afkTimeout,
        rulesChannel: oldGuild.rulesChannel,
        publicUpdatesChannel: oldGuild.publicUpdatesChannel,
        preferredLocale: oldGuild.preferredLocale,
        defaultMessageNotifications: oldGuild.defaultMessageNotifications
      });
      let url;
      if (newGuild.vanityURLCode) { url = newGuild.vanityURLCode }
      else { url = "YOK" }
      let eurl;
      if (oldGuild.vanityURLCode) { eurl = oldGuild.vanityURLCode }
      else { eurl = "YOK" }
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Sunucu Ayar Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından sunucu ayarları güncellendi! Sunucu ayarlarını güncelleyen kişiyi sunucudan attım ve sunucuyu eski haline getirdim.\n**Sunucu ismi**; \nEski: \`${oldGuild.name}\` Yeni: \`${newGuild.name}\`\n**Sunucu URL**; \nEski: ${eurl} Yeni: ${url}`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => channel.guild.owner.send({ embeds: [log] })); } else { channel.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildUpdate;