const mongoose = require("mongoose");

const Penalties = mongoose.model("Penalties", mongoose.Schema({
  id: { type: Number, default: 0 },
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  Ceza: { type: String, default: "" },
  Aktif: { type: Boolean, default: true },
  Yetkili: { type: String, default: "" },
  Sebep: { type: String, default: "" },
  Zaman: { type: Number, default: Date.now() },
  Sure: { type: String, default: "" },
  kalkmazamani: Number,
}));

module.exports = Penalties