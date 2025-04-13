var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TwitterAccountSchema = require("./TwitterAccountSchema");

const DetailScheduleSchema = new mongoose.Schema({
    // _id: { type: Schema.Types.ObjectId, auto: true },
    IndexMedia: { type: Schema.Types.Number, require: true },
    PicText: { type: Schema.Types.String, require: false },
    PicLink: { type: Schema.Types.String, require: false },
    isFinish: { type: Schema.Types.Boolean, require: false, default: false },
    isSuccess: { type: Schema.Types.Boolean, require: false, default: false },
    RepostedLink: { type: Schema.Types.String, require: false },
    AccountProposal: TwitterAccountSchema,
});

module.exports = mongoose.model("ScheduleInformation", DetailScheduleSchema);