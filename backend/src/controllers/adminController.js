const Admins = require("../models/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar Admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const existingAdmin = await Admins.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin com esse email já existe." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admins({ name, email, password: hashedPassword, cpf });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registrado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar admin." });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admins.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha errada' });
        }

        // Generate a new token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Ensure that the avatar is available, or use a default one
        const avatar = admin.avatar || '/default-avatar.png'; 

        return res.json({ token, email: admin.email, avatar, role: 'admin' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro de servidor' });
    }
};


// Atualizar Admin
exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, password, cpf } = req.body;

    if (!name && !password && !cpf) {
        return res.status(400).json({ error: "Nenhuma atualização fornecida." });
    }

    try {
        const updatedData = { name, cpf };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const updatedAdmin = await Admins.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar admin." });
    }
};

// Deletar Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;  
        console.log("Deletando admin com ID:", adminId);  

        const result = await Admins.findByIdAndDelete(adminId);  

        if (!result) {
            return res.status(404).json({ message: "Admin não encontrado" });  
        }

        res.status(200).json({ message: "Admin deletado com sucesso" }); 
    } catch (error) {
        console.error("Error ao deletar o Admin:", error);  
        res.status(500).json({ message: "Erro de servidor Interno" });  
    }
};

// Pesquisar Admin
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admins.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: error.message });
    }
};
