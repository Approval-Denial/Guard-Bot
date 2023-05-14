class Command {
    constructor(client, {
        name = null,
        aliases = [],
        description = [],
        category = null,
        perm = null,
        channel = null,
        devOnly = false,
        ownerOnly = false,
        enabled = true,
        cooldown = 1,

    }) {
        this.client = client;
        this.config = {
            devOnly,
            ownerOnly,
            enabled,
        };
        this.info = {
            name,
            aliases,
            perm,
            channel,
            category,
            description,
            cooldown
        };
    }
    async run() {

    }
}
module.exports = Command;