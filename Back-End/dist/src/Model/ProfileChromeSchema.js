"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var ProfileChromeSchema = new mongoose_1.Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    ProfileName: { type: mongoose_1.Schema.Types.String, unique: true, require: true },
    UsrDirPath: { type: mongoose_1.Schema.Types.String, require: true },
    ExcutablePath: { type: mongoose_1.Schema.Types.String, require: true },
    BaseWsEndpoint: { type: mongoose_1.Schema.Types.String, require: false },
    FullWsEndpoint: { type: mongoose_1.Schema.Types.String, require: false },
});
module.exports = (0, mongoose_1.model)("Profile_Chrome", ProfileChromeSchema);
