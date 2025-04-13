"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduledSocialInteractionSchema = new mongoose_1.Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    Title: { type: mongoose_1.Schema.Types.String, unique: false, require: true },
    ContentText: { type: mongoose_1.Schema.Types.String, unique: false, require: true },
    StartTime: { type: mongoose_1.Schema.Types.Date, require: true },
    EndTime: { type: mongoose_1.Schema.Types.Date, require: true },
    IntervalMinutes: { type: mongoose_1.Schema.Types.Number, require: true },
    IsProgress: { type: mongoose_1.Schema.Types.Boolean, require: true },
});
module.exports = (0, mongoose_1.model)("Scheduled_Social_Interaction", ScheduledSocialInteractionSchema);
