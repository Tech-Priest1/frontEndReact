require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admins = require('./src/models/admins'); 

const criarAdmin = async () => {
    const initialAdminData = {
        name: "Admin",
        email: "admin@email.com",
        password: await bcrypt.hash("admin123", 10),
        cpf: "12345678900" 
    };

    try {
        // criando o admin e fazendo check de existência
        const existingAdmin = await Admins.findOne({ email: initialAdminData.email });
        if (!existingAdmin) {
            await Admins.create(initialAdminData);
            console.log(" Conta de Admin criada.");
        } else {
            console.log("Conta de Admin já existe.");
        }
    } catch (err) {
        console.error("Error durante a criação do Admin:", err);
    }
};

// Export the function
module.exports = criarAdmin;
