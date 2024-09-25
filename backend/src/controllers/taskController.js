const Task = require("../models/task")
const Checklist = require("../models/checkList")
const checkList = require("../models/checkList")

//insertOne
exports.createTask = async (req, res) =>{
    try {
        const task = await Task.create(req.body)
        const checklist = await checklist.findById(req.body.checkList)
        checklist.task.push(task._id)
        await checklist.save()
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//criar task insertMany
exports.creatManyTasks= async (req, res) =>{
    try {
        const tasks = await Task.insertMany(req.body)
        res.status(201).json(tasks);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//atualizar Task UpdateOne
exports.updateTask = async (req, res) =>{
    try {
        const task = await Task.findByIdAndUpdate(req.params, req.body, {new: true})
        res.status(200).json(task)
    } catch (error) {
        req.status(400).json({message: error.message})
    }
}

//deletar Task
exports.deleteTask = async (req, res) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        const checklist = await Checklist.findById(task.checklist)
        checklist.task.pull(task._id)
        await checklist.save()
        res.status(200).json({message: "TESK DELETADO COM SUCESSO"});
    } catch (error) {
        req.status(400).json({message: error.message})
    }
}