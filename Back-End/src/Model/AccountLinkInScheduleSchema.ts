import { Schema, model } from "mongoose";

const AccountLinkInScheduleSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    TwitterAccountId: { type: Schema.Types.ObjectId, ref: "Twitter_Account", unique: false },
    IndexMedia: { type: Schema.Types.Number, unique: true, require: true },
    PicLink: { type: Schema.Types.String, require: true },
    PostLink: { type: Schema.Types.String, require: true },
});

module.exports = model("Account_Link_In_Schedule", AccountLinkInScheduleSchema);
