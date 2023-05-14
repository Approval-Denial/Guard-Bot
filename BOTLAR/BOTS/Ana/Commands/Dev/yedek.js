const Backup = require("../../../../Helpers/Backup")

class Yedek extends Command {
  constructor(client) {
    super(client, {
      name: "yedek",
      aliases: ["yedek","backup"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    await Backup.RoleBackup()
    await Backup.channelBackup()
    await message.react(emojiler.mavionay)
  }
}

module.exports = Yedek