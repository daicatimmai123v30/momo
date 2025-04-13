"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DetailScheduleInteractionSchema = new mongoose_1.Schema({
    ScheduleId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Scheduled_Social_Interaction", unique: false },
    AllLinks: { type: mongoose_1.Schema.Types.String, unique: true, require: true },
});
module.exports = (0, mongoose_1.model)("Detail_Schedule_Interaction", DetailScheduleInteractionSchema);
