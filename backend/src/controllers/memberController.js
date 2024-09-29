const Members = require("../models/members");
const bcrypt = require("bcryptjs");

// Add membros 
exports.addMember = async (req, res) => {
    const { name, cpf, number, gymType, price, payingTime, password } = req.body;

   
    if (!password) {
        return res.status(400).json({ error: "Password is required." });
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
        console.error("Error while adding member:", error);
        res.status(500).json({ error: "Error adding member." });
    }
};

// Update membros 
exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const { name, gymType, price, payingTime } = req.body;

    try {
        console.log("Updating member with ID:", id);
        console.log("Received data:", req.body);

        // Fetch the member by ID
        const member = await Members.findById(id);
        if (!member) {
            return res.status(404).json({ error: "Membro não encontrado." });
        }
        console.log("Fetched member:", member);

        // Check if the user is an admin or the member trying to update their own data
        console.log("Is Admin:", req.isAdmin);
        console.log("User ID from request:", req.userId);
        console.log("Fetched member ID:", member._id.toString());

        if (!req.isAdmin && member._id.toString() !== req.userId) {
            return res.status(403).json({ error: "Acesso negado." });
        }

        // Update member details
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
        console.error("Error updating member:", error);
        res.status(500).json({ error: "Erro ao atualizar membro." });
    }
};



// Deletar membros ()
exports.deleteMember = async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete member with ID:", id); // Debug log

    try {
        const member = await Members.findById(id);
        console.log("Found member:", member); // Debug log
        if (!member) {
            return res.status(404).json({ error: "Member not found." });
        }

        await Members.findByIdAndDelete(id);
        res.status(200).json({ message: "Member deleted successfully!" });
    } catch (error) {
        console.error("Error while deleting member:", error);
        res.status(500).json({ error: "Error deleting member." });
    }
};
//pegar por id

exports.getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Members.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllMembers = async (req, res) => {
    try {
        const getMembers = await Members.find();
        res.status(200).json(getMembers);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ error: "Error listing members." });
    }
};
