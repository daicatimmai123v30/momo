"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TwitterAccountSchema = new mongoose_1.Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    UserName: { type: mongoose_1.Schema.Types.String, unique: true, require: true },
    Password: { type: mongoose_1.Schema.Types.String, require: true },
    AuthenticationCode: { type: mongoose_1.Schema.Types.String, require: true },
    TypeAccount: {
        type: mongoose_1.Schema.Types.String,
        require: true,
        enum: ["ACCOUNT_PROPOSAL", "ACCOUNT_PIC", "ACCOUNT_INTERACTIVE", "ACCOUNT_LINK"],
    },
    ProfileChrome: { type: mongoose_1.Schema.Types.ObjectId, ref: "Profile_Chrome", unique: true },
    ScheduleInteractionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Scheduled_Social_Interaction", unique: false },
});
module.exports = (0, mongoose_1.model)("Twitter_Account", TwitterAccountSchema);
