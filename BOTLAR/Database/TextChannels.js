const mongoose = require('mongoose');

const TextChannels = mongoose.model("TextChannels", mongoose.Schema({
    channelID: String,
    name: String,
    nsfw: Boolean,
    parentID: String,
    position: Number,
    rateLimit: Number,
    overwrites: Array,
}));

module.exports = TextChannels