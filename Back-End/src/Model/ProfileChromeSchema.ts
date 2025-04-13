import { Schema, model } from "mongoose";

var ProfileChromeSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    ProfileName: { type: Schema.Types.String, unique: true, require: true },
    UsrDirPath: { type: Schema.Types.String, require: true },
    ExcutablePath: { type: Schema.Types.String, require: true },
    BaseWsEndpoint: { type: Schema.Types.String, require: false },
    FullWsEndpoint: { type: Schema.Types.String, require: false },
});

module.exports = model("Profile_Chrome", ProfileChromeSchema);
