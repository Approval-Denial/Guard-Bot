const mongoose = require('mongoose');

const Roles = mongoose.model("Roles", mongoose.Schema({
  roleID: String,
  name: String,
  color: String,
  hoist: Boolean,
  position: Number,
  permissions: String,
  mentionable: Boolean,
  time: Number,
  members: Array,
  channelOverwrites: Array
}))
module.exports = Roles