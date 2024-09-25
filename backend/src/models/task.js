const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name: {type:stringify, required: true},
    done: {type:boolean, required: false},
    checklist: {type:mongoose.Schema.Types.ObjectId,
        ref: "Checklist", required:true
    }
})

module.exports = mongoose.model("task", taskSchema)