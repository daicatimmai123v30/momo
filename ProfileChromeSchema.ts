var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProfileChromeSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    ProfileName: { type: Schema.Types.String, unique: true, require: true },
    UsrDirPath: { type: Schema.Types.String, require: true },
    WsEndpoint: { type: Schema.Types.String, require: false },
});

module.exports = mongoose.model("ProfileChrome", ProfileChromeSchema);