class RolSil extends Command {
    constructor(client) {
        super(client, {
            name: "rolsil",
            aliases: ["rolsil"],
            ownerOnly: true,
        });
    }
    async run(client, message, args, embed) {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!role) return message.channel.send(cevaplar.rolBelirt)
        await role.delete()
        message.channel.send({ embeds: [embed.setDescription(`**${role.name}** (\`${role.id}\`) isimli rol başarı ile silindi ${emojiler.mavionay}`)] })
    }
}

module.exports = RolSil