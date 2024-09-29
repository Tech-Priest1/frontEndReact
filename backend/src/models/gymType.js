const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true }, // Indexado para uma pesquisa mais rapida
    done: { type: Boolean, default: false }, 
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "admin", required: true, index: true }, 
    normalPrice: { type: Number, required: true }, 
    promotionalPrice: { type: Number, required: true }, 
    trainingDays: { type: String, required: true },
    modalityType: { 
        type: String, 
        required: true, 
        enum: ['Artes Marciais', 'Treinamento de Força', 'Danças','Pilates'], 
    }, 
    trainingTime: { type: String, required: true } 
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model("gym", gymSchema);
