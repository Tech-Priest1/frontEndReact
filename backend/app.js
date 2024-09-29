const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser"); 
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const bodyParser = require('body-parser');

const connectDB = require('./src/config/database')
const criarAdmin = require('./criarAdmin');

// Importando routes
const memberRoutes = require("./src/routes/memberRoutes");
const gymRoutes = require("./src/routes/gymRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

// Iniciando express app
const app = express();

dotenv.config();

//conectando a database
require("./src/config/database");

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));

app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // tempo maximo 15 min
    max: 100 // limitando request por IP
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); 
app.use(bodyParser.json()); 



// Definindo routes
app.use("/api/member", memberRoutes);
app.use("/api/gym", gymRoutes);
app.use("/api/admin", adminRoutes);

// Conectando ao MongoDB
connectDB().then(async () => {
    // função para criar o manda chuva
    await criarAdmin(); 
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});


// iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
});

app.get('*', (req, res) => {
    res.status(404).send('Not Found'); 
  });

const shutdown = () => {
    console.log("Saindo...");
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
