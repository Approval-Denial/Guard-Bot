const mongoose = require('mongoose');

const Users = mongoose.model("Users", new mongoose.Schema({
    userID: String,
    TeyitNo: Number,
    Teyitler: { type: Array, default: [] },
    Taggeds: { type: Array, default: [] },
    Registrant: Object,
    Inviter: Object,
    AfkStatus: Object,
    Names: { type: Array, default: [] },

}));

module.exports = Users