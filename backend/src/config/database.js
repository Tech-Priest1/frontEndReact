const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Conectado ao MONGODB")
    })
    .catch(()=>{
        console.log("Erro na conexão",error)
    })