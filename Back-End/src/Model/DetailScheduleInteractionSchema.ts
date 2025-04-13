import { Schema, model } from "mongoose";

const DetailScheduleInteractionSchema = new Schema({
    ScheduleId: { type: Schema.Types.ObjectId, ref: "Scheduled_Social_Interaction", unique: false },
    AllLinks: { type: Schema.Types.String, unique: true, require: true },
});

module.exports = model("Detail_Schedule_Interaction", DetailScheduleInteractionSchema);
