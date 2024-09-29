const Gym = require("../models/gymType");


exports.createGymType = async (req, res) => {
    const { name, normalPrice, promotionalPrice, trainingDays, modalityType, trainingTime, admin } = req.body;

    try {
        // check nos campos
        if (!name || !normalPrice || !promotionalPrice || !trainingDays || !modalityType || !trainingTime || !admin) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // debug
        console.log("Creating gym type with data:", req.body);

        // Create and save the new gym type
        const newGymType = new Gym({ 
            name, 
            normalPrice, 
            promotionalPrice, 
            trainingDays, 
            modalityType, 
            trainingTime, 
            admin 
        });
        
        await newGymType.save();
        res.status(201).json({ message: "Tipo de academia registrado com sucesso!" });
    } catch (error) {
        // debug
        console.error("Erro ao registrar tipo de academia:", error);
        res.status(500).json({ error: "Erro ao registrar tipo de academia." });
    }
};



exports.updateGymType = async (req, res) => {
    const { id } = req.params;
    const {  name, normalPrice, promotionalPrice, trainingDays, modalityType, trainingTime } = req.body;

    try {
        const updatedGymType = await Gym.findByIdAndUpdate(id, { name, normalPrice, promotionalPrice, trainingDays, modalityType, trainingTime }, { new: true });
        if (!updatedGymType) {
            return res.status(404).json({ error: "Tipo de academia não encontrado." });
        }
        res.status(200).json(updatedGymType);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar tipo de academia." });
    }
};


exports.deleteGymType = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGymType = await Gym.findByIdAndDelete(id);
        if (!deletedGymType) {
            return res.status(404).json({ error: "Tipo de Modalidade não encontrado." });
        }
        res.status(200).json({ message: "Tipo de academia deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar tipo de Modalidades." });
    }
};


exports.getAllGymTypes = async (req, res) => {
    try {
        const gymTypes = await Gym.find();
        res.status(200).json(gymTypes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar tipos de Modalidades." });
    }
};
