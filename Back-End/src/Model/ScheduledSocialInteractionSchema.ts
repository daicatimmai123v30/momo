import { Schema, model } from "mongoose";

const ScheduledSocialInteractionSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    Title: { type: Schema.Types.String, unique: false, require: true },
    ContentText: { type: Schema.Types.String, unique: false, require: true },
    StartTime: { type: Schema.Types.Date, require: true },
    EndTime: { type: Schema.Types.Date, require: true },
    IntervalMinutes: { type: Schema.Types.Number, require: true },
    IsProgress: { type: Schema.Types.Boolean, require: true },
});

module.exports = model("Scheduled_Social_Interaction", ScheduledSocialInteractionSchema);
