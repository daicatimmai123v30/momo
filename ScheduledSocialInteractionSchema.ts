var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TwitterAccountSchema = require("./TwitterAccountSchema");

var ScheduledSocialInteractionSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    Title: { type: Schema.Types.String, require: true },
    StartTime: { type: Schema.Types.Date, require: true },
    EndTime: { type: Schema.Types.Date, require: true },
    IntervalMinutes: { type: Schema.Types.Number, require: true },
    isProgress: { type: Schema.Types.String, require: true },
    AccountPic: TwitterAccountSchema,
});

module.exports = mongoose.model("ScheduledSocialInteraction", ScheduledSocialInteractionSchema);