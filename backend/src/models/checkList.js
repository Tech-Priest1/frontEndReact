const mongoose = require("mongoose")

const checklistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    task: [{type: mongoose.Schema.Types.ObjectId, ref: "task"}]


})

module.exports = mongoose.model("Checklist", checklistSchema)