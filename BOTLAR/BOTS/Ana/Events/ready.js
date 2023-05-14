const Users = require('../../../Database/Users')
const {Memo} = require("../approval.js")
class Ready {
  Event = "ready"
  async run() {
    const channel = client.channels.cache.get(kanallar.botSesKanal);
   await voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    setInterval(async() => {
      await voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })
    }, 15 * 1000);
  }
};     

module.exports = Ready