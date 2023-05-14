

 const urlEngel = global.urlEngel = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
 const inviteEngel = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
  
class messageCreatel {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || message.member.permissions.has("ADMINISTRATOR") || message.channel.type == "dm") return;

    if (message.content.match(inviteEngel)) {
      const invites = await message.guild.invites.fetch();
      if ((message.guild.vanityURLCode && message.content.match(inviteEngel).some((i) => i === message.guild.vanityURLCode)) || invites.some((x) => message.content.match(inviteEngel).some((i) => i === x))) return;
      if (message.deletable) message.delete();
    }
  }
}

module.exports = messageCreatel