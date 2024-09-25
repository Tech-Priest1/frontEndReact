const express = require("express")
const dotenv = require("dotenv")
const checklistRoutes = require("./src/routes/checkListRoutes")
const taskRoutes = require("./src/routes/taskRoutes")

require("./src/config/database")
dotenv.config()

const app = express()

app.use(express.json())

app.use("./checklists", checklistRoutes)
app.use("./tasks", taskRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("servidor conectado")
})
