const mongoose = require('mongoose');

const Role = mongoose.model("RoleMembers", mongoose.Schema({
  guildID: String,
  roleID: String,
  time: Number,
  members: Array,
}));

module.exports = Role;