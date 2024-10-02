const Gym = require("../models/gymType");
const Members = require('../models/members');

//criar modalidade
exports.createGymType = async (req, res) => {
    const { name, normalPrice, promotionalPrice, trainingDays, modalityType, trainingTime, admin } = req.body;

    try {
       
        if (!name || !normalPrice || !promotionalPrice || !trainingDays || !modalityType || !trainingTime || !admin) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // debug
        console.log("Criando modalidade:", req.body);

       
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


//editar modalidade
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

//deletar modalidade
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

//pegar todas as modalidade
exports.getAllGymTypes = async (req, res) => {
    try {
        const gymTypes = await Gym.find();
        res.status(200).json(gymTypes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar tipos de Modalidades." });
    }
};


// pegar modalidade específica por ID
exports.getGymTypeById = async (req, res) => {
    const { id } = req.params;
    console.log("Fetching gym type with ID:", id);

    try {
        const gymType = await Gym.findById(id);
        if (!gymType) {
            return res.status(404).json({ error: "Tipo de academia não encontrado." });
        }
        res.status(200).json(gymType);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tipo de academia." });
    }
};

// pegar gym types por tipo da modalidade
exports.getModalitiesByUserType = async (req, res) => {
    try {
        const member = await Members.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Membro não existe" });
        }

        console.log("Fetched member:", member);

        
        const gymEntry = await Gym.findOne({ name: new RegExp(`^${member.gymType}$`, 'i') });

        console.log("Gym Entry:", gymEntry);

        if (!gymEntry) {
            return res.status(404).json({ error: "Modalidade não existe." });
        }

       
        const modalities = await Gym.find({ modalityType: gymEntry.modalityType });

        console.log("Modalities:", modalities);

        if (modalities.length === 0) {
            return res.status(404).json({ error: "Modalidade não existe." });
        }

        res.status(200).json(modalities);
    } catch (error) {
        console.error("Erro ao pegar modalidade:", error);
        res.status(500).json({ error: "Erro ao pegar modalidade." });
    }
};
