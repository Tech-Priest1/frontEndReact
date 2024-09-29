const mongoose = require("mongoose");
const membersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true, minlength: 11, maxlength: 11, unique: true },
    number: { type: String, required: false, minlength: 9, maxlength: 11 },
    gymType: { type: String, required: true },
    price: { type: Number, required: true },
    payingTime: { type: Date, required: true },
    password: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
    
    role: {
        type: String,
        enum: ['member'], 
        default: 'member'
    },
});


const Members = mongoose.model("Members", membersSchema);
module.exports = Members;
