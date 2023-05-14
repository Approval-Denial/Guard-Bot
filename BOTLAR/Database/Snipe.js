const mongoose = require("mongoose");

const Snipes = mongoose.model("snipes", mongoose.Schema({
  guildID: { type: String, default: "" },
  channelID: { type: String, default: "" },
  userID: { type: String, default: "" },
  messageContent: { type: String, default: "" },
  image: { type: String, default: "" },
  createdDate: { type: Number, default: Date.now() },
  deletedDate: { type: Number, default: Date.now() }
}));

module.exports = Snipes