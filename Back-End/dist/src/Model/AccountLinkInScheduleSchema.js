"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AccountLinkInScheduleSchema = new mongoose_1.Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    TwitterAccountId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Twitter_Account", unique: false },
    IndexMedia: { type: mongoose_1.Schema.Types.Number, unique: true, require: true },
    PicLink: { type: mongoose_1.Schema.Types.String, require: true },
    PostLink: { type: mongoose_1.Schema.Types.String, require: true },
});
module.exports = (0, mongoose_1.model)("Account_Link_In_Schedule", AccountLinkInScheduleSchema);
