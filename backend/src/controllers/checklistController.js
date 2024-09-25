const checklist = require("../models/checkList")

//criar checklist insertOne
exports.creatChecklist = async (req,res) => {
    try{
        const checkList = await checklist.creat(req.body)
        res.status(201).json(checkList);
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

//criar checklist insertMany
exports.creatChecklist= async (req, res) =>{
    try {
        const checkList = await checklist.insertMany(req.body)
        res.status(201).json(checkList);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//Listar os checklist Criados
exports.getAllChecklists = async (req, res) =>{
    try {
        const checklists = await checklist.find().populate("tasks")
        res.status(200).json(checklists);
    } catch (error) {
        req.status(400).json({message: error.message})
    }
}

//atualizar UpdateOne
exports.updateChecklist = async (req, res) =>{
    try {
        const checklist = await checklist.findByIdAndUpdate(req.params, req.body, {new: true})
        res.status(200).json(checklist)
    } catch (error) {
        req.status(400).json({message: error.message})
    }
}

//deletar checklist
exports.deleteChecklist = async (req, res) =>{
    try {
        await checklist.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "DELETADO COM SUCESSO"});
    } catch (error) {
        req.status(400).json({message: error.message})
    }
}

//Agregação
exports.getChecklistWithTaskCount = async (req, res) =>{
    try {
        const results = await checklist.aggregate([
            {$lookup:{from: "tasks", localField:"_id", foreignField:"checklist", as: "task"}},
            {$addFields: {taskCount:{$size:"$tasks"}}}
        ]);
        res.status(200).json(results);
    } catch (error) {
        req.status(400).json({message: error.message})
    }
}