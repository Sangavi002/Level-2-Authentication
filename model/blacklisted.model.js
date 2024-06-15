const mongoose = require("mongoose");

const blacklistedTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
},{
    versionKey: false
});

const BlacklistedTokenModel = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedTokenModel;