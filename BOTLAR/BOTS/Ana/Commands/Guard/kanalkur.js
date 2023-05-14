const low = require("lowdb")
class KanalKur extends Command {
  constructor(client) {
    super(client, {
      name: "kanalkur",
      aliases: ["logkur"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const channels = await low(client.adapters('kanallar'));
    const everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    const guardCategory = await message.guild.channels.create(`${message.guild.name} GUARD`, {
      type: 'GUILD_CATEGORY',
    });
    await guardCategory.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
    const serverLog = await message.guild.channels.create(`serverguard`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const roleLog = await message.guild.channels.create(`roleguard`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const channelLog = await message.guild.channels.create(`channelguard`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const database = await message.guild.channels.create(`database-log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const web = await message.guild.channels.create(`web-log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const cmdlog = await message.guild.channels.create(`cmdguard-log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    await utils.set('serverLog', serverLog.id).write();
    await utils.set('roleLog', roleLog.id).write();
    await utils.set('channelLog', channelLog.id).write();
    await utils.set('databaseLog', database.id).write();
    await utils.set('WebLog', web.id).write();
    await channels.set('cmdlog', cmdlog.id).write();
  }
}

module.exports = KanalKur