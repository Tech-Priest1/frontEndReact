const Members = require("../models/members");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Add membros 
exports.addMember = async (req, res) => {
    const { name, cpf, number, gymType, price, payingTime, password } = req.body;

   
    if (!password) {
        return res.status(400).json({ error: "Senha é necessária." });
    }

    try {
     
        const hashedPassword = await bcrypt.hash(password, 10); 

        const newMember = new Members({
            name,
            password: hashedPassword, 
            cpf,
            number,
            gymType, 
            price, 
            payingTime,
            createdBy: req.adminId 
        });

        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        console.error("Error ao adicionar membro:", error);
        res.status(500).json({ error: "Error ao adicionar membro." });
    }
};
exports.loginMember = async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const member = await Members.findOne({ cpf });
        if (!member) {
            return res.status(404).json({ message: 'Membro não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha errada' });
        }

       
        const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      
        const avatar = member.avatar || '/default-avatar.png'; 

        return res.json({ token, cpf: member.cpf, name: member.name, avatar, role: 'member' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro de servidor' });
    }
};


// Update membros 
exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const { name, gymType, price, payingTime } = req.body;

    try {
        console.log("Atualziando membro com ID:", id);
        console.log("Recebendo data:", req.body);

        
        const member = await Members.findById(id);
        if (!member) {
            return res.status(404).json({ error: "Membro não encontrado." });
        }
        console.log("Pegando membro:", member);

       
        console.log("Is Admin:", req.isAdmin);
        console.log("User ID pedido:", req.userId);
        console.log("Fetched member ID:", member._id.toString());

        if (!req.isAdmin && member._id.toString() !== req.userId) {
            return res.status(403).json({ error: "Acesso negado." });
        }

        
        const updatedMember = await Members.findByIdAndUpdate(
            id,
            { name, gymType, price, payingTime },
            { new: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ error: "Membro não encontrado." });
        }

        res.status(200).json(updatedMember);
    } catch (error) {
        console.error("Error atualizando membro:", error);
        res.status(500).json({ error: "Erro ao atualizar membro." });
    }
};



// Deletar membros ()
exports.deleteMember = async (req, res) => {
    const { id } = req.params;
    console.log("Tentando deletar Membro com ID:", id); // Debug log

    try {
        const member = await Members.findById(id);
        console.log("Membro encontrado:", member); // Debug log
        if (!member) {
            return res.status(404).json({ error: "Membro não encontrado." });
        }

        await Members.findByIdAndDelete(id);
        res.status(200).json({ message: "Membro deletado com sucesso!" });
    } catch (error) {
        console.error("Error while deleting member:", error);
        res.status(500).json({ error: "Error deletando membro." });
    }
};

//pegar por id
exports.getMemberById = async (req, res) => {
  try {
    const member = await Members.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//listar todos os membros
exports.getAllMembers = async (req, res) => {
    try {
        const getMembers = await Members.find();
        res.status(200).json(getMembers);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ error: "Error listando membros." });
    }
};
// atualizar avatar
exports.updateAvatar = async (req, res) => {
    const memberId = req.params.id;
  
    try {
      const avatarPath = `/uploads/avatars/${memberId}_${Date.now()}.png`;
  
   
      const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'avatars');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      const avatarFile = req.files.avatar;
      avatarFile.mv(path.join(uploadDir, avatarPath));
  
      const updatedMember = await Members.findByIdAndUpdate(memberId, { avatar: avatarPath }, { new: true });
  
      res.json({ avatar: updatedMember.avatar });
    } catch (error) {
      res.status(500).json({ message: 'Error updating avatar', error });
    }
  };