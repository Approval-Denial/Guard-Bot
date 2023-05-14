const mongoose = require('mongoose');

const VoiceChannels = mongoose.model("VoiceChannels", mongoose.Schema({
    channelID: String,
    name: String,
    bitrate: Number,
    parentID: String,
    position: Number,
    overwrites: Array,
}));

module.exports = VoiceChannels