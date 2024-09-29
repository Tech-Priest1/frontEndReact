const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin'], 
        default: 'admin' 
    },
}, {
    collection: 'admins' 
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
