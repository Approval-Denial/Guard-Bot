const util = require("util")
class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["eval"],
            devOnly: true,
        });
    }
    async run(client, message, args) {
        function clean(text) {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        if (!args[0]) return message.reply(`Kod belirtilmedi`);
        try {
            //eval("(async () => { " + code + "})();")
            const code = message.content.split(' ').slice(1).join(' ');
            let evaled = clean(await eval(code));
            if (typeof evaled !== "string") evaled = util.inspect(evaled).replace(client.token, "Yasaklı komut").replace(ayarlar.MongoURL, "discord.gg/luppux")
            const arr = Discord.Util.splitMessage(evaled, { maxLength: 1950, char: "\n" });
            arr.forEach(element => {
                message.channel.send(Discord.Formatters.codeBlock("js", element));
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
        }
    }
}

module.exports = Eval
