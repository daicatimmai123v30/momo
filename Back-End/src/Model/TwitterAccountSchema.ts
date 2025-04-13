import { Schema, model } from "mongoose";

const TwitterAccountSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    UserName: { type: Schema.Types.String, unique: true, require: true },
    Password: { type: Schema.Types.String, require: true },
    AuthenticationCode: { type: Schema.Types.String, require: true },
    TypeAccount: {
        type: Schema.Types.String,
        require: true,
        enum: ["ACCOUNT_PROPOSAL", "ACCOUNT_PIC", "ACCOUNT_INTERACTIVE", "ACCOUNT_LINK"],
    },
    ProfileChrome: { type: Schema.Types.ObjectId, ref: "Profile_Chrome", unique: true },
    ScheduleInteractionId: { type: Schema.Types.ObjectId, ref: "Scheduled_Social_Interaction", unique: false },
});

module.exports = model("Twitter_Account", TwitterAccountSchema);
