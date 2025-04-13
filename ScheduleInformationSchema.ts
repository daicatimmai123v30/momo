var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ScheduledSocialInteractionSchema = require("./ScheduledSocialInteractionSchema");
var TwitterAccountSchema = require("./TwitterAccountSchema");

var ScheduleInformationSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    ScheduleId: ScheduledSocialInteractionSchema,
    AccountProposal: TwitterAccountSchema,
});

module.exports = mongoose.model("ScheduleInformation", ScheduleInformationSchema);